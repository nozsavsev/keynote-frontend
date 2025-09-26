import { KEYNOTE_API } from "@/API/KEYNOTE/API";
import { PresentorRT_HUB, ConnectionState } from "@/API/KEYNOTE/Realtime/PresentorRT_HUB";
import { ScreenRT_HUB } from "@/API/KEYNOTE/Realtime/ScreenRT_HUB";
import { SpectatorRT_HUB } from "@/API/KEYNOTE/Realtime/SpectatorRT_HUB";
import { createContext, useContext, useEffect, useMemo } from "react";
import useNauthUser from "../nauth/useNauthUser";
import { useRouter } from "next/router";

type KeynoteRealtime = {
  spectatorRT: SpectatorRT_HUB;
  presentorRT: PresentorRT_HUB;
  screenRT: ScreenRT_HUB;
};

type ConnectionStatus = {
  spectator: ConnectionState;
  presentor: ConnectionState;
  screen: ConnectionState;
  overall: "connected" | "connecting" | "disconnected" | "partial";
};

const KeynoteRealtimeContext = createContext<KeynoteRealtime | null>(null);

const realtime = {
  spectatorRT: new SpectatorRT_HUB(),
  presentorRT: new PresentorRT_HUB(),
  screenRT: new ScreenRT_HUB(),
};

const InnerKeynoteRealtime = ({ children }: { children: React.ReactNode }) => {
  const spectatorRT = useSpectatorHub();
  const presentorRT = usePresentorHub();
  const screenRT = useScreenHub();
  const { user } = useNauthUser();

  // Connect SpectatorRT once on mount, no cleanup on navigation
  useEffect(() => {
    if (spectatorRT.connectionState === "disconnected") {
      console.log("[KeynoteRealtime] Attempting to connect SpectatorRT");
      spectatorRT.connect().catch(console.error);
    }
    // No cleanup - keep connection alive during navigation
  }, []); // Only run once on mount

  // Connect PresentorRT when user changes, no cleanup on navigation
  useEffect(() => {
    if (presentorRT.connectionState === "disconnected" && user) {
      console.log("[KeynoteRealtime] Attempting to connect PresentorRT for user:", user.id);
      presentorRT.connect().catch(console.error);
    }
    // No cleanup - keep connection alive during navigation
  }, [user?.id]); // Only run when user changes

  // Connect ScreenRT once on mount, no cleanup on navigation
  useEffect(() => {
    if (screenRT.connectionState === "disconnected") {
      console.log("[KeynoteRealtime] Attempting to connect ScreenRT");
      screenRT.connect().catch(console.error);
    }
    // No cleanup - keep connection alive during navigation
  }, []); // Only run once on mount

  return children;
};

export const KeynoteRealtimeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <KeynoteRealtimeContext.Provider value={realtime}>
      <InnerKeynoteRealtime>{children}</InnerKeynoteRealtime>
    </KeynoteRealtimeContext.Provider>
  );
};

export const useSpectatorHub = () => {
  const context = useContext(KeynoteRealtimeContext);
  if (!context) {
    throw new Error("useSpectatorHub must be used within a KeynoteRealtimeProvider");
  }
  return context.spectatorRT;
};

export const usePresentorHub = () => {
  const context = useContext(KeynoteRealtimeContext);
  if (!context) {
    throw new Error("usePresentorHub must be used within a KeynoteRealtimeProvider");
  }
  return context.presentorRT;
};

export const useScreenHub = () => {
  const context = useContext(KeynoteRealtimeContext);
  if (!context) {
    throw new Error("useScreenHub must be used within a KeynoteRealtimeProvider");
  }

  return context.screenRT;
};

// Hook to get overall connection status
export const useKeynoteConnectionStatus = (): ConnectionStatus => {
  const spectatorRT = useSpectatorHub();
  const presentorRT = usePresentorHub();
  const screenRT = useScreenHub();

  return useMemo((): ConnectionStatus => {
    const spectator = spectatorRT.connectionState;
    const presentor = presentorRT.connectionState;
    const screen = screenRT.connectionState;

    const states = [spectator, presentor, screen];
    const connectedCount = states.filter((s) => s === "connected").length;
    const connectingCount = states.filter((s) => s === "connecting").length;
    const disconnectedCount = states.filter((s) => s === "disconnected").length;

    let overall: ConnectionStatus["overall"];
    if (connectedCount === 3) {
      overall = "connected";
    } else if (connectingCount > 0) {
      overall = "connecting";
    } else if (disconnectedCount === 3) {
      overall = "disconnected";
    } else {
      overall = "partial";
    }

    return { spectator, presentor, screen, overall };
  }, [spectatorRT.connectionState, presentorRT.connectionState, screenRT.connectionState]);
};
