import LoadingRing, { LoadingRingAdaptive } from "@/components/LoadingRing/LoadingRing";
import { usePresentorHub } from "@/hooks/keynote/keynoteRealtime";
import { observer } from "mobx-react-lite";
import Head from "next/head";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import QRCode from "react-qrcode-logo";
import { reaction } from "mobx";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { ArrowLeftIcon, ArrowRightIcon, Check, CrossIcon, Hand, Pencil, Presentation, RotateCcw, Trash, Users, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import useKeynoteUser from "@/hooks/keynote/useKeynoteUser";

const QrScanner = dynamic(() => import("@/components/QrScanner"), { ssr: false });

export default observer(() => {
  const presentor = usePresentorHub();
  type CurrentStateType = "loading" | "waiting-for-screen" | "presenting";
  const [currentState, setCurrentState] = useState<CurrentStateType>("loading");

  // Calculate current state based on presentor properties using MobX reaction
  useEffect(() => {
    const calculateState = (): CurrentStateType => {
      if (presentor.connectionState !== "connected" || presentor.me == null) {
        return "loading";
      }

      if (presentor.isCreatingRoom) {
        return "loading";
      }

      if (presentor.currentRoom != null && !presentor.hasScreen) {
        return "waiting-for-screen";
      }

      if (presentor.currentRoom != null && presentor.hasScreen) {
        return "presenting";
      }

      return "loading";
    };

    // Use MobX reaction to properly track observable changes
    const dispose = reaction(
      () => ({
        connectionState: presentor.connectionState,
        me: presentor.me,
        isCreatingRoom: presentor.isCreatingRoom,
        currentRoom: presentor.currentRoom,
        hasScreen: presentor.hasScreen,
      }),
      (data) => {
        const newState = calculateState();
        setCurrentState(newState);
      },
      { fireImmediately: true },
    );

    return dispose;
  }, [presentor]);

  return (
    <>
      <Head>
        <title>Present</title>
      </Head>
      <div className="h-[calc(100vh-63px)] w-screen items-center justify-center overflow-hidden bg-black">
        <AnimatePresence mode="wait" initial={false}>
          {currentState === "loading" && <Loading />}
          {currentState === "waiting-for-screen" && <WaitingForScreen />}
          {currentState === "presenting" && <Presenting />}
          {currentState !== "presenting" && currentState !== "waiting-for-screen" && <FloatingLogo key="floating-logo" />}
        </AnimatePresence>
      </div>
    </>
  );
});

const Presenting = observer(() => {
  const presentor = usePresentorHub();
  const currentPage = presentor.currentRoom?.currentFrame ?? 1;

  const [ShowkeynoteSelect, setShowkeynoteSelect] = useState(presentor.currentRoom?.keynote == null);

  const handlePreviousSlide = async () => {
    if (currentPage > 1) {
      await presentor.SetPage(currentPage - 1);
    }
  };

  const handleNextSlide = async () => {
    await presentor.SetPage(currentPage + 1);
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePreviousSlide();
      } else if (event.key === "ArrowRight") {
        handleNextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentPage]);

  return (
    <motion.div
      key="presenting"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative flex h-full w-full flex-col items-center justify-start pt-8"
    >
      <PresentorNameOverlay />
      <ScreenAndAudienceOverlay />
      <SelectKeynoteOverlay />
      <SlideControlverlay />
      <AudienceControlOverlay key="audience-control-overlay" />
    </motion.div>
  );
});

const FloatingLogo = observer(() => {
  return (
    <motion.div
      key="floating-logo"
      initial={{ opacity: 1, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 1, y: 100 }}
      transition={{ duration: 0.3 }}
      className="absolute right-0 bottom-0 left-0 mx-auto flex w-full items-center justify-center p-8"
    >
      <Image src="/banner_dark.svg" width={250} height={250} alt="Keynote Banner" className="mx-auto w-72" />
    </motion.div>
  );
});

const Loading = observer(() => {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-16 flex flex-col items-center justify-center text-4xl font-semibold"
    >
      <span className="mb-12 text-6xl">
        <LoadingRingAdaptive />
      </span>
      Loading...
    </motion.div>
  );
});

