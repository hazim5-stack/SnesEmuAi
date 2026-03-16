import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Library } from "./pages/Library";
import { GameDetails } from "./pages/GameDetails";
import { Play } from "./pages/Play";
import { Cheats } from "./pages/Cheats";
import { SaveStates } from "./pages/SaveStates";
import { Controls } from "./pages/Controls";
import { Graphics } from "./pages/Graphics";
import { Audio } from "./pages/Audio";
import { AIAssistant } from "./pages/AIAssistant";
import { Settings } from "./pages/Settings";
import { LegacyTools } from "./pages/LegacyTools";
import { Splash } from "./pages/Splash";

export const router = createBrowserRouter([
  {
    path: "/splash",
    Component: Splash,
  },
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "library", Component: Library },
      { path: "library/:gameId", Component: GameDetails },
      { path: "play", Component: Play },
      { path: "play/:gameId", Component: Play },
      { path: "cheats", Component: Cheats },
      { path: "save-states", Component: SaveStates },
      { path: "controls", Component: Controls },
      { path: "graphics", Component: Graphics },
      { path: "audio", Component: Audio },
      { path: "ai-assistant", Component: AIAssistant },
      { path: "settings", Component: Settings },
      { path: "legacy-tools", Component: LegacyTools },
    ],
  },
]);
