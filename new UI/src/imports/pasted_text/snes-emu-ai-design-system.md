Design a complete new desktop frontend UI for my emulator application called “SNES Emu Ai”.

IMPORTANT:
This is not just a concept screen.
I need a full frontend design system and full application UI coverage so nothing is forgotten.
Do not design only one beautiful page.
Design the entire product structure, all main screens, all important states, and all reusable components.
The goal is to prevent confusion during implementation and ensure full frontend coverage.

==================================================
PRODUCT OVERVIEW
==================================================

Product name:
SNES Emu Ai

Product type:
A premium desktop emulator frontend for SNES with AI-assisted cheat discovery, cheat management, save states, ROM library, settings, and legacy tools.

Target platform:
Windows 11 desktop

Design goal:
Create a luxurious, modern, polished Windows 11-style interface with a retro-futuristic SNES identity.
The app should feel premium, serious, elegant, and highly usable.
It must combine:
- Windows 11 modern desktop aesthetics
- retro gaming identity
- subtle pixel-inspired details
- AI-enhanced utility panels
- professional launcher/emulator workflow

Do NOT make it look childish, noisy, or arcade-cheap.
Do NOT make it look like a random gaming website.
It should feel like a premium desktop software product.

==================================================
CORE VISUAL STYLE
==================================================

Style direction:
- Dark premium interface
- Deep indigo / midnight purple / cosmic blue base
- Soft glassmorphism where appropriate
- Subtle glow accents
- Clean Windows 11 inspired spacing
- Rounded corners
- Elegant shadows
- Premium typography
- Minimal but stylish retro pixel references
- Slight sci-fi / AI vibe
- Controlled neon accents, not too much
- High readability
- Strong hierarchy

Suggested color direction:
- Background: deep navy / dark indigo / near-black purple
- Cards: layered blue-purple glass panels
- Accent 1: electric blue
- Accent 2: soft violet
- Accent 3: warm retro gold/orange only in tiny highlights
- Success: cool green
- Warning: amber
- Error: soft red
- Text primary: near-white
- Text secondary: muted lavender-gray
- Dividers: low-contrast blue-gray

Design must feel:
- premium
- futuristic
- retro-aware
- Windows-native
- focused
- polished

==================================================
TYPOGRAPHY
==================================================

Use a modern Windows-friendly type system.
Headings should feel premium and confident.
Body text should be clean and highly readable.

Suggested hierarchy:
- App title / main screen title
- Section title
- Card title
- Body
- Secondary body
- Small metadata
- Tiny helper labels

Optional:
Use a subtle pixel-inspired display treatment only for branding moments, not for all body text.

==================================================
BRANDING
==================================================

Use the “SNES Emu Ai” brand in a refined way.
Do not make the entire interface overly logo-heavy.
The logo should appear in:
- sidebar header
- splash/loading screen
- maybe settings/about page
- optional top-left identity area

Brand feel:
- retro meets AI
- modern polished software
- elegant not cheesy

==================================================
GLOBAL LAYOUT
==================================================

Design the application as a full desktop app with:
- left sidebar navigation
- large content area
- optional right utility panel on some screens
- optional top bar for search / quick actions / status
- card-based content sections
- clean spacing and alignment

App shell structure:
1. App window frame
2. Top utility bar
3. Left navigation sidebar
4. Main content canvas
5. Optional right context panel
6. Bottom status/mini-control area where useful

==================================================
MAIN NAVIGATION
==================================================

Create a complete sidebar with these primary sections:

- Home
- Library
- Play
- Cheats
- Save States
- Controls
- Graphics
- Audio
- AI Assistant
- Settings
- Legacy Tools

At bottom of sidebar include:
- user/app settings shortcut
- help/about
- maybe theme toggle or status icon

Each nav item should have:
- icon
- label
- active state
- hover state
- optional badge state

==================================================
DO NOT MISS ANY FRONTEND COVERAGE
==================================================

This is very important.

I need complete frontend coverage for the application.
Do not stop at one hero screen.
Design all key flows, pages, panels, states, dialogs, drawers, tables, forms, empty states, and notifications.

I need enough UI coverage so a developer can implement the full frontend without guessing.

==================================================
REQUIRED SCREENS
==================================================

Design all of the following screens in a coherent system:

