import type { EmailSendStatus } from '@/components/home/Contact/useEmailSend'

export type PhreePetSignupFormData = {
  email: string
  device: 'ios' | 'android'
}

export interface UsePhreePetSignupProps {
  onStatusChange: (status: EmailSendStatus, errorMessage?: string) => void
}

export const usePhreePetSignup = ({ onStatusChange }: UsePhreePetSignupProps) => {
  const submitSignup = async (formData: PhreePetSignupFormData) => {
    onStatusChange('sending')

    try {
      // TODO: Integrate with email service or backend (e.g. EmailJS template, waitlist API).
      void formData
      await Promise.resolve()

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
