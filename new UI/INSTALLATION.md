# 🎮 دليل تثبيت SNES Emu AI في Cursor

## 📋 المتطلبات الأساسية

- Node.js (الإصدار 18 أو أحدث)
- npm أو pnpm
- Cursor Editor

---

## 🚀 خطوات التثبيت

### الطريقة 1️⃣: تحميل المشروع من Figma Make

1. **في Figma Make:**
   - افتح المشروع "تصميم واجهة المستخدم"
   - ابحث عن زر **"Download"** أو **"Export"** في الزاوية العلوية اليمنى
   - اختر **"Download as ZIP"** أو **"Export Code"**

2. **فك الضغط:**
   ```bash
   unzip "تصميم-واجهة-المستخدم.zip"
   cd snes-emu-ai
   ```

3. **تثبيت الحزم:**
   ```bash
   npm install
   ```

4. **تشغيل المشروع:**
   ```bash
   npm run dev
   ```

---

### الطريقة 2️⃣: إنشاء مشروع جديد ونسخ الملفات

إذا لم تتمكن من تحميل المشروع كملف ZIP من Figma Make:

#### 1. إنشاء مشروع Vite جديد

```bash
# إنشاء مشروع
npm create vite@latest snes-emu-ai -- --template react-ts

# الدخول للمشروع
cd snes-emu-ai

# تثبيت الحزم الأساسية
npm install
```

#### 2. تثبيت جميع التبعيات المطلوبة

```bash
# React Router
npm install react-router

# مكتبة الأيقونات
npm install lucide-react

# مكتبات الحركة والتأثيرات
npm install motion canvas-confetti

# مكتبات الرسوم البيانية والواجهات
npm install recharts react-slick react-responsive-masonry
npm install react-dnd react-dnd-html5-backend

# مكتبات UI من Radix
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog
npm install @radix-ui/react-avatar @radix-ui/react-checkbox
npm install @radix-ui/react-collapsible @radix-ui/react-context-menu
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-hover-card @radix-ui/react-label
npm install @radix-ui/react-menubar @radix-ui/react-navigation-menu
npm install @radix-ui/react-popover @radix-ui/react-progress
npm install @radix-ui/react-radio-group @radix-ui/react-scroll-area
npm install @radix-ui/react-select @radix-ui/react-separator
npm install @radix-ui/react-slider @radix-ui/react-switch
npm install @radix-ui/react-tabs @radix-ui/react-toggle
npm install @radix-ui/react-toggle-group @radix-ui/react-tooltip
npm install @radix-ui/react-slot @radix-ui/react-aspect-ratio

# مكتبات الأدوات المساعدة
npm install sonner clsx tailwind-merge class-variance-authority
npm install cmdk date-fns embla-carousel-react
npm install input-otp react-day-picker react-hook-form@7.55.0
npm install react-popper react-resizable-panels
npm install @popperjs/core next-themes vaul tw-animate-css

# Material UI (اختياري)
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

# Tailwind CSS v4
npm install -D @tailwindcss/vite tailwindcss vite @vitejs/plugin-react
```

#### 3. نسخ هيكل المجلدات

انسخ المجلدات التالية من مشروع Figma Make إلى المشروع الجديد:

```
من Figma Make          →  إلى Cursor
─────────────────────────────────────
/src/app/              →  /src/app/
/src/styles/           →  /src/styles/
/src/imports/          →  /src/imports/ (إذا كانت موجودة)
/public/               →  /public/ (إذا كانت موجودة)
vite.config.ts         →  vite.config.ts
package.json           →  package.json (دمج التبعيات)
```

#### 4. إنشاء ملف main.tsx

أنشئ الملف `/src/main.tsx`:

```tsx
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

#### 5. تحديث index.html

تأكد من أن `/index.html` يحتوي على:

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SNES Emu AI - Premium Emulator</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## ✅ التحقق من التثبيت

بعد تثبيت جميع الحزم ونسخ الملفات:

```bash
# تشغيل المشروع
npm run dev
```

افتح المتصفح على `http://localhost:5173`

يجب أن ترى:
- ✅ خلفية داكنة كونية مع نجوم متحركة
- ✅ شريط جانبي أيسر مع شعار SNES Emu AI
- ✅ الصفحة الرئيسية مع "Welcome back"
- ✅ قسم Recently Played مع صور الألعاب
- ✅ شريط جانبي أيمن مع Save States و Cheats

---

## 🔧 حل المشاكل الشائعة

### المشكلة: الصور لا تظهر

**الحل:** تأكد من أن ملف `ImageWithFallback.tsx` موجود في `/src/app/components/figma/`

### المشكلة: أخطاء في التوجيه (routing)

**الحل:** تأكد من تثبيت `react-router` وليس `react-router-dom`:

```bash
npm uninstall react-router-dom
npm install react-router
```

### المشكلة: الخطوط لا تعمل

**الحل:** تأكد من وجود `/src/styles/fonts.css` وأنه مستورد في `/src/styles/index.css`

### المشكلة: Tailwind لا يعمل

**الحل:** تأكد من أن `vite.config.ts` يحتوي على:

```typescript
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

### المشكلة: أخطاء TypeScript

**الحل:** قم بتثبيت types:

```bash
npm install -D @types/react @types/react-dom
```

---

## 📦 الحزم المثبتة

المشروع يستخدم:
- ⚛️ React 18.3
- 🚀 Vite 6.3
- 🎨 Tailwind CSS v4
- 🧭 React Router 7
- 🎭 Lucide React (للأيقونات)
- 🎬 Motion (للحركات)
- 📊 Recharts (للرسوم البيانية)
- 🎛️ Radix UI (لمكونات الواجهة)

---

## 🎨 هيكل المشروع

```
snes-emu-ai/
├── src/
│   ├── app/
│   │   ├── components/      # المكونات القابلة لإعادة الاستخدام
│   │   │   ├── figma/       # مكونات Figma
│   │   │   └── ui/          # مكونات UI
│   │   ├── pages/           # صفحات التطبيق
│   │   │   ├── Home.tsx
│   │   │   ├── Library.tsx
│   │   │   ├── Cheats.tsx
│   │   │   └── ...
│   │   ├── App.tsx
│   │   └── routes.tsx
│   ├── styles/
│   │   ├── index.css
│   │   ├── theme.css        # نظام الألوان والثيم
│   │   ├── fonts.css
│   │   └── tailwind.css
│   └── main.tsx
├── public/
├── index.html
├── vite.config.ts
└── package.json
```

---

## 🚀 البناء للإنتاج

```bash
npm run build
```

سيتم إنشاء ملفات الإنتاج في مجلد `/dist`

---

## 📞 الدعم

إذا واجهت أي مشكلة:
1. تأكد من تثبيت جميع التبعيات
2. تحقق من إصدار Node.js (يجب أن يكون 18+)
3. احذف `node_modules` و `package-lock.json` ثم أعد التثبيت:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

**تم التثبيت بنجاح! استمتع بتطبيق SNES Emu AI! 🎮✨**