1. Splash / Launch Screen
2. Home Dashboard
3. Library Grid View
4. Library List View
5. Game Details Page
6. Play / In-Game Overlay Launcher Screen
7. Cheats Main Page
8. AI Cheat Finder Panel
9. Save States Page
10. Controls Mapping Page
11. Graphics Settings Page
12. Audio Settings Page
13. AI Assistant Main Page
14. Settings Main Page
15. Legacy Tools Page
16. Search Results Page
17. Empty State screens
18. Error State screens
19. Loading State screens
20. First-run onboarding / setup screen

==================================================
SCREEN DETAILS
==================================================

1) SPLASH / LAUNCH SCREEN
Design:
- app logo
- subtle animated or layered background
- loading status text
- optional ROM indexing progress
- premium minimal intro feel

2) HOME DASHBOARD
Purpose:
Main overview after opening the app

Must include:
- welcome header
- recent games
- continue playing card
- quick actions
- recent save states
- active cheats summary
- AI assistant summary card
- system status / emulator status
- maybe “latest indexed cheats” or “top games”
- maybe “resume last session”

This should feel like the command center of the app.

3) LIBRARY GRID VIEW
Must include:
- game cover cards
- search bar
- filters
- sorting
- favorites
- region badges
- metadata placeholders
- scan folders button
- refresh library
- empty state if no ROMs

Card design should feel premium and collectible.

4) LIBRARY LIST VIEW
Must include columns like:
- game title
- region
- last played
- playtime placeholder
- favorite
- cheat availability
- save states count
- file type / source
- actions menu

5) GAME DETAILS PAGE
For selected game:
- title
- cover art
- platform
- region/version
- ROM metadata
- play button
- continue button
- recent saves
- recent cheats
- AI help area
- notes placeholder
- hash info placeholder
- source/indexing info placeholder

This page should feel premium and informative.

6) PLAY / IN-GAME LAUNCHER SCREEN
Design the frontend state when the user is about to launch a game:
- selected game hero card
- play / resume / reset
- enable cheats before launch
- preferred video preset
- preferred controller profile
- save slot preview
- last session summary

Optional:
design a small in-game overlay concept for:
- quick save
- quick load
- cheat toggle
- AI assist
- screenshot
- exit

7) CHEATS MAIN PAGE
This is one of the most important pages.

Must include:
- selected platform preset
- game search field
- cheat search field
- cheat list results
- code type badges
- trust/rating indicators
- source count
- enable/disable toggle
- bulk enable / bulk disable
- add custom cheat
- edit cheat
- delete cheat
- filter by:
  - active
  - trusted
  - game genie
  - action replay
  - hidden/advanced
- result grouping
- sort order

This page should feel powerful but clean.

8) AI CHEAT FINDER PANEL
Very important.
Design this as a dedicated smart search area inside Cheats or as a sub-page.

Must include:
- platform preset selector
- game name input
- cheat names input as tags/chips
- search button
- AI explanation text
- returned keyword suggestions
- aliases panel
- copy results
- send to internal search
- confidence labels
- maybe “search memory first” note

The user should feel like the AI is helping them discover cheats safely and intelligently.

9) SAVE STATES PAGE
Must include:
- slot cards or list
- preview image placeholders
- timestamp
- game title
- quick save / load
- delete
- rename/note
- sort by recent
- filter by game
- pinned states

10) CONTROLS MAPPING PAGE
Must include:
- player tabs
- connected device display
- keyboard mapping
- controller mapping
- hotkeys section
- input testing area
- reset to default
- import/export profile
- conflict warning states

11) GRAPHICS SETTINGS PAGE
Must include:
- display mode
- fullscreen/windowed
- scaling
- aspect ratio
- filters/shaders
- frame sync
- rendering options placeholders
- preview area
- advanced section
- restore defaults

12) AUDIO SETTINGS PAGE
Must include:
- master volume
- music/effects where relevant
- latency/buffering
- sync options
- output options
- advanced settings area
- restore defaults

13) AI ASSISTANT MAIN PAGE
Must feel like a product feature, not a gimmick.

Include:
- assistant conversation panel
- contextual game help
- suggested actions
- cheat help
- settings help
- troubleshooting cards
- recent AI actions
- empty state when no game selected

