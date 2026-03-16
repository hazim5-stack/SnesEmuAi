# 🚀 نقل المشروع من Figma Make إلى Cursor

<div dir="rtl">

## 📌 ملاحظة مهمة

هذا المشروع تم بناؤه في **Figma Make** ويعمل حالياً في بيئة Figma الخاصة. لنقله إلى **Cursor** وتشغيله كمشروع React مستقل، اتبع الخطوات التالية بدقة.

---

## 📥 الطريقة 1: التحميل المباشر (الأسهل)

### الخطوة 1: تحميل المشروع من Figma Make

1. في واجهة Figma Make، ابحث عن زر **"Download"** أو **"Export"**
2. اختر **"Export as ZIP"** أو **"Download Code"**
3. احفظ الملف على جهازك

**إذا حصلت على ملف `.make`:**
- جرب تغيير الامتداد إلى `.zip` ثم فك الضغط
- أو استخدم الطريقة الثانية أدناه

### الخطوة 2: إعداد المشروع في Cursor

```bash
# فك ضغط الملف
unzip "project-name.zip"
cd project-name

# افتح المشروع في Cursor
cursor .
```

### الخطوة 3: إنشاء الملفات المفقودة

المشروع يحتاج إلى ملفات إضافية ليعمل خارج Figma Make:

#### أ) إنشاء `/src/main.tsx`:

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### ب) إنشاء `/index.html` في المجلد الرئيسي:

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SNES Emu AI - Premium Emulator</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

#### ج) تحديث `package.json`:

أضف أو تحقق من وجود هذا القسم:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### الخطوة 4: تثبيت التبعيات

```bash
npm install
```

### الخطوة 5: تشغيل المشروع

```bash
npm run dev
```

افتح المتصفح على: **http://localhost:5173**

---

## 📥 الطريقة 2: إنشاء مشروع جديد ونسخ الملفات

إذا لم تتمكن من تحميل المشروع من Figma Make:

### الخطوة 1: إنشاء مشروع Vite جديد

```bash
npm create vite@latest snes-emu-ai -- --template react-ts
cd snes-emu-ai
```

### الخطوة 2: تثبيت جميع التبعيات

**انسخ هذا الأمر بالكامل:**

```bash
npm install react-router lucide-react motion canvas-confetti recharts react-slick react-responsive-masonry react-dnd react-dnd-html5-backend @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip @radix-ui/react-slot @radix-ui/react-aspect-ratio sonner clsx tailwind-merge class-variance-authority cmdk date-fns embla-carousel-react input-otp react-day-picker react-hook-form@7.55.0 react-popper react-resizable-panels @popperjs/core next-themes vaul tw-animate-css @emotion/react @emotion/styled @mui/icons-material @mui/material
```

```bash
npm install -D @tailwindcss/vite tailwindcss vite @vitejs/plugin-react
```

### الخطوة 3: نسخ الملفات

من مشروع Figma Make، انسخ هذه المجلدات إلى المشروع الجديد:

```
المصدر                  →  الوجهة
─────────────────────────────────────
/src/app/               →  /src/app/
/src/styles/            →  /src/styles/
/src/imports/           →  /src/imports/ (إن وجد)
/vite.config.ts         →  /vite.config.ts
```

### الخطوة 4: إنشاء الملفات المطلوبة

نفس الملفات من الطريقة 1 (main.tsx و index.html)

### الخطوة 5: تشغيل المشروع

```bash
npm run dev
```

---

## ✅ التحقق من نجاح التثبيت

عند فتح **http://localhost:5173** يجب أن ترى:

### الصفحة الرئيسية تحتوي على:
- ⭐ خلفية داكنة كونية مع **نجوم متحركة**
- 🎮 **شريط جانبي أيسر** بشعار SNES Emu AI (أحمر/برتقالي/ذهبي)
- 📝 **"Welcome back"** في الأعلى
- 🕹️ **Recently Played** - 4 ألعاب بصور حقيقية:
  - Super Mario World
  - Chrono Trigger
  - Super Metroid
  - Final Fantasy VI
- 🎬 **Continue Playing** - كارت أفقي كبير مع:
  - صورة اللعبة على اليسار
  - عنوان اللعبة ونص فرعي
  - شريط تقدم (progress bar)
  - زرين على اليمين (Bookmark و Reload)
