import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import type { EmailSendStatus } from '@/components/home/Contact/useEmailSend'
import { getFirestoreDb } from '@/lib/firebase'

export type PhreePetSignupFormData = {
  email: string
  device: 'ios' | 'android'
  name: string
}

export interface UsePhreePetSignupProps {
  onStatusChange: (status: EmailSendStatus, errorMessage?: string) => void
}

export const usePhreePetSignup = ({ onStatusChange }: UsePhreePetSignupProps) => {
  const submitSignup = async (formData: PhreePetSignupFormData) => {
    onStatusChange('sending')

    try {
      const db = getFirestoreDb()
      await addDoc(collection(db, 'AlphaSignup'), {
        timestamp: serverTimestamp(),
        Email: formData.email,
        isAndroid: formData.device === 'android',
        Name: formData.name,
      })

      onStatusChange('success')
      return true
    } catch (error) {
      console.error('Error submitting PhreePet signup:', error)
      onStatusChange('error', 'Something went wrong. Please try again later.')
      return false
    }
  }

  return { submitSignup }
}

export default usePhreePetSignup
