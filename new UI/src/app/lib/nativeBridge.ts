type BridgeMethod =
  | "OpenGeneralSettings"
  | "OpenEmulatorSettings"
  | "OpenGraphicsSettings"
  | "OpenControlsSettings"
  | "OpenAudioSettings"
  | "OpenInterfaceSettings"
  | "ApplyGraphicsSettingsFromNewUI"
  | "ApplyControlsSettingsFromNewUI"
  | "ApplyAudioSettingsFromNewUI"
  | "QuickSave"
  | "QuickLoad"
  | "ToggleFullscreen"
  | "CaptureScreenshot"
  | "ToggleCheats"
  | "OpenAIAssistantRemoved"
  | "EditScreenshotRemoved";

type HostBridge = Partial<Record<BridgeMethod, (...args: unknown[]) => unknown>>;

declare global {
  interface Window {
    snesEmuAiBridge?: HostBridge;
    chrome?: {
      webview?: {
        postMessage?: (payload: unknown) => void;
      };
    };
  }
}

export function invokeBridge(method: BridgeMethod, ...args: unknown[]): boolean {
  const direct = window.snesEmuAiBridge;
  if (direct && typeof direct[method] === "function") {
    direct[method]!(...args);
    return true;
  }

  const postMessage = window.chrome?.webview?.postMessage;
  if (typeof postMessage === "function") {
    postMessage({
      channel: "snes-emu-ai-bridge",
      method,
      args,
    });
    return true;
  }

  console.warn(`[SNES Emu Ai Bridge] Bridge method unavailable: ${method}`);
  return false;
}
