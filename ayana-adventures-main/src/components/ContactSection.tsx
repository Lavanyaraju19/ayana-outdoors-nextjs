"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Phone, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ClickableHomeCard from './ClickableHomeCard';
import HomeSectionHeader from './HomeSectionHeader';
import { submitEnquiry } from '@/app/actions/enquiry';
import type { ContactOption, Adventure } from '@/lib/content';

const icons = [Phone, MessageCircle, Mail, Send];

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a valid phone or WhatsApp number."),
  childName: z.string().trim().optional(),
  childAge: z.string().trim().optional(),
  adventureId: z.string().optional(),
  message: z.string().trim().optional(),
  companyWebsite: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactSectionProps {
  contactOptions: ContactOption[];
  adventures: Adventure[];
}

const ContactSection = ({ contactOptions, adventures }: ContactSectionProps) => {
  const pathname = usePathname();
  const [result, setResult] = useState<{ status: 'success' | 'error'; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (values: FormValues) => {
    setResult(null);
    const response = await submitEnquiry({
      ...values,
      adventureId: values.adventureId || '',
      sourcePage: pathname || '/contact',
    });

    if (response.status === 'success') {
      setResult({ status: 'success', message: response.message ?? "Thanks — we've received your enquiry." });
      reset();
    } else {
      setResult({ status: 'error', message: response.message ?? 'Something went wrong. Please try again.' });
    }
  };

  return (
    <section id="contact" className="relative z-10 py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background/60" />
      <div className="container mx-auto px-4 relative z-10">
        <HomeSectionHeader
          eyebrow="Connect With Us"
          title="Let's Plan Your Child's"
          highlight="Outdoor Learning Journey"
          description="Whether you're a parent, school or organisation, we're here to help you choose the right outdoor learning experience. Let's start the conversation."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {contactOptions.map((option, index) => {
            const Icon = icons[index % icons.length];

            return (
              <ClickableHomeCard key={option.id} link={option.link} ariaLabel={`${option.title}: ${option.action}`}>
                <Icon className="h-8 w-8 text-primary mb-5" />
                <h3 className="font-display text-xl text-white mb-2">{option.title}</h3>
                <p className="font-body text-sm text-white/90 font-semibold pr-8 mb-4">{option.description}</p>
                <span className="font-display text-sm text-primary">{option.action}</span>
              </ClickableHomeCard>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 rounded-3xl border border-white/15 bg-white/10 p-5 md:p-8 shadow-2xl shadow-black/25 backdrop-blur-xl"
        >
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-white mb-3">Join the Ayana Outdoors Community</h3>
            <p className="font-body text-white/90 font-semibold mb-6">
              Share basic details now, then speak to the team for program fit, safety readiness and schedule confirmation.
            </p>

            {result?.status === 'success' ? (
              <div className="flex items-start gap-3 rounded-xl border border-primary/40 bg-primary/10 p-5" role="status">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <p className="font-body text-white font-semibold">{result.message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Honeypot — hidden from real visitors via CSS, not left off the DOM */}
                <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register('companyWebsite')} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      aria-label="Parent / Guardian Name"
                      placeholder="Parent / Guardian Name *"
                      className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 font-body font-semibold text-white placeholder:text-white/55 outline-none backdrop-blur-xl focus:border-primary"
                      {...register('name')}
                    />
                    {errors.name && <p className="mt-1 text-xs font-semibold text-red-300">{errors.name.message}</p>}
                  </div>
                  <div>
                    <input
                      aria-label="Email"
                      type="email"
                      placeholder="Email *"
                      className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 font-body font-semibold text-white placeholder:text-white/55 outline-none backdrop-blur-xl focus:border-primary"
                      {...register('email')}
                    />
                    {errors.email && <p className="mt-1 text-xs font-semibold text-red-300">{errors.email.message}</p>}
                  </div>
                  <div>
                    <input
                      aria-label="WhatsApp Number"
                      placeholder="WhatsApp Number *"
                      className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 font-body font-semibold text-white placeholder:text-white/55 outline-none backdrop-blur-xl focus:border-primary"
                      {...register('phone')}
                    />
                    {errors.phone && <p className="mt-1 text-xs font-semibold text-red-300">{errors.phone.message}</p>}
                  </div>
                  <input
                    aria-label="Child's Name"
                    placeholder="Child's Name"
                    className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 font-body font-semibold text-white placeholder:text-white/55 outline-none backdrop-blur-xl focus:border-primary"
                    {...register('childName')}
                  />
                  <input
                    aria-label="Child's Age"
                    placeholder="Child's Age"
                    className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 font-body font-semibold text-white placeholder:text-white/55 outline-none backdrop-blur-xl focus:border-primary"
                    {...register('childAge')}
                  />
                  <select
                    aria-label="Interested Program"
                    defaultValue=""
                    className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 font-body font-semibold text-white outline-none backdrop-blur-xl focus:border-primary [&>option]:text-foreground"
                    {...register('adventureId')}
                  >
                    <option value="">Interested Program (optional)</option>
                    {adventures.map((adventure) => (
                      <option key={adventure.id} value={adventure.id}>{adventure.title}</option>
                    ))}
                  </select>
                  <textarea
                    aria-label="Message"
                    placeholder="Message"
                    rows={4}
                    className="sm:col-span-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 font-body font-semibold text-white placeholder:text-white/55 outline-none backdrop-blur-xl focus:border-primary"
                    {...register('message')}
                  />
                </div>

                {result?.status === 'error' && (
                  <p className="mt-4 text-sm font-semibold text-red-300" role="alert">{result.message}</p>
                )}

                <div className="mt-5 flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="bg-primary text-primary-foreground hover:bg-accent rounded-full px-8 py-6 cursor-none gap-2"
                  >
                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isSubmitting ? 'Sending…' : 'Join the Community'}
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 py-6 cursor-none">
                    <a href="https://wa.me/919876543210?text=I%20want%20to%20join%20the%20Ayana%20Outdoors%20community" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
                  </Button>
                </div>
              </form>
            )}
          </div>

          <div className="group relative min-h-72 overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 via-secondary/50 to-background p-6 cursor-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.22),transparent_38%)]" />
            <div className="relative h-full flex flex-col justify-between">
              <MessageCircle className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
              <div>
                <p className="font-body text-sm uppercase tracking-[0.25em] text-primary mb-3">Community Guidance</p>
                <h3 className="font-display text-3xl text-white mb-3">Why Connect With Us?</h3>
                <p className="font-body text-white/90 font-semibold">
                  Every child is unique. Our team helps parents and schools choose outdoor experiences based on age, interests and learning goals, ensuring every journey is safe, meaningful and memorable.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
