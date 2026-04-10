import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'

function viteEnv(key: keyof ImportMetaEnv): string | undefined {
  const v = import.meta.env?.[key]
  if (typeof v === 'string' && v !== '') return v
  return process.env[key]
}

function getFirebaseConfig() {
  return {
    apiKey: viteEnv('VITE_FIREBASE_API_KEY'),
    authDomain: viteEnv('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: viteEnv('VITE_FIREBASE_PROJECT_ID'),
    storageBucket: viteEnv('VITE_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: viteEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    appId: viteEnv('VITE_FIREBASE_APP_ID'),
  }
}

function isFirebaseConfigured(): boolean {
  const c = getFirebaseConfig()
  return Boolean(
    c.apiKey &&
      c.authDomain &&
      c.projectId &&
      c.storageBucket &&
      c.messagingSenderId &&
      c.appId,
  )
}

export function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured()) {
    throw new Error(
      'Firebase is not configured. Add VITE_FIREBASE_* variables to your .env file (see .env.example).',
    )
  }
  return getApps().length === 0 ? initializeApp(getFirebaseConfig()) : getApp()
}

let dbInstance: Firestore | null = null

export function getFirestoreDb(): Firestore {
  if (!dbInstance) {
    dbInstance = getFirestore(getFirebaseApp())
  }
  return dbInstance
}
