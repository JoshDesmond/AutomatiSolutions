import emailjs from '@emailjs/browser';

export type ContactFormData = {
  name: string;
  email: string;
  service: string;
  message: string;
};

export type EmailSendStatus = 'idle' | 'sending' | 'success' | 'error';

export interface UseEmailSendProps {
  onStatusChange: (status: EmailSendStatus, errorMessage?: string) => void;
}

export const useEmailSend = ({ onStatusChange }: UseEmailSendProps) => {
  const sendEmail = async (formData: ContactFormData) => {
    onStatusChange('sending');

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        service: formData.service,
        message: formData.message,
        to_name: 'Josh Desmond',
      };

      await emailjs.send(
        'service_u0tg7s9', // EmailJS service ID
        'template_o3st8u8', // EmailJS template ID
        templateParams,
        'zgI3FjTCl-g92M_lP' // Replace with your EmailJS public key
      );

      onStatusChange('success');
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      onStatusChange('error', 'Failed to send message. Please try again later.');
      return false;
    }
  };

  return { sendEmail };
};

export default useEmailSend; 