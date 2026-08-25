import type { Language } from './language';

export const translations: Record<
  Language,
  {
    nav: {
      about: string;
      capabilities: string;
      work: string;
      process: string;
      contact: string;
    };

    language: {
      english: string;
      persian: string;
    };

    hero: {
      eyebrow: string;
      description: string;
      viewWork: string;
      letsTalk: string;
      basedLabel: string;
      basedValue: string;
      focusLabel: string;
      focusValue: string;
    };

    about: {
      eyebrow: string;
      heading: string[];
      paragraphs: string[];
      closing: string;
      quote: string;
      currentState: string;
      now: string;
    };

    capabilities: {
      eyebrow: string;
      heading: string[];
      intro: string;
      footer: string;
      areas: string;
    };

    skills: {
      eyebrow: string;
      heading: string[];
      intro: string;
      skill: string;
      tool: string;
      hover: string;
      interactiveMap: string;
      technical: string;
      tools: string;
    };

    work: {
      eyebrow: string;
      intro: string;
      selected: string;
      featuredProject: string;
      inDevelopment: string;
      projectPlaceholderTitle: string;
      projectPlaceholderDescription: string;
      technologies: string;
      status: string;
      comingSoon: string;
    };

    process: {
      eyebrow: string;
      heading: string[];
      intro: string;
      think: {
        title: string;
        description: string;
        label: string;
      };
      design: {
        title: string;
        description: string;
        label: string;
      };
      build: {
        title: string;
        description: string;
        label: string;
      };
      evolve: {
        title: string;
        description: string;
        label: string;
      };
      footer: string;
    };

    statement: {
      eyebrow: string;
      heading: string[];
      description: string;
      principle: string;
    };

    lunorun: {
      eyebrow: string;
      label: string;
      heading: string[];
      description: string;
      play: string;
      record: string;
      arena: string;
      footer: string;
    };

    contact: {
      eyebrow: string;
      intro: string;
      heading: string[];
      startConversation: string;
      email: string;
      elsewhere: string;
      github: string;
      telegram: string;
      instagram: string;
    };

    footer: {
      signature: string;
    };
  }
