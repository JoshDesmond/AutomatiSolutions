import { pathToFileURL } from 'node:url'

import { collection, doc, writeBatch } from 'firebase/firestore'

import { getFirestoreDb } from '@/lib/firebase'
import { DEFAULT_ELO } from './EloEngine'
import {
  NAME_SURVEY_DOC_ID,
  NAME_SURVEY_SUBCOL_NAMES,
  NAME_SURVEY_SUBCOL_QUESTIONS,
  SURVEYS_COLLECTION,
} from './NameSurveyStore'

/**
 * PhreePet name-survey registry seed. Uses Firestore auto-IDs under
 * `Surveys/NameSurvey/Names` and `Surveys/NameSurvey/Questions`.
 * Run on empty subcollections or delete old docs first — re-running creates duplicates.
 */
export const SEED_APP_NAMES: ReadonlyArray<{
  shortName: string
  extendedName: string
}> = [
  { shortName: 'PhreePet', extendedName: 'PhreePet: Digital Detox Idle Pet' },
  { shortName: 'NurturePet', extendedName: 'NurturePet: Digital Detox Idle Pet' },
  { shortName: 'Hushkin', extendedName: 'Hushkin: Digital Detox Idle Pet' },
  { shortName: 'Hushling', extendedName: 'Hushling: Digital Detox Idle Pet' },
  { shortName: 'Kinstill', extendedName: 'Kinstill: Digital Detox Idle Pet' },
  { shortName: 'Stillkin', extendedName: 'Stillkin: Digital Detox Idle Pet' },
  { shortName: 'ScreenKin', extendedName: 'ScreenKin: Digital Detox Idle Pet' },
  { shortName: 'Pauseling', extendedName: 'Pauseling: Digital Detox Idle Pet' },
  { shortName: 'Pausekin', extendedName: 'Pausekin: Digital Detox Idle Pet' },
  { shortName: 'PausePets', extendedName: 'PausePets: Digital Detox Idle Pet' },
  { shortName: 'Pause Pals', extendedName: 'Pause Pals: Digital Detox Idle Pet' },
  { shortName: 'Somnari', extendedName: 'Somnari: Digital Detox Idle Pet' },
  { shortName: 'Somna', extendedName: 'Somna: Digital Detox Idle Pet' },
  { shortName: 'Somni', extendedName: 'Somni: Digital Detox Idle Pet' },
  { shortName: 'SomniPet', extendedName: 'SomniPet: Digital Detox Idle Pet' },
  { shortName: 'Zenling', extendedName: 'Zenling: Digital Detox Idle Pet' },
  { shortName: 'Idlepaws', extendedName: 'Idlepaws: Unplug & Grow' }, // Keep this extended title
  { shortName: 'Stillbloom', extendedName: 'Stillbloom: Grow Your Focus' }, // Keep this extended title
]

export const SEED_SURVEY_QUESTIONS: ReadonlyArray<{ text: string }> = [
  { text: "Which name best conveys a 'productivity' focus?" },
  { text: 'Which name sounds more like a premium app?' },
  { text: 'Which name would you be more likely to tell a friend about?' },
  { text: 'Which name do you like more as an enticing pet simulator?' },
  { text: 'Which name would you be more likely to tap on in the App Store?' },
  { text: 'Which name is easier to remember after hearing it once?' },
  { text: 'Which name sounds more friendly and approachable?' },
  { text: 'Which name better suggests reducing phone use?' },
  { text: 'Which name feels more premium or polished?' },
  { text: 'Which name is clearer about what the app does?' },
  { text: 'Which name would you feel comfortable recommending to a friend?' },
  { text: 'Which name fits a cute virtual pet metaphor better?' },
  { text: 'Which name is easier to spell correctly when searching?' },
  { text: 'Which name feels calmer or less stressful?' },
  { text: 'Which name better implies long-term behavior change?' },
  { text: 'Which name has better viral growth potential?' },
  { text: 'Which name would you remember a week later?' },
  { text: 'Which name best matches "pet that grows when you stay off your phone"?' },
  { text: 'Which name do you prefer?' },
  { text: 'Which name do you like more?' },
]

/**
 * One-time (or dev reset) seed: writes name and question docs into the `Names` and
 * `Questions` subcollections. Requires Firestore rules to allow these writes during setup.
 */
export async function seedNameSurveyRegistry(): Promise<void> {
  const db = getFirestoreDb()
  const namesCol = collection(
    db,
    SURVEYS_COLLECTION,
    NAME_SURVEY_DOC_ID,
    NAME_SURVEY_SUBCOL_NAMES,
  )
  const questionsCol = collection(
    db,
    SURVEYS_COLLECTION,
    NAME_SURVEY_DOC_ID,
    NAME_SURVEY_SUBCOL_QUESTIONS,
  )
  const batch = writeBatch(db)

  for (const n of SEED_APP_NAMES) {
    const ref = doc(namesCol)
    batch.set(ref, {
      shortName: n.shortName,
      extendedName: n.extendedName,
      currentElo: DEFAULT_ELO,
      totalMatches: 0,
    })
  }

  for (const q of SEED_SURVEY_QUESTIONS) {
    const ref = doc(questionsCol)
    batch.set(ref, {
      text: q.text,
    })
  }

  await batch.commit()
}

const entry = process.argv[1]
const isDirectRun =
  Boolean(entry) && import.meta.url === pathToFileURL(entry!).href

if (isDirectRun) {
  seedNameSurveyRegistry()
    .then(() => {
      console.log('Name survey registry seeded.')
      process.exit(0)
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
