# 📥 How to Install SNES Emu AI in Cursor

## Method 1: Download from Figma Make (Recommended)

### Step 1: Export from Figma Make
1. Open your project "تصميم واجهة المستخدم" in Figma Make
2. Look for the **Download** or **Export** button (usually top-right corner or in the menu ⋮)
3. Select **"Download as ZIP"** or **"Export Code"**
4. Save the file to your computer

**Note:** If you get a `.make` file instead of `.zip`, try renaming it:
```bash
mv "تصميم-واجهة-المستخدم.make" "تصميم-واجهة-المستخدم.zip"
unzip "تصميم-واجهة-المستخدم.zip"
```

### Step 2: Open in Cursor
```bash
# Navigate to the extracted folder
cd snes-emu-ai

# Open in Cursor
cursor .
```

### Step 3: Install Dependencies
In Cursor's terminal:
```bash
npm install
```

### Step 4: Run the Project
```bash
npm run dev
```

Open your browser at: **http://localhost:5173**

---

## Method 2: Manual Setup (If Download Fails)

### Step 1: Create New Vite Project
```bash
npm create vite@latest snes-emu-ai -- --template react-ts
cd snes-emu-ai
```

### Step 2: Install All Dependencies
```bash
# Core
npm install react-router lucide-react

# Animations & Effects
npm install motion canvas-confetti

# UI Libraries
npm install recharts react-slick react-responsive-masonry
npm install react-dnd react-dnd-html5-backend

# Radix UI Components
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

# Utilities
npm install sonner clsx tailwind-merge class-variance-authority
npm install cmdk date-fns embla-carousel-react
npm install input-otp react-day-picker react-hook-form@7.55.0
npm install react-popper react-resizable-panels
npm install @popperjs/core next-themes vaul tw-animate-css

# Tailwind CSS v4
npm install -D @tailwindcss/vite tailwindcss vite @vitejs/plugin-react
```

### Step 3: Copy Files from Figma Make

Copy these folders from your Figma Make project to the new project:

```
From Figma Make          →  To Cursor
─────────────────────────────────────
/src/app/                →  /src/app/
/src/styles/             →  /src/styles/
/src/imports/            →  /src/imports/ (if exists)
/public/                 →  /public/ (if exists)
vite.config.ts           →  vite.config.ts
```

### Step 4: Create Entry Files

**Create `/src/main.tsx`:**
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

**Update `/index.html`:**
```html
<!DOCTYPE html>
<html lang="en">
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

### Step 5: Run the Project
```bash
npm run dev
```

---

## ✅ What You Should See

When the project runs successfully, you should see:

### 🏠 Home Page Features
- ⭐ **Dark cosmic background** with animated stars
- 🎮 **Left sidebar** with SNES Emu AI logo
- 📝 **"Welcome back"** header
- 🕹️ **Recently Played** - 4 classic games (Mario, Chrono Trigger, Metroid, Final Fantasy)
- 🎬 **Continue Playing** - Large card with progress bar
- ⚡ **Quick Actions** - Buttons (Load State, Save State, Reset, Enable Cheats, Disable All)
- 📌 **Right sidebar** with:
  - Welcome card with current game image
  - Recent Save States
  - Cheats for this Game
  - 🤖 AI Assistant at the bottom

---

## 🎨 Design Features

- **Premium dark cosmic theme** (indigo/purple/blue)
- **Windows 11-inspired UI** with rounded corners
- **Glassmorphism effects** with subtle transparency
- **Animated starfield background** ⭐
- **Smooth transitions** and hover effects
- **Professional, non-childish design**

---

## 🔧 Troubleshooting

### Project Won't Start?
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Images Not Showing?
Make sure `/src/app/components/figma/ImageWithFallback.tsx` exists

### Routing Errors?
```bash
npm uninstall react-router-dom
npm install react-router
```

### Tailwind Not Working?
Check that `vite.config.ts` includes:
```typescript
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

---

## 📂 Project Structure

```
snes-emu-ai/
├── src/
│   ├── app/
│   │   ├── components/      # Reusable components
│   │   │   ├── figma/       # Figma components
│   │   │   └── ui/          # UI components
│   │   ├── pages/           # App pages
│   │   │   ├── Home.tsx     # Main dashboard
│   │   │   ├── Library.tsx  # Game library
│   │   │   ├── Cheats.tsx   # Cheats management
│   │   │   └── ...
│   │   ├── App.tsx
│   │   └── routes.tsx
│   ├── styles/
│   │   ├── index.css
│   │   ├── theme.css        # Color system
│   │   ├── fonts.css
│   │   └── tailwind.css
│   └── main.tsx
├── package.json
└── vite.config.ts
```

---

## 🚀 Build for Production

```bash
npm run build
```

Output will be in `/dist` folder.

---

## 📖 Documentation

- [README.md](./README.md) - Full project overview (Arabic)
- [INSTALLATION.md](./INSTALLATION.md) - Detailed installation guide (Arabic)
- [QUICKSTART-AR.md](./QUICKSTART-AR.md) - Quick start guide (Arabic)

---

**✨ Enjoy your SNES Emu AI project! 🎮**
