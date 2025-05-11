import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useEmailSend, { EmailSendStatus, ContactFormData } from './useEmailSend';

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  service: z.enum([
    "Web & Mobile App Development",
    "Data Modernization & Analytics",
    "Business Process Automation",
    "AI Integration & Automation",
    "Not sure yet"
  ]),
  message: z.string().min(1, "Message is required")
});

type FormValues = z.infer<typeof formSchema>;

export const Contact: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<EmailSendStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const { sendEmail } = useEmailSend({
    onStatusChange: (status, errorMsg) => {
      setSubmitStatus(status);
      if (errorMsg) setErrorMessage(errorMsg);
    }
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "Not sure yet",
      message: ""
    },
  });

  async function onSubmit(data: FormValues) {
    const success = await sendEmail(data);
    if (success) {
      form.reset();
    }
  }

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">Get in touch</h2>
          <p className="mt-4 text-lg text-gray-600 text-center">
            Ready to discuss your project? Book a free 30-60 minute consultation.
          </p>
          
          {submitStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 text-center">
                Thank you for your message! I'll get back to you within 24 hours.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-center">
                {errorMessage}
              </p>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Interest</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Web & Mobile App Development">Web & Mobile App Development</SelectItem>
                        <SelectItem value="Data Modernization & Analytics">Data Modernization & Analytics</SelectItem>
                        <SelectItem value="Business Process Automation">Business Process Automation</SelectItem>
                        <SelectItem value="AI Integration & Automation">AI Integration & Automation</SelectItem>
                        <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tell me about your project</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                disabled={submitStatus === 'sending'}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitStatus === 'sending' ? 'Sending...' : 'Schedule Consultation'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 