> = {
  /* =========================================================
     ENGLISH
  ========================================================= */

  en: {
    nav: {
      about: 'About',
      capabilities: 'Capabilities',
      work: 'Work',
      process: 'Process',
      contact: 'Contact',
    },

    language: {
      english: 'EN',
      persian: 'FA',
    },

    hero: {
      eyebrow:
        'Designer · Developer · Digital Creative',

      description:
        'I build digital experiences where design, technology, and interaction meet.',

      viewWork:
        'View Work',

      letsTalk:
        'Let’s Talk',

      basedLabel:
        'Based',

      basedValue:
        'Remote / Worldwide',

      focusLabel:
        'Focus',

      focusValue:
        'Web · Design · AI',
    },

    about: {
      eyebrow:
        'About',

      heading: [
        'I Build',
        'Digital',
        'Experiences.',
      ],

      paragraphs: [
        'I’m a self-taught designer and developer who enjoys turning ideas into real things.',

        'I build with code, think through design, and use AI as part of the process — not as a shortcut, but as another tool for exploring, testing, and building better.',
      ],

      closing:
        'Still learning — always building.',

      quote:
        '“I prefer to let my work speak for itself.”',

      currentState:
        'CURRENT STATE',

      now:
        '2026 / NOW',
    },

    capabilities: {
      eyebrow:
        'Capabilities',

      heading: [
        'What I bring',
        'to the table.',
      ],

      intro:
        'A focused set of capabilities built around digital products, visual thinking, and experimentation.',

      footer:
        'CAPABILITY / SYSTEM / OUTPUT',

      areas:
        '04 AREAS',
    },

    skills: {
      eyebrow:
        'Skills / Toolkit',

      heading: [
        'The stack behind',
        'the work.',
      ],

      intro:
        'A practical toolkit shaped by building, experimenting, and continuously learning.',

      skill:
        'SKILL',

      tool:
        'TOOL',

      hover:
        'Hover or focus a node to explore the toolkit.',

      interactiveMap:
        'INTERACTIVE MAP',

      technical:
        'Technical',

      tools:
        'Tools',
    },

    work: {
      eyebrow:
        'Selected Work',

      intro:
        'A small collection of work built around design, technology and interaction.',

      selected:
        'Selected / 01',

      featuredProject:
        'Featured Project',

      inDevelopment:
        'IN DEVELOPMENT',

      projectPlaceholderTitle:
        'Add Your Project Name',

      projectPlaceholderDescription:
        'Replace this with a short, honest description of the project — what it is, what problem it solves, and what you built.',

      technologies:
        'Technologies',

      status:
        'STATUS',

      comingSoon:
        'COMING SOON',
    },

    process: {
      eyebrow:
        'Process',

      heading: [
        'How I work.',
      ],

      intro:
        'From the first idea to a working digital experience — deliberate, iterative, and always evolving.',

      think: {
        title:
          'Think',

        description:
          'Understanding the problem before touching a single pixel or line of code.',

        label:
          'PHASE',
      },

      design: {
        title:
          'Design',

        description:
          'Building the visual direction — structure, hierarchy, and the details that hold it together.',

        label:
          'PHASE',
      },

      build: {
        title:
          'Build',

        description:
          'Turning the idea into a working product, piece by piece.',

        label:
          'PHASE',
      },

      evolve: {
        title:
          'Evolve',

        description:
          'Improve. Learn. Iterate. Nothing ships and stays static.',

        label:
          'PHASE',
      },

      footer:
        'FROM IDEA TO BUILD',
    },

    statement: {
      eyebrow:
        'Statement',

      heading: [
        'I don’t just build interfaces.',
        'I build experiences.',
      ],

      description:
        'Thoughtful systems, expressive details, and digital products designed to feel as good as they work.',

      principle:
        'LESS / BETTER',
    },

    lunorun: {
      eyebrow:
        'INTERACTION',

      label:
        'LUNORUN',

      heading: [
        'PLAY A GAME?',
      ],

      description:
        'Think you can beat my record?',

      play:
        'PLAY MY GAME',

      record:
        'AMIR’S RECORD',

      arena:
        'SPACE / TAP TO JUMP',

      footer:
        'OPTIONAL DETOUR / GAME',
    },

    contact: {
      eyebrow:
        'Contact',

      intro:
        'Have an idea?',

      heading: [
        'Let’s',
        'Make It Real.',
      ],

      startConversation:
        'Start a Conversation',

      email:
        'Email',

      elsewhere:
        'Elsewhere',

      github:
        'GitHub',

      telegram:
        'Telegram',

      instagram:
        'Instagram',
    },

    footer: {
      signature:
        'Design · Code · Learn · Build',
    },
  },

  /* =========================================================
     PERSIAN
  ========================================================= */

  fa: {
    nav: {
      about:
        'درباره من',

      capabilities:
        'توانمندی‌ها',

      work:
        'پروژه‌ها',

      process:
        'روند کار',

      contact:
        'ارتباط',
    },

    language: {
      english:
        'EN',

      persian:
        'FA',
    },

    hero: {
      eyebrow:
        'طراح · توسعه‌دهنده · خالق دیجیتال',

      description:
        'تجربه‌های دیجیتالی می‌سازم که طراحی، تکنولوژی و تعامل را در کنار هم قرار می‌دهند.',

      viewWork:
        'مشاهده پروژه‌ها',

      letsTalk:
        'ارتباط با من',

      basedLabel:
        'موقعیت',

      basedValue:
        'Remote / Worldwide',

      focusLabel:
        'تمرکز',

      focusValue:
        'Web · Design · AI',
    },

    about: {
      eyebrow:
        'درباره من',

      heading: [
        'ایده هارا',
        'به واقعیت',
        'تبدیل میکنم.',
      ],

      paragraphs: [
        'یک طراح و توسعه‌دهنده خودآموخته‌ام و از تبدیل ایده‌ها به چیزهای واقعی لذت می‌برم.',

        'با کد می‌سازم، با طراحی فکر می‌کنم و از هوش مصنوعی به‌عنوان بخشی از فرایند استفاده می‌کنم؛ نه به‌عنوان میان‌بر، بلکه به‌عنوان ابزاری برای کشف، آزمایش و ساختن بهتر.',
      ],

      closing:
        'هنوز در حال یادگیری‌ام — همیشه در حال ساختن.',

      quote:
        '«ترجیح می‌دهم بگذارم کارم خودش حرف بزند.»',

      currentState:
        'CURRENT STATE',

      now:
        '2026 / NOW',
    },

    capabilities: {
      eyebrow:
        'توانمندی‌ها',

      heading: [
        'آنچه انجام میدهم .',
        ' ',
      ],

      intro:
        'مجموعه‌ای متمرکز از توانمندی‌ها در ساخت محصولات دیجیتال، نگاه بصری و تجربه‌کردن ایده‌های جدید.',

      footer:
        'CAPABILITY / SYSTEM / OUTPUT',

      areas:
        '04 AREAS',
    },

    skills: {
      eyebrow:
        'مهارت‌ها / ابزارها',

      heading: [
        '',
        'مهارت‌ها و ابزارها',
      ],

      intro:
        'مجموعه‌ای کاربردی از مهارت‌ها و ابزارها که با ساختن، تجربه‌کردن و یادگیری مداوم شکل گرفته است.',

      skill:
        'مهارت',

      tool:
        'ابزار',

      hover:
        'برای بررسی مهارت‌ها و ابزارها، روی یک نقطه بروید یا آن را انتخاب کنید.',

      interactiveMap:
        'INTERACTIVE MAP',

      technical:
        'فنی',

      tools:
        'ابزارها',
    },

    work: {
      eyebrow:
        'پروژه‌های منتخب',

      intro:
        'مجموعه‌ای کوچک از کارهایی که حول طراحی، تکنولوژی و تعامل ساخته شده‌اند.',

      selected:
        'منتخب / ۰۱',

      featuredProject:
        'پروژه منتخب',

      inDevelopment:
        'در حال توسعه',

      projectPlaceholderTitle:
        'نام پروژه را اضافه کنید',

      projectPlaceholderDescription:
        'این بخش را با توضیحی کوتاه و صادقانه درباره پروژه جایگزین کن؛ اینکه چیست، چه مشکلی را حل می‌کند و چه چیزی ساخته‌ای.',

      technologies:
        'تکنولوژی‌ها',

      status:
        'وضعیت',

      comingSoon:
        'به‌زودی',
    },

    process: {
      eyebrow:
        'روند کار',

      heading: [
        'چطور کار می‌کنم.',
      ],

      intro:
        'از اولین ایده تا یک تجربه دیجیتال واقعی — هدفمند، مرحله‌به‌مرحله و همیشه در حال تکامل.',

      think: {
        title:
          'فکر',

        description:
          'قبل از دست زدن به حتی یک پیکسل یا خط کد، مسئله را درک می‌کنم.',

        label:
          'PHASE',
      },

      design: {
        title:
          'طراحی',

        description:
          'جهت بصری را می‌سازم؛ از ساختار و سلسله‌مراتب تا جزئیاتی که همه‌چیز را به هم وصل می‌کنند.',

        label:
          'PHASE',
      },

      build: {
        title:
          'ساخت',

        description:
          'ایده را قدم‌به‌قدم به یک محصول واقعی و قابل استفاده تبدیل می‌کنم.',

        label:
          'PHASE',
      },

      evolve: {
        title:
          'تکامل',

        description:
          'بهبود، یادگیری و تکرار؛ هیچ چیزی برای همیشه ثابت نمی‌ماند.',

        label:
          'PHASE',
      },

      footer:
        'از ایده تا ساخت',
    },

    statement: {
      eyebrow:
        'بیانیه',

      heading: [
        'ایده‌ها برای من وقتی ارزش دارند',
        'که ساخته شوند .',
      ],

      description:
        'سیستم‌هایی فکرشده، جزئیاتی با شخصیت و محصولات دیجیتالی که قرار است همان‌قدر که خوب کار می‌کنند، خوب هم احساس شوند.',

      principle:
        'LESS / BETTER',
    },

    lunorun: {
      eyebrow:
        'INTERACTION',

      label:
        'LUNORUN',

      heading: [
        'یک بازی بزنیم؟',
      ],

      description:
        'فکر می‌کنی می‌تونی رکوردم رو بزنی؟',

      play:
        'بازی را شروع کن',

      record:
        'رکورد امیر',

      arena:
        'SPACE / TAP TO JUMP',

      footer:
        'OPTIONAL DETOUR / GAME',
    },

    contact: {
      eyebrow:
        'ارتباط',

      intro:
        'ایده‌ای داری؟',

      heading: [
        'بیایید',
        'واقعی‌ش کنیم.',
      ],

      startConversation:
        'شروع یک گفتگو',

      email:
        'ایمیل',

      elsewhere:
        'شبکه‌ها',

      github:
        'GitHub',

      telegram:
        'Telegram',

      instagram:
        'Instagram',
    },

    footer: {
      signature:
        'طراحی · کدنویسی · یادگیری · ساختن',
    },
  },
};