import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Document as ReactPDFDocument, Page as ReactPDFPage } from "react-pdf";
import { useViewportHeight } from "@/hooks/useViewportHeight";

import dynamic from "next/dynamic";

const Document = dynamic(() => import("react-pdf").then((mod) => mod.Document), { ssr: false }) as typeof ReactPDFDocument;
const Page = dynamic(() => import("react-pdf").then((mod) => mod.Page), { ssr: false }) as typeof ReactPDFPage;

interface PresenterNotesProps {
  _presenterNotesUrl?: string | null;
  currentFrame: number;
  totalFrames: number;
}

const PresenterNotes = ({ _presenterNotesUrl, currentFrame, totalFrames }: PresenterNotesProps) => {
  const vh = useViewportHeight();
  const [controlsHidden, setControlsHidden] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pagesLoaded, setPagesLoaded] = useState<Set<number>>(new Set());
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);

  const [presenterNotesUrl, setPresenterNotesUrl] = useState<string | null>(_presenterNotesUrl!);
  const [interval, setKInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing interval
    if (interval) {
      clearInterval(interval);
      setKInterval(null);
    }

    // If URL is undefined, start a 500ms interval
    if (_presenterNotesUrl == undefined) {
      const newInterval = setInterval(() => {
        // After 500ms, set value to undefined
        setPresenterNotesUrl(undefined!);
        setKInterval(null);
      }, 500);
      setKInterval(newInterval);
    } else {
      // If URL has value, set it immediately
      setPresenterNotesUrl(_presenterNotesUrl);
    }
  }, [_presenterNotesUrl]);

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

  // Calculate optimal PDF size for presenter notes
  const getOptimalPdfSize = useCallback(() => {
    const screenAspectRatio = width / height;

    // Presenter notes are typically in portrait orientation (9:16 aspect ratio)
    const pdfAspectRatio = 9 / 16;
    let pdfWidth, pdfHeight;

    if (screenAspectRatio > pdfAspectRatio) {
      // Screen is wider than PDF aspect ratio - constrain by height
      pdfHeight = height * 0.8; // Use 80% of height
      pdfWidth = pdfHeight * pdfAspectRatio;
    } else {
      // Screen is taller than PDF aspect ratio - constrain by width
      pdfWidth = width * 0.6; // Use 60% of width
      pdfHeight = pdfWidth / pdfAspectRatio;
    }

    return { width: pdfWidth, height: pdfHeight };
  }, [width, height]);

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
      {/* Hide Controls Button */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-background/50 absolute right-8 bottom-7 z-50 flex items-center justify-center rounded-lg p-2 backdrop-blur-lg"
      >
        <button onClick={() => setControlsHidden(!controlsHidden)}>
          {controlsHidden ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
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
        {presenterNotesUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Document
              className="flex h-full w-full items-center justify-center"
              file={presenterNotesUrl}
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
                      key={`presenter-${pageNum}`}
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

        {!presenterNotesUrl && (
          <div className="flex h-full w-full items-center justify-center text-white">
            <p>No presenter notes available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PresenterNotes;
