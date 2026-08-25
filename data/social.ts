export interface SocialLink {
  label: string;
  href: string;
  /** Displayed value, e.g. an email address or handle. */
  display: string;
}

/**
 * TODO — replace every href/display below with your real contact details.
 * None of these are real; they are placeholders so the layout is complete
 * and ready for your content.
 */
export const email: SocialLink = {
  label: 'Email',
  href: 'mailto:dravospc@gmail.com',
  display: 'dravospc@gmail.com',
};

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/your-username', display: 'GitHub' },
  { label: 'Telegram', href: 'https://t.me/Dravoos', display: 'Telegram' },
  { label: 'Instagram', href: 'https://instagram.com/mr_amir_heidari', display: 'Instagram' },
];
