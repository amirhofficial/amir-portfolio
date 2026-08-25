export type LocalizedText = {
  en: string;
  fa: string;
};

export interface Project {
  index: string;
  name: string;
  description: LocalizedText;
  year: string;
  tags: string[];
  image: string;
  href: string;
}

export const projects: Project[] = [
  {
    index: '01',

    name: 'TAAVONI 5',

    description: {
      en:
        'A real-world website for Farhangian Cooperative District 5 in Isfahan, focused on presenting services, membership information, installment purchasing, partner stores, and contact details in a clear and accessible digital experience.',

      fa:
        'یک وب‌سایت واقعی برای تعاونی مصرف فرهنگیان ناحیه ۵ اصفهان که با تمرکز بر معرفی خدمات، اطلاعات عضویت، خرید اقساطی، فروشگاه‌های طرف قرارداد و راه‌های ارتباطی طراحی و توسعه داده شده است.',
    },

    year: '2026',

    tags: [
      'HTML',
      'CSS',
      'Python',
    ],

    image:
      '/project/taavoni.png',

    href:
      'https://sherkat5.taavoni.workers.dev/',
  },
];