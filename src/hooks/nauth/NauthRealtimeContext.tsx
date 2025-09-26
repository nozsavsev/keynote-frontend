import { NauthRealtime } from "@/API/NAUTH/NauthRealtime";
import { createContext, useContext } from "react";

const NauthRealtimeContext = createContext<NauthRealtime | null>(null);

const realtime = new NauthRealtime();

export const NauthRealtimeProvider = ({ children }: { children: React.ReactNode }) => {
  return <NauthRealtimeContext.Provider value={realtime}>{children}</NauthRealtimeContext.Provider>;
};

export const useNauthRealtime = () => {
  const context = useContext(NauthRealtimeContext);
  if (!context) {
    throw new Error("useNauthRealtime must be used within a NauthRealtimeProvider");
  }
  return context;
};
