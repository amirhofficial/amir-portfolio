# Amir Heidari — Portfolio

پورتفولیوی شخصی امیر حیدری. Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion.
بدون Three.js / WebGL — جلوه‌ی Orb با canvas 2D ساخته شده (سبک‌تر، بدون کتابخانه‌ی اضافه).

## اجرا روی سیستم خودتان

```bash
npm install
npm run dev       # http://localhost:3000
```

برای build نهایی:

```bash
npm run build
npm run start
```

برای بررسی خطاهای TypeScript:

```bash
npm run typecheck
```

> **نکته‌ی مهم و صادقانه:** این پروژه در یک محیط sandboxed بدون دسترسی به اینترنت نوشته شده،
> پس امکان اجرای واقعی `npm install` / `npm run build` در همان محیط نبود و build واقعاً تست نشده.
> کد با دقت و دستی نوشته شده (بدون کپی از جای دیگر)، ولی حتماً قبل از استفاده‌ی نهایی
> یک بار `npm install && npm run build` را خودتان اجرا کنید تا مطمئن شوید خطای بدون‌مشکل build می‌گیرد.
> اگر جایی خطا داد، بگویید متن خطا را برایم بفرستید تا رفعش کنم.

---

## ساختار پروژه

```
app/
  layout.tsx        فونت‌ها (Space Grotesk / Inter / JetBrains Mono)، متادیتای SEO، چیدمان کلی
  page.tsx           ترتیب سکشن‌ها
  globals.css         توکن‌های طراحی (رنگ، تایپوگرافی، spacing)، تنها منبع CSS خام پروژه

components/
  layout/            Navigation, Footer
  ui/                 Orb، CustomCursor، RevealText، Button، GrainOverlay، AtmosphereBackground، ...
  sections/           Hero، About، Capabilities، Skills، FeaturedProject، Process، Statement، Contact

data/                 محتوای هر بخش به شکل آرایه/آبجکت — برای اضافه کردن پروژه یا مهارت جدید فقط همینجا را ویرایش کنید
hooks/                useMousePosition (یک listener مشترک)، usePrefersReducedMotion، useIsTouchDevice
lib/utils.ts          توابع کمکی + توکن‌های زمان‌بندی انیمیشن (DURATION, EASE_CINEMATIC)
```

## چیزهایی که باید خودتان جایگزین کنید

قبل از publish کردن، این‌ها placeholder هستند و باید با اطلاعات واقعی جایگزین شوند
(طبق دستور اولیه، هیچ پروژه/لینک/آماری ساختگی وارد نشده):

- **`data/projects.ts`** — نام، توضیح، تگ‌ها، تصویر (`image`) و لینک (`href`) پروژه‌ی واقعی‌تان.
  ساختار داده از قبل چندپروژه‌ای است؛ برای اضافه کردن پروژه‌ی بعدی کافی‌ست یک آبجکت دیگر به آرایه اضافه کنید — چیزی در UI عوض نمی‌شود.
- **`data/social.ts`** — ایمیل واقعی و لینک‌های GitHub / LinkedIn / Instagram.
- اگر می‌خواهید فونت واقعی **Satoshi** یا **Geist** به‌جای Space Grotesk/Inter استفاده شود، باید فایل‌های فونت را خودتان از fontshare.com یا vercel دانلود و در `app/layout.tsx` جایگزین کنید (من در این محیط دسترسی به اینترنت برای دانلود فونت نداشتم، به همین دلیل از فونت‌های معادل روی Google Fonts که از طریق `next/font/google` بدون نیاز به فایل جداگانه لود می‌شوند استفاده شد).
- فاویکون/آیکون سایت اضافه نشده — یک فایل `app/icon.png` (یا `icon.tsx` با next/og) اضافه کنید.

## سیستم‌های اصلی که پیاده‌سازی شده

- **Design system**: همه‌ی رنگ‌ها، تایپوگرافی (کلمپ‌های ریسپانسیو دقیقاً مطابق مشخصات دسکتاپ/موبایل)، spacing و breakpoint های سفارشی (`xs 480 / sm 650 / md 900 / lg 1200`) در `tailwind.config.ts` و `globals.css` متمرکز شده‌اند.
- **Orb**: canvas 2D — هسته‌ی نورانی + سه حلقه‌ی بیضی چرخان + ذره‌های کم‌تعداد، با پارالاکس موس (lerp شده) و واکنش به اسکرول در Hero.
- **کرسر سفارشی**: یک listener مشترک برای mousemove (`useMousePositionRef`) به‌جای چند listener پخش‌شده در کامپوننت‌های مختلف؛ روی موبایل/تاچ کاملاً غیرفعال می‌شود.
- **موشن**: یک منبع واحد برای easing/duration (`lib/utils.ts`) که همه‌جا استفاده می‌شود؛ ورود صحنه‌ای Hero طبق ترتیب مشخص‌شده (پس‌زمینه → Orb → eyebrow → AMIR → HEIDARI → نقش → توضیح → دکمه‌ها → متادیتا → اسکرول ایندیکیتور)، بین ۱.۵ تا ۲.۲ ثانیه.
- **دسترس‌پذیری**: HTML سمانتیک، focus-visible واضح، همه‌ی نودهای Skills هم با موس هم با کیبورد (focus/blur) قابل تعامل هستند، `prefers-reduced-motion` هم در CSS و هم در JS (Orb، RevealText، ScrollIndicator) رعایت شده.
- **موبایل**: نویگیشن به منوی تمام‌صفحه تبدیل می‌شود، ویژوالایزیشن Skills به دو لیست ساده تبدیل می‌شود، Orb و ذرات کوچک‌تر/کم‌تر می‌شوند.
- **بدون اطلاعات ساختگی**: پروژه، آمار، مشتری یا سابقه‌ی جعلی وارد نشده؛ جاهایی که اطلاعات واقعی لازم بود به‌صراحت به‌عنوان placeholder علامت‌گذاری شده.
