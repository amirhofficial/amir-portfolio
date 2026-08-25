'use client';

import { motion } from 'framer-motion';
import RevealText from '@/components/ui/RevealText';
import Button from '@/components/ui/Button';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import { email, socialLinks } from '@/data/social';
import { DURATION, EASE_CINEMATIC } from '@/lib/utils';

export default function Contact() {
  return (
    <section id="contact" className="section relative flex min-h-[90vh] flex-col justify-center">
      <div className="section-inner">
        <SectionEyebrow index="07" label="Contact" />

        <div className="mt-16 md:mt-20">
          <span className="text-eyebrow block">Have an idea?</span>
          <h2 className="mt-4">
            <RevealText text="Let&rsquo;s" as="span" speed="cinematic" className="text-hero block text-ink-primary" />
            <RevealText
              text="Make It"
              as="span"
              speed="cinematic"
              delay={0.1}
              className="text-hero block text-ink-primary"
            />
            <RevealText
              text="Real."
              as="span"
              speed="cinematic"
              delay={0.2}
              className="text-hero block text-ink-primary/[0.12] [-webkit-text-stroke:1px_rgba(245,245,245,0.4)]"
            />
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: DURATION.reveal, delay: 0.45, ease: EASE_CINEMATIC }}
            className="mt-14 flex flex-col gap-10 md:mt-16 md:flex-row md:items-end md:justify-between"
          >
            <Button href={email.href} cursorLabel="OPEN">
              Start a Conversation ↗
            </Button>

            <div className="flex flex-col gap-6 sm:flex-row sm:gap-14">
              <div>
                <p className="text-meta text-ink-faint">Email</p>
                <a
                  href={email.href}
                  data-cursor="OPEN"
                  className="text-body mt-1 block text-ink-secondary transition-colors duration-hover hover:text-ink-primary"
                >
                  {email.display}
                </a>
              </div>
              <div>
                <p className="text-meta text-ink-faint">Elsewhere</p>
                <div className="mt-1 flex gap-5">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="OPEN"
                      className="text-body block text-ink-secondary transition-colors duration-hover hover:text-ink-primary"
                    >
                      {link.display}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
