export type LocalizedText = {
  en: string;
  fa: string;
};

export interface Capability {
  index: string;
  title: LocalizedText;
  description: LocalizedText;
}

export const capabilities: Capability[] = [
  {
    index: '01',

    title: {
      en: 'Web Development',
      fa: 'توسعه وب',
    },

    description: {
      en: 'Building interfaces from the ground up with clean structure, thoughtful styling, responsive layouts, and attention to the details that make a product feel complete.',

      fa: 'ساخت رابط‌های کاربری از پایه با ساختاری تمیز، طراحی دقیق، چیدمان واکنش‌گرا و توجه به جزئیاتی که یک محصول را کامل‌تر می‌کنند.',
    },
  },

  {
    index: '02',

    title: {
      en: 'UI / Digital Design',
      fa: 'UI / طراحی دیجیتال',
    },

    description: {
      en: 'Composing layouts, type, and hierarchy so an interface reads clearly before it says a single word.',

      fa: 'ترکیب چیدمان، تایپوگرافی و سلسله‌مراتب بصری به شکلی که یک رابط قبل از هر چیزی واضح و قابل درک باشد.',
    },
  },

  {
    index: '03',

    title: {
      en: 'AI & Automation',
      fa: 'هوش مصنوعی و اتوماسیون',
    },

    description: {
      en: 'Using AI as a working tool — for research, iteration, and problem-solving — inside a real design process.',

      fa: 'استفاده از هوش مصنوعی به‌عنوان یک ابزار واقعی برای تحقیق، آزمایش، تکرار و حل مسئله در یک فرایند طراحی واقعی.',
    },
  },

  {
    index: '04',

    title: {
      en: 'Digital Experiences',
      fa: 'رابط های دیجیتال',
    },

    description: {
      en: 'Bringing structure, design, and interaction together into something that feels considered, not assembled.',

      fa: 'ترکیب ساختار، طراحی و تعامل برای ساخت چیزی که فکرشده و هدفمند به نظر برسد، نه چیزی که صرفاً کنار هم قرار گرفته باشد.',
    },
  },
];