export type SkillGroup =
  | 'technical'
  | 'tool';

export type LocalizedText = {
  en: string;
  fa: string;
};

export interface SkillNode {
  id: string;
  label: string;
  group: SkillGroup;
  detail: LocalizedText;
  x: number;
  y: number;
}

export const skillNodes: SkillNode[] = [
  {
    id: 'html',
    label: 'HTML',
    group: 'technical',
    detail: {
      en: 'Structure & markup',
      fa: 'ساختار و نشانه‌گذاری',
    },
    x: 20,
    y: 24,
  },

  {
    id: 'css',
    label: 'CSS',
    group: 'technical',
    detail: {
      en: 'Layout & visual systems',
      fa: 'چیدمان و سیستم‌های بصری',
    },
    x: 40,
    y: 12,
  },

  {
    id: 'python',
    label: 'Python',
    group: 'technical',
    detail: {
      en: 'Logic & scripting',
      fa: 'منطق و اسکریپت‌نویسی',
    },
    x: 62,
    y: 20,
  },

  {
    id: 'ai',
    label: 'AI',
    group: 'technical',
    detail: {
      en: 'Applied exploration',
      fa: 'کاوش و استفاده عملی',
    },
    x: 80,
    y: 34,
  },

  {
    id: 'vscode',
    label: 'VS Code',
    group: 'tool',
    detail: {
      en: 'Primary editor',
      fa: 'ویرایشگر اصلی',
    },
    x: 28,
    y: 68,
  },

  {
    id: 'claude',
    label: 'Claude',
    group: 'tool',
    detail: {
      en: 'Reasoning & build partner',
      fa: 'همکار فکری و ساخت',
    },
    x: 52,
    y: 80,
  },

  {
    id: 'chatgpt',
    label: 'ChatGPT',
    group: 'tool',
    detail: {
      en: 'Research & ideation',
      fa: 'تحقیق و ایده‌پردازی',
    },
    x: 74,
    y: 66,
  },
];

export const skillConnections: Array<
  [string, string]
> = [
  ['html', 'css'],
  ['css', 'python'],
  ['python', 'ai'],
  ['html', 'vscode'],
  ['python', 'vscode'],
  ['vscode', 'claude'],
  ['claude', 'chatgpt'],
  ['ai', 'chatgpt'],
  ['claude', 'ai'],
];