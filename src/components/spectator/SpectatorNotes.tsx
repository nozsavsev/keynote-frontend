import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone } from "lucide-react";
import { Document as ReactPDFDocument, Page as ReactPDFPage } from "react-pdf";
import { useViewportHeight } from "@/hooks/useViewportHeight";

import dynamic from "next/dynamic";

const Document = dynamic(() => import("react-pdf").then((mod) => mod.Document), { ssr: false }) as typeof ReactPDFDocument;
const Page = dynamic(() => import("react-pdf").then((mod) => mod.Page), { ssr: false }) as typeof ReactPDFPage;

interface SpectatorNotesProps {
  _keynoteUrl?: string | null;
  _mobileKeynoteUrl?: string | null;
  currentFrame: number;
  totalFrames: number;
}

const SpectatorNotes = ({ _keynoteUrl, _mobileKeynoteUrl, currentFrame, totalFrames }: SpectatorNotesProps) => {
  const vh = useViewportHeight();
  const [viewMode, setViewMode] = useState<"main" | "spectator">("spectator");
  const [totalPages, setTotalPages] = useState(0);
  const [pagesLoaded, setPagesLoaded] = useState<Set<number>>(new Set());
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);

  const [keynoteUrl, setKeynoteUrl] = useState<string | null>(_keynoteUrl!);
  const [mobileKeynoteUrl, setMobileKeynoteUrl] = useState<string | null>(_mobileKeynoteUrl!);

  const [interval, setKInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing interval
    if (interval) {
      clearInterval(interval);
      setKInterval(null);
    }

    // If either URL is undefined, start a 500ms interval
    if (_keynoteUrl == undefined || _mobileKeynoteUrl == undefined) {
      const newInterval = setInterval(() => {
        // After 500ms, set values to undefined
        setKeynoteUrl(undefined!);
        setMobileKeynoteUrl(undefined!);
        setKInterval(null);
      }, 500);
      setKInterval(newInterval);
    } else {
      // If both URLs have values, set them immediately
      setKeynoteUrl(_keynoteUrl);
      setMobileKeynoteUrl(_mobileKeynoteUrl);
    }
  }, [_keynoteUrl, _mobileKeynoteUrl]);

  useEffect(() => {
    // Dynamically import pdfjs to avoid SSR issues
    import("react-pdf")
      .then(({ pdfjs }) => {
        // Use jsDelivr CDN as a fallback - more reliable than cdnjs
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@5.3.93/build/pdf.worker.min.mjs`;
      })
      .catch((error) => {
        console.error("Failed to load PDF.js:", error);
        setPdfError("Failed to load PDF viewer");
      });
  }, []);

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
    setHeight(vh * 100); // Use the mobile viewport height
  }, [vh]);

  // Calculate optimal PDF size - prevent overflow
  const getOptimalPdfSize = useCallback(() => {
    const screenAspectRatio = width / height;

    if (viewMode === "spectator") {
      // Vertical orientation for spectator notes (9:16 aspect ratio)
      const pdfAspectRatio = 9 / 16;
      let pdfWidth, pdfHeight;

      if (screenAspectRatio > pdfAspectRatio) {
        // Screen is wider than PDF aspect ratio - constrain by height
        pdfHeight = height * 0.7; // Use 80% of height to prevent overflow
        pdfWidth = pdfHeight * pdfAspectRatio;
      } else {
        // Screen is taller than PDF aspect ratio - constrain by width
        pdfWidth = width * 0.8; // Use 60% of width to prevent overflow
        pdfHeight = pdfWidth / pdfAspectRatio;
      }

      return { width: pdfWidth, height: pdfHeight };
    } else {
      // Landscape orientation for main keynote (16:9 aspect ratio)
      const pdfAspectRatio = 16 / 9;
      let pdfWidth, pdfHeight;

      if (screenAspectRatio > pdfAspectRatio) {
        // Screen is wider than PDF aspect ratio - constrain by height
        pdfHeight = height * 0.9; // Use 80% of height to prevent overflow
        pdfWidth = pdfHeight * pdfAspectRatio;
      } else {
        // Screen is taller than PDF aspect ratio - constrain by width
        pdfWidth = width * 0.8; // Use 80% of width to prevent overflow
        pdfHeight = pdfWidth / pdfAspectRatio;
      }

      return { width: pdfWidth, height: pdfHeight };
    }
  }, [width, height, viewMode]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
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

  return (
    <div className="relative h-full w-full bg-black">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="absolute top-16 left-4 z-10 -translate-y-1/2">
        <div className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-black/80 p-1 backdrop-blur-sm">
          <Button
            variant={viewMode === "main" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("main")}
            className={`flex items-center gap-2 ${viewMode !== "main" ? "text-white" : "text-black"} hover:bg-neutral-800`}
          >
            <Monitor className="h-4 w-4" />
            Main
          </Button>
          <Button
            variant={viewMode === "spectator" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("spectator")}
            className={`flex items-center gap-2 ${viewMode !== "spectator" ? "text-white" : "text-black"} hover:bg-neutral-800`}
          >
            <Smartphone className="h-4 w-4" />
            Notes
          </Button>
        </div>
      </motion.div>

      {/* Frame Counter */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 right-4 z-10 rounded-lg border border-gray-800 bg-black/80 px-3 py-1 text-sm text-white backdrop-blur-sm"
      >
        {currentFrame} / {totalFrames}
      </motion.div>

      <div className="h-full w-full">
        {keynoteUrl && (
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${viewMode === "main" ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <Document
              className="flex h-full w-full items-center justify-center"
              file={keynoteUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
            >
              {totalPages > 0 &&
                Array.from({ length: totalPages }, (_, index) => {
                  const pageNum = index + 1;
                  const isCurrentPage = pageNum === Math.max(currentFrame, 1);
                  const isLoaded = pagesLoaded.has(pageNum);

                  return (
                    <div
                      key={`main-${pageNum}`}
                      className={`absolute inset-0 flex transition-opacity duration-100 ${
                        isCurrentPage ? "opacity-100" : "pointer-events-none opacity-0"
                      } items-center justify-center`}
                    >
                      <Page
                        pageNumber={pageNum}
                        width={getOptimalPdfSize().width}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        onLoadSuccess={() => onPageLoadSuccess(pageNum)}
                      />
                      {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <div className="text-white">Loading page {pageNum}...</div>
                        </div>
                      )}
                    </div>
                  );
                })}

              {currentFrame === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="text-center">
                    <div className="space-y-6">
                      <p className="text-2xl font-light text-gray-300 md:text-3xl lg:text-4xl">Awaiting Presentation</p>
                      <div className="mx-auto h-0.5 w-40 rounded-full bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400"></div>
                    </div>
                  </div>
                </div>
              )}

              {currentFrame > totalPages && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="text-center">
                    <div className="space-y-6">
                      <p className="text-2xl font-light text-gray-300 md:text-3xl lg:text-4xl">End of the Presentation</p>
                      <div className="mx-auto h-0.5 w-40 rounded-full bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400"></div>
                    </div>
                  </div>
                </div>
              )}
            </Document>
          </div>
        )}

        {mobileKeynoteUrl && (
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              viewMode === "spectator" ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Document
              className="flex h-full w-full items-center justify-center"
              file={mobileKeynoteUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
            >
              {totalPages > 0 &&
                Array.from({ length: totalPages }, (_, index) => {
                  const pageNum = index + 1;
                  const isCurrentPage = pageNum === Math.max(currentFrame, 1);
                  const isLoaded = pagesLoaded.has(pageNum);

                  return (
                    <div
                      key={`spectator-${pageNum}`}
                      className={`absolute inset-0 flex transition-opacity duration-100 ${
                        isCurrentPage ? "opacity-100" : "pointer-events-none opacity-0"
                      } items-center justify-center`}
                    >
                      <Page
                        pageNumber={pageNum}
                        width={getOptimalPdfSize().width}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        onLoadSuccess={() => onPageLoadSuccess(pageNum)}
                      />
                      {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <div className="text-white">Loading page {pageNum}...</div>
                        </div>
                      )}
                    </div>
                  );
                })}

              {currentFrame === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="text-center">
                    <div className="space-y-6">
                      <p className="text-2xl font-light text-gray-300 md:text-3xl lg:text-4xl">Awaiting Presentation</p>
                      <div className="mx-auto h-0.5 w-40 rounded-full bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400"></div>
                    </div>
                  </div>
                </div>
              )}

              {currentFrame > totalPages && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="text-center">
                    <div className="space-y-6">
                      <p className="text-2xl font-light text-gray-300 md:text-3xl lg:text-4xl">End of the Presentation</p>
                      <div className="mx-auto h-0.5 w-40 rounded-full bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400"></div>
                    </div>
                  </div>
                </div>
              )}
            </Document>
          </div>
        )}

        {!keynoteUrl && !mobileKeynoteUrl && (
          <div className="flex h-full w-full items-center justify-center text-white">
            <p>No keynote available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpectatorNotes;
