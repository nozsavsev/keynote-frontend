import { observer } from "mobx-react-lite";
import { computed, reaction } from "mobx";
import Head from "next/head";
import { Document as ReactPDFDocument, Page as ReactPDFPage } from "react-pdf";
import dynamic from "next/dynamic";
import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import QRCode from "react-qrcode-logo";
import { useScreenHub } from "@/hooks/keynote/keynoteRealtime";
import { AnimatePresence, motion } from "framer-motion";
import LoadingRing, { LoadingRingAdaptive } from "@/components/LoadingRing/LoadingRing";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const Document = dynamic(() => import("react-pdf").then((mod) => mod.Document), { ssr: false }) as typeof ReactPDFDocument;
const Page = dynamic(() => import("react-pdf").then((mod) => mod.Page), { ssr: false }) as typeof ReactPDFPage;

export default observer(() => {
  const screen = useScreenHub();
  type CurrentStateType = "room" | "loading" | "waiting-for-room" | "keynote-select" | "awaiting-presentation" | "presenting";
  const [currentState, setCurrentState] = useState<CurrentStateType>("loading");

  // Calculate current state based on screenHub properties using MobX reaction
  useEffect(() => {
    const calculateState = (): CurrentStateType => {
      // If we're joining a room, show loading
      if (screen.isJoiningRoom || screen.connectionState !== "connected" || screen.me == null) {
        return "loading";
      }

      if (screen.currentRoom == null) {
        return "waiting-for-room";
      }

      if (screen.currentRoom.keynote == null) {
        return "keynote-select";
      }

      if (screen.currentRoom.currentFrame == 0) {
        return "awaiting-presentation";
      }

      return "presenting";
    };

    // Use MobX reaction to properly track observable changes
    const dispose = reaction(
      () => ({
        isJoiningRoom: screen.isJoiningRoom,
        connectionState: screen.connectionState,
        me: screen.me,
        currentRoom: screen.currentRoom,
        keynote: screen.currentRoom?.keynote,
        currentFrame: screen.currentRoom?.currentFrame,
      }),
      (data: any) => {
        console.log("Screen reaction triggered with data:", data);
        console.log("Screen reaction - currentRoom:", screen.currentRoom);
        console.log("Screen reaction - keynote:", screen.currentRoom?.keynote);
        console.log("Screen reaction - screen:", screen.currentRoom?.screen);
        const newState = calculateState();
        setCurrentState(newState);
        console.log(`currentState: ${newState}`);
      },
      { fireImmediately: true },
    );

    return dispose;
  }, [screen]);

  return (
    <>
      <Head>
        <title>Screen</title>
      </Head>
      <div className="poppins relative flex h-screen w-screen items-center justify-center bg-black">
        <AnimatePresence mode="wait" initial={false}>
          {currentState === "loading" && <Loading />}

          {currentState === "waiting-for-room" && <WaitingForRoom key="waiting-for-room" />}

          {currentState === "keynote-select" && <Selectingkeynote key="selecting-keynote" />}

          {(currentState === "presenting" || currentState === "awaiting-presentation") && (
            <RenderPage
              pageNumber={screen.currentRoom?.currentFrame ?? 1}
              key="presenting"
              showAwaitingOverlay={currentState === "awaiting-presentation"}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          {screen.currentRoom?.showSpectatorQR && <SpectatorJoinOverlay key="spectator-join-overlay" />}
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          {(currentState !== "presenting" || screen.currentRoom?.currentFrame! > screen.currentRoom?.keynote?.totalFrames!) &&
            currentState !== "waiting-for-room" && <FloatingLogo key="floating-logo" />}
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          {(currentState !== "presenting" ||
            screen.currentRoom?.currentFrame! > screen.currentRoom?.keynote?.totalFrames! ||
            screen.currentRoom?.currentFrame === 0) &&
            screen.currentRoom?.presentor != null && <OnAirOverlay key="on-air-overlay" />}
        </AnimatePresence>
      </div>
    </>
  );
});

const SpectatorJoinOverlay = observer(() => {
  const screen = useScreenHub();
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(`${window?.location?.origin}/spectate/?room=${screen.currentRoom?.roomCode ?? ""}`);
  }, [screen.currentRoom?.roomCode]);

  return (
    <motion.div
      onClick={() => {
        navigator.clipboard.writeText(url);
      }}
      key="spectator-join-overlay"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3 }}
      className="absolute top-1 right-1 z-50 m-8 flex flex-col items-center justify-center overflow-hidden rounded-lg bg-white"
    >
      <QRCode eyeRadius={5} size={300} value={url} />
      <div className="my-4 text-4xl font-semibold text-black">
        {screen.currentRoom?.roomCode?.substring(0, 3)} - {screen.currentRoom?.roomCode?.substring(3)}
      </div>
    </motion.div>
  );
});

