import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

type PdfViewport = {
  width: number;
  height: number;
};

type PdfPage = {
  getViewport: (options: { scale: number }) => PdfViewport;
  render: (options: {
    canvasContext: CanvasRenderingContext2D;
    viewport: PdfViewport;
  }) => { promise: Promise<void> };
};

type PdfDocument = {
  getPage: (pageNumber: number) => Promise<PdfPage>;
  destroy?: () => Promise<void>;
};

type PdfThumbnailProps = {
  src: string;
  title: string;
};

const PdfThumbnail = ({ src, title }: PdfThumbnailProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;
    let loadedPdf: PdfDocument | null = null;

    const renderThumbnail = async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
        const task = pdfjs.getDocument({ url: src });
        loadedPdf = (await task.promise) as unknown as PdfDocument;
        const page = await loadedPdf.getPage(1);
        const container = containerRef.current;
        const canvas = canvasRef.current;

        if (cancelled || !container || !canvas) return;

        const rect = container.getBoundingClientRect();
        const baseViewport = page.getViewport({ scale: 1 });
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const scale = (Math.max(rect.width, 1) * dpr) / baseViewport.width;
        const viewport = page.getViewport({ scale });
        const context = canvas.getContext("2d");

        if (!context) return;

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.style.width = "100%";
        canvas.style.height = "100%";

        await page.render({ canvasContext: context, viewport }).promise;

        if (!cancelled) {
          setStatus("ready");
        }
      } catch {
        if (!cancelled) {
          setStatus("error");
        }
      }
    };

    void renderThumbnail();

    return () => {
      cancelled = true;
      void loadedPdf?.destroy?.();
    };
  }, [src]);

  return (
    <Box ref={containerRef} position="absolute" inset={0} bg="#071827">
      <canvas
        ref={canvasRef}
        aria-label={`${title} PDF preview`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: status === "ready" ? 1 : 0,
          transition: "opacity 260ms ease",
        }}
      />
      {status === "loading" && (
        <Center position="absolute" inset={0} color="whiteAlpha.800">
          <Spinner />
        </Center>
      )}
      {status === "error" && (
        <Center position="absolute" inset={0} color="white" px={6}>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            {title}
          </Text>
        </Center>
      )}
    </Box>
  );
};

export default PdfThumbnail;
