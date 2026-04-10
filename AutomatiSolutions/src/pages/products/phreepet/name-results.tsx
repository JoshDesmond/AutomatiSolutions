import { Crown, Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { NameSurveyStore } from '@/lib/phreepet/NameSurveyStore'
import type { LeaderboardRow } from '@/lib/phreepet/types'

const NameResultsPage: React.FC = () => {
  const storeRef = useRef<NameSurveyStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = new NameSurveyStore()
  }
  const store = storeRef.current

  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [rows, setRows] = useState<LeaderboardRow[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const data = await store.getLeaderboard()
        if (!cancelled) {
          setRows(data)
          setStatus('ready')
        }
      } catch (e) {
        if (!cancelled) {
          setErrorMessage(e instanceof Error ? e.message : 'Could not load standings.')
          setStatus('error')
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [store])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            PhreePet name survey
          </p>
          <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Leaderboard</h1>
            <Button variant="outline" size="sm" className="shrink-0" asChild>
              <Link to="/products/phreepet/name-survey">Take survey</Link>
            </Button>
          </div>
        </div>

        {status === 'loading' && (
          <div className="space-y-3" aria-busy="true" aria-label="Loading leaderboard">
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin shrink-0" aria-hidden />
              <span className="text-sm">Loading standings…</span>
            </div>
            <ul className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <li
                  key={i}
                  className="h-16 animate-pulse rounded-xl bg-slate-200/80"
                />
              ))}
            </ul>
          </div>
        )}

        {status === 'error' && (
          <div
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            role="alert"
          >
            {errorMessage ?? 'Something went wrong.'}
          </div>
        )}

        {status === 'ready' && rows.length === 0 && (
          <p className="rounded-xl border border-slate-200 bg-white px-4 py-8 text-center text-slate-600">
            No names yet. Seed the survey or complete a session to populate the board.
          </p>
        )}

        {status === 'ready' && rows.length > 0 && (
          <ol className="space-y-3">
            {rows.map((row) => {
              const isLeader = row.rank === 1
              const width = Math.min(100, Math.max(0, row.barWidthPercent))
              return (
                <li
                  key={row.id}
                  className={`group relative overflow-hidden rounded-xl border shadow-sm transition-colors ${
                    isLeader
                      ? 'border-amber-200/80 bg-amber-50/40 ring-1 ring-amber-100'
                      : 'border-slate-200/80 bg-white'
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute inset-y-0 left-0 ${
                      isLeader
                        ? 'bg-amber-400/25'
                        : 'bg-sky-500/15'
                    }`}
                    style={{ width: `${width}%` }}
                    aria-hidden
                  />
                  <div className="relative flex items-center gap-3 px-4 py-3.5 sm:gap-4">
                    <div
                      className={`flex h-9 min-w-[2.25rem] shrink-0 items-center justify-center gap-0.5 rounded-lg px-1 text-sm font-bold tabular-nums ${
                        isLeader
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {isLeader && (
                        <Crown className="h-4 w-4 text-amber-600" strokeWidth={2} aria-hidden />
                      )}
                      <span>#{row.rank}</span>
                    </div>
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <span className="block truncate font-semibold text-slate-900">
                        {row.shortName}
                      </span>
                      {row.extendedName ? (
                        <span className="block truncate text-sm font-light text-slate-500">
                          {row.extendedName}
                        </span>
                      ) : null}
                    </div>
                    <div className="shrink-0 text-right opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <span className="text-lg font-semibold tabular-nums text-slate-900">
                        {Math.round(row.currentElo)}
                      </span>
                      <span className="ml-1 text-xs font-medium text-slate-500">Elo</span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        )}
      </div>
    </div>
  )
}

export default NameResultsPage