const AwaitingPresentation = observer(() => {
  const screen = useScreenHub();

  return (
    <motion.div
      key="on-air-overlayasd"
      initial={{ opacity: 1, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 1, y: -100 }}
      transition={{ duration: 0.3 }}
      className="absolute top-0 right-0 bottom-0 left-0 z-10 mx-auto flex w-full items-center justify-center bg-black p-8"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
        {/* Presentation Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 text-5xl leading-tight font-bold text-white md:text-6xl lg:text-7xl"
        >
          {screen.currentRoom?.keynote?.name || "Untitled Presentation"}
        </motion.h1>

        <div className="animate-slide-in mx-auto mb-6 h-0.5 w-40 rounded-full bg-gradient-to-r from-white via-gray-300 to-white"></div>

        {/* Description */}
        {screen.currentRoom?.keynote?.description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8 max-w-3xl text-xl leading-relaxed text-gray-300 md:text-2xl"
          >
            {screen.currentRoom.keynote.description}
          </motion.p>
        )}

        {/* Total Slides Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center justify-center space-x-4 text-lg text-gray-400 md:text-xl"
        >
          <div className="flex items-center space-x-2">
            <span>{screen.currentRoom?.keynote?.totalFrames || 0} slides</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

const OnAirOverlay = observer(() => {
  const screen = useScreenHub();

  return (
    <motion.div
      key="on-air-overlay"
      initial={{ opacity: 1, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 1, y: -100 }}
      transition={{ duration: 0.3 }}
      className="absolute top-0 right-0 left-0 z-50 mx-auto flex w-full items-center justify-center p-8"
    >
      <div className="flex flex-col items-end justify-center">
        <div className="text-5xl font-black text-white">{screen.currentRoom?.presentor?.name}</div>
        <div className="bg-gradient-to-r from-neutral-400 via-white to-neutral-400 bg-clip-text text-4xl font-bold text-transparent">On Air</div>
      </div>
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
      className="absolute right-0 bottom-0 left-0 z-50 mx-auto flex h-fit w-full items-center justify-center p-8"
    >
      <Image src="/banner_dark.svg" width={250} height={250} alt="Keynote Banner" className="mx-auto w-80" />
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
      className="flex flex-col items-center justify-center text-4xl font-semibold"
    >
      <span className="mb-12 text-6xl">
        <LoadingRingAdaptive />
      </span>
      Loading...
    </motion.div>
  );
});

const Selectingkeynote = observer(() => {
  return (
    <motion.div
      key="selecting-keynote"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center text-4xl font-semibold"
    >
      <span className="mb-12 text-6xl">
        <LoadingRingAdaptive />
      </span>
      Waiting for keynote...
    </motion.div>
  );
});

const WaitingForRoom = observer(() => {
  const screen = useScreenHub();
  const [roomCode, setRoomCode] = useState("");
  const [url, setUrl] = useState("");
  const [filledSlots, setFilledSlots] = useState(0);
  const inputOTPRef = useRef<any>(null);

  useEffect(() => {
    setUrl(`${window?.location?.origin}/present/?screen=${screen.me?.identifier ?? ""}`);
  }, [screen.me]);

  const autoFillRoomCode = useCallback(() => {
    const code = screen.roomCode.toString();

    const lastDelay = 0;
    const increment = 100;

    setTimeout(() => {
      setRoomCode(code.substring(0, 1));
      setTimeout(
        () => {
          setFilledSlots(1);
        },
        lastDelay + increment * 0.1,
      );
    }, lastDelay + increment);

    setTimeout(
      () => {
        setRoomCode(code.substring(0, 2));
        setTimeout(
          () => {
            setFilledSlots(2);
          },
          lastDelay + increment * 0.1,
        );
      },
      lastDelay + increment * 2,
    );

    setTimeout(
      () => {
        setRoomCode(code.substring(0, 3));
        setTimeout(
          () => {
            setFilledSlots(3);
          },
          lastDelay + increment * 0.1,
        );
      },
      lastDelay + increment * 3,
    );

    setTimeout(
      () => {
        setRoomCode(code.substring(0, 4));
        setTimeout(
          () => {
            setFilledSlots(4);
          },
          lastDelay + increment * 0.1,
        );
      },
      lastDelay + increment * 4,
    );

    setTimeout(
      () => {
        setRoomCode(code.substring(0, 5));
        setTimeout(
          () => {
            setFilledSlots(5);
          },
          lastDelay + increment * 0.1,
        );
      },
      lastDelay + increment * 5,
    );

    setTimeout(
      () => {
        setRoomCode(code.substring(0, 6));
        setTimeout(
          () => {
            setFilledSlots(6);
          },
          lastDelay + increment * 0.1,
        );
      },
      lastDelay + increment * 6,
    );

    setTimeout(
      async () => {
        await screen.JoinRoomAsScreen(code.toUpperCase());
      },
      lastDelay + increment * 8,
    );

    // const typeNextChar = () => {
    //   if (currentIndex < code.length) {
    //     const char = code[currentIndex];
    //     currentValue += char;

    //     // Update the roomCode state (character appears)
    //     setRoomCode(currentValue);

    //     // Add slight delay before glow appears
    //     setTimeout(() => {
    //       setFilledSlots(currentIndex + 1);
    //     }, 100);

    //     currentIndex++;

    //     // Continue typing after 500ms delay
    //     setTimeout(typeNextChar, 500);
    //   } else {
    //     // Auto-fill complete, trigger room join if we have 6 characters
    //     if (code.length === 6) {
    //       setTimeout(() => {
    //         screen.JoinRoomAsScreen(code.toUpperCase());
    //         setRoomCode("");
    //         setFilledSlots(0);
    //       }, 200); // Small delay before joining
    //     }
    //   }
    // };

    // // Clear existing room code and start typing
    // setRoomCode("");
    // setFilledSlots(0);
    // currentValue = "";
    // typeNextChar();
  }, [screen, screen.roomCode]);

  useEffect(() => {
    if (screen.roomCode != "" && screen.connectionState === "connected") {
      autoFillRoomCode();
    }
  }, [screen.roomCode, screen.connectionState, autoFillRoomCode]);

  return (
    <motion.div
      key="waiting-for-room"
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
        className="flex h-80 w-80 items-center justify-center overflow-hidden rounded-xl bg-white p-8"
      >
        <QRCode eyeRadius={5} size={260} value={url} />
      </motion.div>

      <motion.div
        onClick={() => {
          navigator.clipboard.writeText(url);
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6 w-80 cursor-pointer rounded-xl bg-white p-4 text-center font-semibold text-black transition-colors hover:bg-gray-100"
      >
        Scan to claim the screen
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
        <div className="text-primary mb-4">Enter Room Code</div>

        <InputOTP
          ref={inputOTPRef}
          className="text-primary"
          maxLength={6}
          value={roomCode}
          onChange={(e) => {
            setRoomCode(e.toUpperCase());
            if (e.length == 6) {
              screen.JoinRoomAsScreen(e.toUpperCase());
              setRoomCode("");
              setFilledSlots(0);
            }
          }}
        >
          <InputOTPGroup>
            <InputOTPSlot
              className={`text-primary transition-all duration-300 ${
                filledSlots > 0 ? "border-green-400 bg-green-50/20 shadow-lg shadow-green-400/50" : ""
              }`}
              index={0}
            />
            <InputOTPSlot
              className={`text-primary transition-all duration-300 ${
                filledSlots > 1 ? "border-green-400 bg-green-50/20 shadow-lg shadow-green-400/50" : ""
              }`}
              index={1}
            />
            <InputOTPSlot
              className={`text-primary transition-all duration-300 ${
                filledSlots > 2 ? "border-green-400 bg-green-50/20 shadow-lg shadow-green-400/50" : ""
              }`}
              index={2}
            />
          </InputOTPGroup>
          <div />
          <InputOTPGroup>
            <InputOTPSlot
              className={`text-primary transition-all duration-300 ${
                filledSlots > 3 ? "border-green-400 bg-green-50/20 shadow-lg shadow-green-400/50" : ""
              }`}
              index={3}
            />
            <InputOTPSlot
              className={`text-primary transition-all duration-300 ${
                filledSlots > 4 ? "border-green-400 bg-green-50/20 shadow-lg shadow-green-400/50" : ""
              }`}
              index={4}
            />
            <InputOTPSlot
              className={`text-primary transition-all duration-300 ${
                filledSlots > 5 ? "border-green-400 bg-green-50/20 shadow-lg shadow-green-400/50" : ""
              }`}
              index={5}
            />
          </InputOTPGroup>
        </InputOTP>
      </motion.div>
    </motion.div>
  );
});

const RenderPage = observer(({ pageNumber, showAwaitingOverlay = false }: { pageNumber: number; showAwaitingOverlay?: boolean }) => {
  const [isLoading, setIsLoading] = useState(true);
  const screenHub = useScreenHub();
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Dynamically import pdfjs to avoid SSR issues
    import("react-pdf")
      .then(({ pdfjs }) => {
        // Use jsDelivr CDN as a fallback - more reliable than cdnjs
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@5.3.93/build/pdf.worker.min.mjs`;
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load PDF.js:", error);
        setPdfError("Failed to load PDF viewer");
        setIsLoading(false);
      });
  }, []);

  const [pagesLoaded, setPagesLoaded] = useState<Set<number>>(new Set());
  const [pdfError, setPdfError] = useState<string | null>(null);

  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  // Calculate optimal PDF size that fits within screen bounds
  const getOptimalPdfSize = useCallback(() => {
    const screenAspectRatio = width / height;
    const pdfAspectRatio = 16 / 9; // Most presentations are 16:9

    let pdfWidth, pdfHeight;

    if (screenAspectRatio > pdfAspectRatio) {
      // Screen is wider than PDF aspect ratio - constrain by height
      pdfHeight = height;
      pdfWidth = height * pdfAspectRatio;
    } else {
      // Screen is taller than PDF aspect ratio - constrain by width
      pdfWidth = width;
      pdfHeight = width / pdfAspectRatio;
    }

    return { width: pdfWidth, height: pdfHeight };
  }, [width, height]);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setTotalPages(numPages);
    setPdfError(null);
  }, []);

  const onPageLoadSuccess = useCallback((pageNum: number) => {
    setPagesLoaded((prev) => new Set([...prev, pageNum]));
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error("PDF load error:", error);
    setPdfError("Failed to load PDF document");
  }, []);

  if (isLoading) {
    return <div className="text-lg text-white">Loading PDF viewer...</div>;
  }
  if (pdfError) {
    return (
      <div className="text-center text-lg text-red-600">
        <p>{pdfError}</p>
        <p className="mt-2 text-sm">Please check the PDF URL or try refreshing the page.</p>
      </div>
    );
  }

  return (
    <>
      <Document
        className="flex h-full w-full items-center justify-center"
        file={screenHub.currentRoom?.keynote?.keynoteUrl ?? ""}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
      >
        {totalPages > 0 &&
          Array.from({ length: totalPages }, (_, index) => {
            const pageNum = index + 1;
            const isCurrentPage = pageNum === Math.max(pageNumber, 1);
            const isLoaded = pagesLoaded.has(pageNum);

            return (
              <div
                key={pageNum}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-100 ${
                  isCurrentPage ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <Page
                  pageNumber={pageNum}
                  width={getOptimalPdfSize().width}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  onLoadSuccess={() => onPageLoadSuccess(pageNum)}
                />
                {!isLoaded && (
                  <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black">
                    <div className="text-white">Loading page {pageNum}...</div>
                  </div>
                )}
              </div>
            );
          })}

        {pageNumber > totalPages && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-center">
              {/* Main message */}
              <div className="space-y-6">
                <p className="animate-fade-in-delay text-2xl font-light text-gray-400 md:text-3xl lg:text-4xl">End of the Presentation</p>
                <div className="animate-slide-in mx-auto h-0.5 w-40 rounded-full bg-gradient-to-r from-white via-gray-300 to-white"></div>
              </div>
            </div>
          </div>
        )}
      </Document>

      {/* Awaiting Presentation Overlay */}
      {showAwaitingOverlay && <AwaitingPresentation />}
    </>
  );
});