- ⚡ **Quick Actions** - 5 أزرار:
  - Load State (أزرق)
  - Save State (بنفسجي)
  - Reset (بنفسجي فاتح)
  - Enable Cheats (بنفسجي داكن)
  - Disable All (رمادي)
- 📌 **شريط جانبي أيمن** يحتوي على:
  - بطاقة "Welcome back" حمراء مع صورة Super Mario World
  - قسم "Recent Save States" مع صورتين مصغرتين
  - قسم "Cheats for this Game" مع قائمة أكواد
  - 🤖 بطاقة مساعد AI في الأسفل بلون بنفسجي

### إذا رأيت كل ما سبق = 🎉 التثبيت ناجح!

---

## 🎨 الألوان المستخدمة

تحقق من أن الألوان صحيحة:
- **الخلفية:** أزرق داكن (#0a0b1e)
- **الشريط الجانبي:** أزرق داكن (#0d0e22)
- **البطاقات:** أزرق داكن (#12132b)
- **اللون الأساسي:** أزرق كهربائي (#5865f2)
- **اللون الثانوي:** بنفسجي (#7c3aed)

---

## 🔧 حل المشاكل الشائعة

### ❌ خطأ: "Cannot find module './app/App'"

**الحل:**
```bash
# تأكد من وجود المجلد
ls src/app/App.tsx

# إذا لم يكن موجوداً، انسخ مجلد /src/app/ من مشروع Figma Make
```

### ❌ الصور لا تظهر

**الحل:**
```bash
# تأكد من وجود ملف ImageWithFallback
ls src/app/components/figma/ImageWithFallback.tsx

# إذا لم يكن موجوداً، أنشئه:
mkdir -p src/app/components/figma
```

ثم أنشئ الملف `/src/app/components/figma/ImageWithFallback.tsx`:

```typescript
import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

export function ImageWithFallback({ 
  src, 
  alt, 
  className, 
  fallback = 'https://via.placeholder.com/400x400/1a1b3a/5865f2?text=Game' 
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc(fallback)}
    />
  );
}
```

### ❌ خطأ: "react-router-dom is not installed"

**الحل:**
```bash
npm uninstall react-router-dom
npm install react-router
```

### ❌ Tailwind CSS لا يعمل

**الحل:** تأكد من أن `vite.config.ts` يحتوي على:

```typescript
import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
```

### ❌ النجوم في الخلفية لا تتحرك

**الحل:** تأكد من أن الصفحة الرئيسية تحتوي على CSS animation في الأسفل

---

## 📦 البناء للإنتاج

بعد نجاح التثبيت:

```bash
# بناء المشروع
npm run build

# معاينة النسخة النهائية
npm run preview
```

الملفات النهائية ستكون في مجلد `/dist`

---

## 📂 هيكل المشروع النهائي

```
snes-emu-ai/
├── index.html              ← أنشئه يدوياً
├── package.json
├── vite.config.ts
├── src/
│   ├── main.tsx           ← أنشئه يدوياً
│   ├── app/
│   │   ├── App.tsx
│   │   ├── routes.tsx
│   │   ├── components/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── figma/
│   │   │   │   └── ImageWithFallback.tsx
│   │   │   └── ui/
│   │   └── pages/
│   │       ├── Home.tsx
│   │       ├── Library.tsx
│   │       └── ...
│   ├── styles/
│   │   ├── index.css
│   │   ├── theme.css
│   │   ├── fonts.css
│   │   └── tailwind.css
│   └── imports/ (اختياري)
└── node_modules/
```

---

## 🎯 الخطوات التالية

بعد نجاح التثبيت:

1. ✅ استكشف جميع الصفحات من الشريط الجانبي
2. ✅ جرّب الأزرار والروابط
3. ✅ لاحظ الحركات والتأثيرات
4. ✅ خصص الألوان في `/src/styles/theme.css`
5. ✅ أضف ألعاباً جديدة في `/src/app/pages/Library.tsx`

---

## 📞 تحتاج مساعدة إضافية؟

راجع الملفات:
- [README.md](./README.md) - نظرة شاملة
- [INSTALLATION.md](./INSTALLATION.md) - دليل تفصيلي
- [QUICKSTART-AR.md](./QUICKSTART-AR.md) - بدء سريع
- [HOW-TO-INSTALL-IN-CURSOR.md](./HOW-TO-INSTALL-IN-CURSOR.md) - دليل إنجليزي

---

</div>

**🎮 بالتوفيق! استمتع بتطبيق SNES Emu AI في Cursor! ✨**
