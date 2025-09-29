// components/layout.js

import { useRouter } from "next/router";
import Footer from "./footer";
import Navbar from "./navbar";
import { usePresentorHub, useScreenHub, useSpectatorHub } from "@/hooks/keynote/keynoteRealtime";
import { observer } from "mobx-react-lite";

const Layout = observer(({ children }: any) => {
  const router = useRouter();

  const noNav = () => {
    return (
      ["/test", "/_error", "/500", "/auth", "/403", "/404", "/screen"].filter((x) => router?.pathname?.startsWith(x)).length != 0 ||
      router?.pathname?.endsWith("_preview")
    );
  };

  const noFoot = () => {
    return ["/test"].filter((x) => router?.pathname?.startsWith(x)).length != 0 || router?.pathname?.endsWith("_preview");
  };

  const noWidth = () => {
    return ["/screen", "/present", "/spectate"].filter((x) => router?.pathname?.startsWith(x)).length != 0 || router?.pathname?.endsWith("_preview");
  };

  const PresentorHub = usePresentorHub();
  const ScreenHub = useScreenHub();
  const SpectatorHub = useSpectatorHub();

  return (
    <>
      {process.env.NODE_ENV == "development" && false && (
        <div className="bg-background/50 fixed right-10 bottom-10 z-[60] flex flex-col items-start justify-start gap-2 rounded-md p-2 backdrop-blur-sm">
          <div className="block sm:hidden">sm</div>
          <div className="hidden sm:block md:hidden">md</div>
          <div className="hidden md:block lg:hidden">lg</div>
          <div className="hidden lg:block xl:hidden">xl</div>
          <div className="hidden xl:block">2xl</div>

          <div className="flex items-center justify-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${PresentorHub.connectionState == "connected" ? "bg-green-500" : PresentorHub.connectionState == "connecting" ? "bg-yellow-500" : "bg-red-500"}`}
            />
            PresentorHub: {PresentorHub.connectionState}
          </div>
          <div className="flex items-center justify-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${ScreenHub.connectionState == "connected" ? "bg-green-500" : ScreenHub.connectionState == "connecting" ? "bg-yellow-500" : "bg-red-500"}`}
            />
            ScreenHub: {ScreenHub.connectionState}
          </div>
          <div className="flex items-center justify-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${SpectatorHub.connectionState == "connected" ? "bg-green-500" : SpectatorHub.connectionState == "connecting" ? "bg-yellow-500" : "bg-red-500"}`}
            />
            SpectatorHub: {SpectatorHub.connectionState}
          </div>
        </div>
      )}

      {router.asPath.endsWith("_preview") ? (
        <>{children}</>
      ) : (
        <div className="bg-background text-foreground flex min-h-screen flex-col">
          {!noNav() && <Navbar />}
          <div className={`m-0 w-full shrink-0 flex-grow p-0 ${noNav() ? "flex items-center justify-center" : ""}`}>
            <div
              className={`${!noNav() ? "w-full" : "w-full"} mx-auto flex flex-col`}
              style={
                noNav() && noFoot()
                  ? { minHeight: "100vh" }
                  : {
                      maxWidth:
                        noNav() || noWidth() ? 900000 : router.asPath.startsWith("/admin") && !router.asPath.endsWith("preview") ? 1600 : 1200,
                      minHeight: noNav() ? "100vh" : "calc(100vh - 64px)",
                    }
              }
            >
              {children}
            </div>
          </div>
          {!noFoot() && <Footer />}
        </div>
      )}
    </>
  );
});

export default Layout;
