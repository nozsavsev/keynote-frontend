import LoadingRing, { LoadingRingAdaptive } from "@/components/LoadingRing/LoadingRing";
import { usePresentorHub, useSpectatorHub } from "@/hooks/keynote/keynoteRealtime";
import { observer } from "mobx-react-lite";
import Head from "next/head";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import QRCode from "react-qrcode-logo";
import { reaction } from "mobx";
import { faker } from "@faker-js/faker";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { ArrowLeftIcon, ArrowRightIcon, Check, CrossIcon, Hand, Pencil, Presentation, RotateCcw, Trash, Users, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import useKeynoteUser from "@/hooks/keynote/useKeynoteUser";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";

const QrScanner = dynamic(() => import("@/components/QrScanner"), { ssr: false });

export default observer(() => {
  const spectator = useSpectatorHub();
  type CurrentStateType = "loading" | "waiting-for-room" | "spectating";
  const [currentState, setCurrentState] = useState<CurrentStateType>("loading");

  // Calculate current state based on presentor properties using MobX reaction
  useEffect(() => {
    const calculateState = (): CurrentStateType => {
      if (spectator.connectionState !== "connected" || spectator.me == null || spectator.isJoiningRoom) {
        return "loading";
      }

      if (spectator.currentRoom == null) {
        return "waiting-for-room";
      }

      if (spectator.currentRoom != null) {
        return "spectating";
      }

      return "loading";
    };

    // Use MobX reaction to properly track observable changes
    const dispose = reaction(
      () => ({
        connectionState: spectator.connectionState,
        me: spectator.me,
        isJoiningRoom: spectator.isJoiningRoom,
        currentRoom: spectator.currentRoom,
        hasScreen: spectator.hasScreen,
      }),
      (data) => {
        const newState = calculateState();
        setCurrentState(newState);
      },
      { fireImmediately: true },
    );

    return dispose;
  }, [spectator]);

  return (
    <>
      <Head>
        <title>Present</title>
      </Head>
      <div className="h-[calc(100vh-63px)] w-screen items-center justify-center overflow-hidden bg-black">
        <AnimatePresence mode="wait" initial={false}>
          {currentState === "loading" && <Loading />}
          {currentState === "waiting-for-room" && <WaitingForRoom />}
          {currentState === "spectating" && <Spectating />}
          {currentState !== "spectating" && currentState !== "waiting-for-room" && <FloatingLogo key="floating-logo" />}
        </AnimatePresence>
      </div>
    </>
  );
});

const Spectating = observer(() => {
  const spectator = useSpectatorHub();

  return (
    <motion.div
      key="presenting"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative flex h-full w-full flex-col items-center justify-start pt-8"
    >
      <SpectatorNameOverlay />
      <ScreenAndAudienceOverlay />
      <SlideControlverlay />
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

const WaitingForRoom = observer(() => {
  const [showConnectRoomOverlay, setShowConnectRoomOverlay] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const spectator = useSpectatorHub();
  const router = useRouter();

  useEffect(() => {
    if (router.query.room?.length == 6) {
      setRoomCode(router.query.room as string);
      setShowConnectRoomOverlay(true);
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
            if (showConnectRoomOverlay == false) {
              setRoomCode(value);
              setShowConnectRoomOverlay(true);
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
        <InputOTP
          className="text-primary"
          maxLength={6}
          value={roomCode}
          onChange={(e) => {
            setRoomCode(e.toUpperCase());
            if (e.length == 6) {
              spectator.JoinRoom(e.toUpperCase());
              setRoomCode("");
            }
          }}
        >
          <InputOTPGroup>
            <InputOTPSlot className={`text-primary transition-all duration-300`} index={0} />
            <InputOTPSlot className={`text-primary transition-all duration-300`} index={1} />
            <InputOTPSlot className={`text-primary transition-all duration-300`} index={2} />
          </InputOTPGroup>
          <div />
          <InputOTPGroup>
            <InputOTPSlot className={`text-primary transition-all duration-300`} index={3} />
            <InputOTPSlot className={`text-primary transition-all duration-300`} index={4} />
            <InputOTPSlot className={`text-primary transition-all duration-300`} index={5} />
          </InputOTPGroup>
        </InputOTP>
      </motion.div>

      <AnimatePresence mode="wait" initial={false}>
        {showConnectRoomOverlay && (
          <ClaimScreenOverlay
            onClose={async (connect) => {
              setShowConnectRoomOverlay(false);
              if (connect) {
                await spectator.JoinRoom(roomCode);
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

const SpectatorNameOverlay = observer(() => {
  const spectator = useSpectatorHub();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(spectator.me?.name ?? "");

  useEffect(() => {
    if(spectator.me?.name?.length == 0){
      setIsEditing(true);
      const nm = faker.person.fullName();
      spectator.SetName(nm);
      setTempName(nm);
    }
  }, [spectator.me?.name]);

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
              setTempName(spectator.me?.name ?? "");
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
              spectator.SetName(tempName);
              setIsEditing(false);
            }}
          >
            <Check />
          </button>
        </div>
      ) : (
        <>
          <div className="text-muted-foreground text-sm">Spectating as</div>
          <div className="flex items-center justify-center text-lg font-semibold text-white">
            {spectator.me?.name}

            <button
              className="ml-2"
              onClick={() => {
                setIsEditing(true);
                setTempName(spectator.me?.name ?? "");
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
  const spectator = useSpectatorHub();

  return (
    <motion.div
      key="screen-status-overlay"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.3 }}
      className="bg-background absolute bottom-6 z-40 mx-auto flex items-center justify-between rounded-lg px-2 py-2"
    >
      <Button variant="destructive" size="sm" className="w-32" onClick={() => spectator.LeaveRoom()}>
        Leave
      </Button>
      <div className="mx-4 h-6 w-px bg-white" />
      <Button
        variant="default"
        size="sm"
        className={`w-32 ${spectator.me?.isHandRaised ? "bg-amber-200 hover:bg-amber-300" : "bg-white hover:bg-gray-100"}`}
        onClick={() => spectator.SetHandRaised(!spectator.me?.isHandRaised)}
      >
        {spectator.me?.isHandRaised ? "Lower Hand" : "Raise Hand"}
      </Button>{" "}
    </motion.div>
  );
});

const SlideControlverlay = observer(() => {
  const spectator = useSpectatorHub();

  return (
    <motion.div
      key="screen-status-overlay"
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: spectator.currentRoom?.keynote != null && spectator.currentRoom?.tempControlSpectatorId == spectator.me?.identifier ? 0 : 200 }}
      exit={{ opacity: 0, y: 200 }}
      transition={{ duration: 0.3 }}
      className="bg-background absolute bottom-20 z-40 mx-auto flex items-center justify-between gap-4 rounded-lg px-2 py-2"
    >
      <button
        onClick={async () => {

          const targetFrame = spectator.currentRoom?.currentFrame! - 1;


          await spectator.SetPage(Math.max(targetFrame, 1));
        }}
      >
        <ArrowLeftIcon size={32} />
      </button>

      <div
        className={`text-lg font-semibold text-white`}
      >
        {spectator.currentRoom?.currentFrame!} / {spectator.currentRoom?.keynote?.totalFrames}
      </div>

      <button
        className={`text-lg font-semibold text-white`}
        onClick={async () => {
          const targetFrame = spectator.currentRoom?.currentFrame! + 1;
          await spectator.SetPage(Math.min(targetFrame, spectator.currentRoom?.keynote?.totalFrames!));
        }}
      >
        <ArrowRightIcon size={32} />
      </button>
    </motion.div>
  );
});