const WaitingForScreen = observer(() => {
  const [showClaimScreenOverlay, setShowClaimScreenOverlay] = useState(false);
  const [screenIdentifier, setScreenIdentifier] = useState("");
  const presentor = usePresentorHub();
  const router = useRouter();

  useEffect(() => {
    if (router.query.screen?.length == 19) {
      setScreenIdentifier(router.query.screen as string);
      setShowClaimScreenOverlay(true);
    }
  }, [router.query.screen]);

  return (
    <motion.div
      key="waiting-for-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-black"
    >
      <motion.span initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
        <Image src="/banner_dark.svg" width={250} height={250} alt="Keynote Banner" className="mx-auto w-80" />
      </motion.span>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex h-80 w-80 items-center justify-center rounded-xl"
      >
        <QrScanner
          onValue={(value) => {
            if (showClaimScreenOverlay == false) {
              setScreenIdentifier(value);
              setShowClaimScreenOverlay(true);
            }
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex w-80 items-center justify-center rounded-xl p-4 text-center font-semibold text-black"
      >
        <div className="h-px w-full bg-white" /> <span className="text-primary mx-4">OR</span> <div className="h-px w-full bg-white" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex w-80 flex-col items-center justify-center rounded-xl text-center font-semibold text-black"
      >
        <div className="text-primary mb-4">Room Code</div>
        <div className="text-2xl font-semibold tracking-wide text-white">
          {presentor.me?.roomCode?.substring(0, 3)} - {presentor.me?.roomCode?.substring(3)}
        </div>
      </motion.div>

      <AnimatePresence mode="wait" initial={false}>
        {showClaimScreenOverlay && (
          <ClaimScreenOverlay
            onClose={async (connect) => {
              setShowClaimScreenOverlay(false);
              if (connect) {
                await presentor.SendRoomCodeToScreen(presentor.me?.roomCode ?? "", screenIdentifier);
              }
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
});

const ClaimScreenOverlay = observer(({ onClose }: { onClose: (connect: boolean) => Promise<void> }) => {
  return (
    <motion.div
      key="claim-screen-overlay"
      initial={{ opacity: 0, y: 200, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 200, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed bottom-40 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 transform"
    >
      <div className="bg-card border-border mx-4 rounded-2xl border p-6 shadow-2xl backdrop-blur-sm">
        {/* Header with icon */}
        <div className="mb-4 flex items-center justify-center">
          <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
            <svg className="text-primary h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Title and description */}
        <div className="mb-6 text-center">
          <h3 className="text-card-foreground mb-2 text-lg font-semibold">Connect to Screen</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">Would you like to connect this device to the presentation screen?</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="border-border/50 bg-background/50 text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 flex-1"
            onClick={async () => await onClose(false)}
          >
            Cancel
          </Button>
          <Button variant="default" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1" onClick={() => onClose(true)}>
            Connect
          </Button>
        </div>
      </div>
    </motion.div>
  );
});

const PresentorNameOverlay = observer(() => {
  const presentor = usePresentorHub();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(presentor.me?.name ?? "");

  return (
    <motion.div
      key="keynote-select"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3 }}
      className="bg-background absolute top-6 z-40 mx-auto flex flex-col items-start justify-center rounded-lg px-4 py-2"
    >
      {isEditing ? (
        <div className="flex items-center justify-center">
          <button
            className="mr-2"
            onClick={() => {
              setIsEditing(false);
              setTempName(presentor.me?.name ?? "");
            }}
          >
            <RotateCcw />
          </button>
          <Input
            className="outline-none"
            value={tempName}
            onChange={(e) => {
              setTempName(e.target.value);
            }}
          />

          <button
            className="ml-2"
            onClick={() => {
              presentor.SetPresentorName(tempName);
              setIsEditing(false);
            }}
          >
            <Check />
          </button>
        </div>
      ) : (
        <>
          <div className="text-muted-foreground text-sm">Presenting as</div>
          <div className="flex items-center justify-center text-lg font-semibold text-white">
            {presentor.me?.name}

            <button
              className="ml-2"
              onClick={() => {
                setIsEditing(true);
                setTempName(presentor.me?.name ?? "");
              }}
            >
              <Pencil className="size-4" />
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
});

const ScreenAndAudienceOverlay = observer(() => {
  const presentor = usePresentorHub();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(presentor.me?.name ?? "");

  return (
    <motion.div
      key="screen-status-overlay"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.3 }}
      className="bg-background absolute bottom-6 z-40 mx-auto flex items-center justify-between rounded-lg px-2 py-2"
    >
      <Button
        variant="destructive"
        size="sm"
        className="w-32"
        onClick={() => presentor.RemoveScreen(presentor.currentRoom?.screen?.identifier ?? "")}
      >
        Remove screen
      </Button>

      <div className="mx-4 h-6 w-px bg-white" />

      <div className="text-muted-foreground text-right text-sm">{presentor.currentRoom?.spectators?.length} spectators</div>
    </motion.div>
  );
});

const SelectKeynoteOverlay = observer(() => {
  const presentor = usePresentorHub();
  const [isExpanded, setIsExpanded] = useState(presentor.currentRoom?.keynote == null);
  const { user, refresh } = useKeynoteUser();

  useEffect(() => {
    refresh();
  }, [isExpanded]);

  return (
    <>
      {
        <motion.div
          key="select-keynote-overlay-2"
          initial={{ opacity: 0, x: -320 }}
          animate={{ opacity: 1, x: isExpanded ? 0 : -320 }}
          exit={{ opacity: 0, x: -320 }}
          transition={{ duration: 0.3 }}
          className="bg-background absolute top-32 left-0 z-40 flex max-h-80 w-80 flex-col gap-3 overflow-y-auto rounded-br-lg p-4"
        >
          {user?.keynotes?.map((keynote) => (
            <div
              onClick={() => {
                presentor.SetKeynote(keynote.id ?? "");
                setIsExpanded(false);
              }}
              key={keynote.id}
              className="group border-border/50 bg-card/80 hover:border-primary/50 hover:bg-card hover:shadow-primary/10 relative cursor-pointer rounded-lg border p-4 transition-all duration-200 hover:shadow-lg"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="text-card-foreground group-hover:text-primary line-clamp-2 text-lg leading-tight font-semibold transition-colors">
                    {keynote.name}
                  </h3>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <div className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">{keynote.totalFrames} slides</div>
                </div>
              </div>

              {keynote.description && <p className="text-muted-foreground mb-3 line-clamp-3 text-sm leading-relaxed">{keynote.description}</p>}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="bg-muted/50 rounded-full p-1.5">
                    <Presentation className="text-muted-foreground h-3 w-3" />
                  </div>
                  <span className="text-muted-foreground text-xs">Keynote</span>
                </div>
                <div className="opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowRightIcon className="text-primary h-4 w-4" />
                </div>
              </div>

              {/* Hover overlay */}
              <div className="bg-primary/5 pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          )) ?? (
            <div className="text-muted-foreground flex h-40 flex-col items-center justify-center text-sm">
              No keynotes found
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  console.log("Before refresh, user:", user);
                  console.log("Before refresh, user type:", typeof user);
                  console.log("Before refresh, user keys:", user ? Object.keys(user) : "null");
                  await refresh();
                  console.log("After refresh, user:", user);
                  console.log("After refresh, user type:", typeof user);
                  console.log("After refresh, user keys:", user ? Object.keys(user) : "null");
                  setIsExpanded(true);
                }}
              >
                Refresh
              </Button>
            </div>
          )}
        </motion.div>
      }
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        key="select-keynote-overlay"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: isExpanded ? 320 : 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3 }}
        className="bg-background absolute top-32 left-0 z-40 flex w-10 items-center justify-end rounded-r-lg px-2 py-2"
      >
        <Presentation />
      </motion.button>
      <motion.button
        onClick={() => presentor.SetKeynote("0")}
        key="select-keynote-overlay-3"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: isExpanded ? 320 : -40 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3 }}
        className="bg-background absolute top-48 left-0 z-40 flex w-10 items-center justify-end rounded-r-lg px-2 py-2"
      >
        <Trash className="text-destructive" />
      </motion.button>
    </>
  );
});

const SlideControlverlay = observer(() => {
  const presentor = usePresentorHub();

  return (
    <motion.div
      key="screen-status-overlay"
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: presentor.currentRoom?.keynote != null ? 0 : 200 }}
      exit={{ opacity: 0, y: 200 }}
      transition={{ duration: 0.3 }}
      className="bg-background absolute bottom-20 z-40 mx-auto flex items-center justify-between gap-4 rounded-lg px-2 py-2"
    >
      <button
        onClick={async () => {
          await presentor.SetPage(presentor.currentRoom?.currentFrame! - 1);
        }}
      >
        <ArrowLeftIcon size={32} />
      </button>

      <div
        className={`text-lg font-semibold text-white ${presentor.currentRoom?.currentFrame! > presentor.currentRoom?.keynote?.totalFrames! ? "hidden" : ""}`}
      >
        {presentor.currentRoom?.currentFrame!} / {presentor.currentRoom?.keynote?.totalFrames}
      </div>

      <button
        className={`${presentor.currentRoom?.currentFrame! > presentor.currentRoom?.keynote?.totalFrames! ? "hidden" : ""}`}
        onClick={async () => {
          await presentor.SetPage(presentor.currentRoom?.currentFrame! + 1);
        }}
      >
        {presentor.currentRoom?.currentFrame! >= presentor.currentRoom?.keynote?.totalFrames! ? (
          <div className="text-base font-semibold text-white">Finish</div>
        ) : (
          <ArrowRightIcon size={32} />
        )}
      </button>
    </motion.div>
  );
});

const AudienceControlOverlay = observer(() => {
  const presentor = usePresentorHub();
  const [isExpanded, setIsExpanded] = useState(presentor.currentRoom?.keynote == null);
  const { user, refresh } = useKeynoteUser();

  useEffect(() => {
    refresh();
  }, [isExpanded]);

  return (
    <>
      {
        <motion.div
          key="audience-control-overlay"
          initial={{ opacity: 0, x: -320 }}
          animate={{ opacity: 1, x: isExpanded ? 0 : -320 }}
          exit={{ opacity: 0, x: -320 }}
          transition={{ duration: 0.3 }}
          className="bg-background absolute top-96 left-0 z-40 flex max-h-80 min-h-80 w-80 flex-col gap-3 overflow-y-auto rounded-br-lg p-4"
        >
          <Button variant="outline" size="sm" onClick={() => presentor.SetShowSpectatorQR(!presentor.currentRoom?.showSpectatorQR)}>
            Show QR
          </Button>

          <div>
            {presentor.currentRoom?.spectators
              ?.slice()
              .sort((a, b) => (a.isHandRaised ? -1 : 1))
              .map((spectator, index) => (
                <div
                  key={spectator.identifier}
                  className={`text-foreground rounded-lg text-sm ${spectator.isHandRaised ? "border-2 border-amber-400/50" : "border-border border"} flex items-center justify-between p-2`}
                >
                  {spectator.name ?? "Anonymous-" + index}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (presentor.currentRoom?.tempControlSpectatorId == spectator.identifier) {
                        presentor.TakeTempControl();
                      } else {
                        presentor.GiveTempControl(spectator.identifier ?? "");
                      }
                    }}
                  >
                    {presentor.currentRoom?.tempControlSpectatorId == spectator.identifier ? "Take control" : "Give control"}
                  </Button>
                </div>
              ))}
          </div>
        </motion.div>
      }
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        key="select-audience-control-overlay"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: isExpanded ? 320 : 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3 }}
        className="bg-background absolute top-96 left-0 z-40 flex w-10 items-center justify-end rounded-r-lg px-2 py-2"
      >
        <Users />
      </motion.button>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        key="select-audience-control-overlay"
        initial={{ opacity: 0 }}
        animate={{
          opacity: presentor.currentRoom?.spectators?.some((spectator) => spectator.isHandRaised) ? 1 : 0,
          y: presentor.currentRoom?.spectators?.some((spectator) => spectator.isHandRaised) ? 0 : 40,
          x: isExpanded ? 320 : 0,
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-background absolute top-112 left-0 z-40 flex w-10 items-center justify-end rounded-r-lg px-2 py-2"
      >
        <Hand className="text-amber-400" />
      </motion.button>
    </>
  );
});
