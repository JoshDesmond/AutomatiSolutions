import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import textureBg from '@/assets/Texture.jpg'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { EmailSendStatus } from '@/components/home/Contact/useEmailSend'
import usePhreePetSignup from './usePhreePetSignup'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  device: z.enum(['ios', 'android'], {
    required_error: 'Please select your primary device',
  }),
  name: z
    .string()
    .trim()
    .min(1, 'Please enter your name')
    .max(128, 'Name must be 128 characters or less'),
})

type FormValues = z.infer<typeof formSchema>

const PhreePetSignupSection: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<EmailSendStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const { submitSignup } = usePhreePetSignup({
    onStatusChange: (status, errorMsg) => {
      setSubmitStatus(status)
      if (errorMsg) setErrorMessage(errorMsg)
    },
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      device: undefined,
      name: '',
    },
  })

  async function onSubmit(data: FormValues) {
    const success = await submitSignup(data)
    if (success) {
      form.reset()
    }
  }

  return (
    <section
      id="phreepet-signup"
      className="relative overflow-hidden py-16"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 z-0" />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10 opacity-10"
        style={{ backgroundImage: `url(${textureBg})` }}
      />
      <div className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Be the First to Hatch a PhreePet.
        </h2>
        <p className="mt-4 text-lg text-indigo-100">
          The first round of closed Alpha testing kicks off soon. Drop your email below to
          claim your spot and be one of the first to raise a PhreePet.
        </p>

        {submitStatus === 'success' && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md max-w-xl mx-auto">
            <p className="text-green-800 text-center">
              You&apos;re on the list! We&apos;ll be in touch when alpha access opens.
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md max-w-xl mx-auto">
            <p className="text-red-800 text-center">{errorMessage}</p>
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-lg text-left space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="mt-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="device"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Primary Device</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger id="phreepet-device" className="mt-1">
                        <SelectValue placeholder="Select your primary device" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ios">iOS</SelectItem>
                      <SelectItem value="android">Android</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your name"
                      autoComplete="name"
                      maxLength={128}
                      className="mt-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={submitStatus === 'sending'}
              className="w-full bg-gray-800 text-white hover:bg-gray-700 focus-visible:ring-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitStatus === 'sending' ? 'Sending...' : 'Request Access'}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
}

export default PhreePetSignupSection
