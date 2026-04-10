import { useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { NameSurveyStore } from '@/lib/phreepet/NameSurveyStore'
import type { SurveyPrompt } from '@/lib/phreepet/types'

import NameSurveyIntro from './NameSurveyIntro'
import { parseSuggestionLines } from './parseSuggestionLines'
import NameSurveyQuestionView from './NameSurveyQuestionView'
import NameSurveyShell from './NameSurveyShell'
import NameSurveyThankYou from './NameSurveyThankYou'

type Phase = 'loading' | 'error' | 'intro' | 'survey' | 'submitting' | 'complete'

const NameSurveyFlow: React.FC = () => {
  const storeRef = useRef<NameSurveyStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = new NameSurveyStore()
  }

  const [phase, setPhase] = useState<Phase>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [suggestionText, setSuggestionText] = useState('')
  const [isStarting, setIsStarting] = useState(false)
  const [prompt, setPrompt] = useState<SurveyPrompt | null>(null)
  const [selectedWinnerId, setSelectedWinnerId] = useState<string | null>(null)

  const store = storeRef.current

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        await store.init()
        if (!cancelled) setPhase('intro')
      } catch (e) {
        if (!cancelled) {
          setErrorMessage(e instanceof Error ? e.message : 'Could not load the survey.')
          setPhase('error')
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [store])

  const submitSession = useCallback(async () => {
    const suggestions = parseSuggestionLines(suggestionText)
    setPhase('submitting')
    setErrorMessage(null)
    try {
      await store.submitSession(suggestions)
      setPhase('complete')
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : 'Could not save your responses.')
      setPhase('error')
    }
  }, [store, suggestionText])

  const handleStart = useCallback(() => {
    setIsStarting(true)
    setErrorMessage(null)
    try {
      store.startSession()
      const first = store.nextQuestion()
      if (!first) {
        setErrorMessage('Could not build the question deck. Please try again later.')
        setPhase('error')
        return
      }
      setPrompt(first)
      setSelectedWinnerId(null)
      setPhase('survey')
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : 'Could not start the survey.')
      setPhase('error')
    } finally {
      setIsStarting(false)
    }
  }, [store])

  const handleNext = useCallback(() => {
    if (!prompt || !selectedWinnerId) return
    try {
      store.answerCurrentQuestion(selectedWinnerId)
      const { completed, total } = store.currentProgress
      if (completed >= total) {
        void submitSession()
        return
      }
      const next = store.nextQuestion()
      if (!next) {
        setErrorMessage('Ran out of questions unexpectedly. Your progress was not saved.')
        setPhase('error')
        return
      }
      setPrompt(next)
      setSelectedWinnerId(null)
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : 'Something went wrong.')
      setPhase('error')
    }
  }, [prompt, selectedWinnerId, store, submitSession])

  const handleSkip = useCallback(() => {
    if (!prompt) return
    try {
      store.skipCurrentQuestion()
      const { completed, total } = store.currentProgress
      if (completed >= total) {
        void submitSession()
        return
      }
      const next = store.nextQuestion()
      if (!next) {
        setErrorMessage('Ran out of questions unexpectedly. Your progress was not saved.')
        setPhase('error')
        return
      }
      setPrompt(next)
      setSelectedWinnerId(null)
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : 'Something went wrong.')
      setPhase('error')
    }
  }, [prompt, store, submitSession])

  const handleUndo = useCallback(() => {
    try {
      store.undoLastAnswer()
      const restored = store.nextQuestion()
      if (!restored) {
        setErrorMessage('Could not restore the previous question.')
        setPhase('error')
        return
      }
      setPrompt(restored)
      setSelectedWinnerId(null)
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : 'Could not undo.')
      setPhase('error')
    }
  }, [store])

  const handleRetryLoad = useCallback(() => {
    setErrorMessage(null)
    setPhase('loading')
    void (async () => {
      try {
        await store.init()
        setPhase('intro')
      } catch (e) {
        setErrorMessage(e instanceof Error ? e.message : 'Could not load the survey.')
        setPhase('error')
      }
    })()
  }, [store])

  return (
    <NameSurveyShell>
      {phase === 'loading' && (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-muted-foreground">
          <div
            className="h-9 w-9 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-primary"
            aria-hidden
          />
          <p className="text-sm">Loading survey…</p>
        </div>
      )}

      {phase === 'error' && (
        <div className="space-y-6">
          <p className="text-base text-destructive">{errorMessage ?? 'Something went wrong.'}</p>
          <Button type="button" variant="outline" onClick={handleRetryLoad}>
            Try again
          </Button>
        </div>
      )}

      {phase === 'intro' && (
        <div className="animate-in fade-in duration-300">
          <NameSurveyIntro
            suggestionText={suggestionText}
            onSuggestionChange={setSuggestionText}
            onStart={handleStart}
            isStarting={isStarting}
          />
        </div>
      )}

      {phase === 'survey' && prompt && (
        <div className="animate-in fade-in duration-300">
          <NameSurveyQuestionView
            prompt={prompt}
            selectedWinnerId={selectedWinnerId}
            onSelectWinner={setSelectedWinnerId}
            onNext={handleNext}
            onSkip={handleSkip}
            nextDisabled={!selectedWinnerId}
            progressStep={Math.min(
              store.currentProgress.completed + 1,
              store.currentProgress.total,
            )}
            total={store.currentProgress.total}
            onUndo={
              store.currentProgress.completed > 0 &&
              store.currentProgress.completed + 1 < store.currentProgress.total
                ? handleUndo
                : undefined
            }
          />
        </div>
      )}

      {phase === 'submitting' && (
        <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
          <div
            className="h-10 w-10 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-primary"
            aria-hidden
          />
          <p className="text-base font-medium text-foreground">Saving your responses…</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Please keep this tab open until we finish syncing with the server.
          </p>
        </div>
      )}

      {phase === 'complete' && (
        <div className="animate-in fade-in duration-500">
          <NameSurveyThankYou />
        </div>
      )}
    </NameSurveyShell>
  )
}

export default NameSurveyFlow