14) SETTINGS MAIN PAGE
Organize into categories:
- General
- Appearance
- Library
- Emulator
- AI
- Paths
- Privacy
- Updates
- Advanced

Settings must be easy to scan and not cluttered.

15) LEGACY TOOLS PAGE
Very important.

This page should clearly communicate:
- original advanced features still exist
- anything not yet redesigned in the new frontend can still be accessed here
- this page acts as a compatibility bridge

Include:
- grouped legacy tools
- old dialogs launcher cards
- advanced utilities
- debug/compatibility panels
- explanation text

16) SEARCH RESULTS PAGE
Design a reusable search result layout for:
- games
- cheats
- saves
- settings
- AI results

17) EMPTY STATES
Design proper empty states for:
- no ROMs found
- no cheats found
- no save states
- no recent games
- no AI results
- no controller connected

18) ERROR STATES
Design polished error cards/states for:
- failed ROM scan
- cheat search failed
- AI request failed
- source unavailable
- unsupported file
- missing configuration

19) LOADING STATES
Create skeleton/loading versions for:
- dashboard cards
- library cards
- cheat results
- save state list
- AI assistant panel

20) FIRST-RUN ONBOARDING
Must include:
- welcome
- choose ROM folders
- choose theme
- choose default controls
- enable AI features
- finish setup

==================================================
REQUIRED REUSABLE COMPONENTS
==================================================

Create a full component system.
Do not leave components undefined.

I need reusable components for:
- sidebar item
- section header
- top search bar
- tab switcher
- dropdown
- button styles
- icon button
- segmented control
- card
- game card
- cheat row
- save state card
- settings row
- toggle switch
- slider
- progress bar
- input field
- tag/chip input
- badge
- tooltip
- modal dialog
- confirmation dialog
- toast notification
- context menu
- table row
- accordion
- empty state panel
- error alert
- loading skeleton
- right-side utility panel
- AI message bubble
- trust/rating indicator

==================================================
STATE DESIGN
==================================================

For every important UI element, design states for:
- default
- hover
- pressed
- focused
- active
- disabled
- selected
- error
- success
- loading

Do not leave state behavior undefined.

==================================================
IMPORTANT PRODUCT LOGIC TO REFLECT IN DESIGN
==================================================

Reflect these product ideas in the UI:

1. This is an emulator frontend, not just a cheat app
2. Cheats are important, but not the only feature
3. AI helps search and explain, but should feel safe and assistive
4. Some advanced functions may still exist in legacy access
5. The product should feel ready for future API/database integrations
6. Game-centric workflow is important
7. The app should support heavy users, not just casual users

==================================================
WINDOWS 11 DESKTOP FEEL
==================================================

The UI should feel native to Windows 11:
- elegant spacing
- rounded controls
- glass-like layered surfaces
- balanced density
- premium desktop software feel
- not mobile-first
- not web-dashboard-only
- use desktop productivity logic

==================================================
FIGMA OUTPUT REQUIREMENTS
==================================================

Create the design as a structured Figma system with:

1. Cover / overview page
2. Design foundations page
3. Color styles
4. Text styles
5. Spacing system
6. Icon style references
7. Component library
8. Main screens
9. Alternate states
10. Dialogs / overlays / menus
11. Notes for developer handoff

Organize pages clearly so developers are not confused.

==================================================
DEVELOPER HANDOFF REQUIREMENTS
==================================================

Each screen should be easy to implement.
Please make the design system consistent and reusable.
Avoid random one-off designs.
Use auto layout principles.
Make spacing and structure clear.
Keep naming organized.

For handoff clarity, include notes such as:
- what is reusable
- what is modal
- what expands/collapses
- which panel is sticky
- what scrolls
- what is primary action vs secondary action

==================================================
MOOD / DESIGN REFERENCES
==================================================

The overall feeling should combine:
- premium Windows 11 desktop software
- retro gaming nostalgia
- elegant sci-fi AI utility
- collectible SNES atmosphere
- dark luxurious gaming productivity interface

The result should feel like:
“A premium AI-powered SNES emulator frontend for serious retro users.”

==================================================
FINAL INSTRUCTION
==================================================

Do not generate just one nice mockup.
Design the full frontend system for the application.
Make sure all major frontend surfaces are covered so implementation can happen without guessing.
The design must be coherent, luxurious, premium, modern, retro-aware, and implementation-ready.