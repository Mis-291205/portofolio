import {
  Box,
  Button,
  Center,
  Grid,
  HStack,
  IconButton,
  Link,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  HiArrowDownTray,
  HiArrowTopRightOnSquare,
  HiChevronLeft,
  HiChevronRight,
  HiXMark,
} from "react-icons/hi2";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
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
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfPage>;
  destroy?: () => Promise<void>;
};

type ViewerSize = {
  w: number;
  h: number;
};

type PdfCanvasViewerProps = {
  src: string;
  title: string;
  height?: { base?: string; md?: string; lg?: string } | string;
  onClose?: () => void;
};

const PdfCanvasViewer = ({
  src,
  title,
  height = { base: "78vh", lg: "86vh" },
  onClose,
}: PdfCanvasViewerProps) => {
  const [pdf, setPdf] = useState<PdfDocument | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState<ViewerSize | null>(null);
  const [loading, setLoading] = useState(true);
  const [rendering, setRendering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const panelBg = useColorModeValue("#fffdf8", "#121614");
  const stageBg = useColorModeValue("#f2efe8", "#181c19");
  const borderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const controlBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const textColor = useColorModeValue("gray.900", "white");
  const mutedColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const accentLine = useColorModeValue("#00987a", "#57dfc2");

  useEffect(() => {
    let cancelled = false;
    let loadedPdf: PdfDocument | null = null;

    setLoading(true);
    setError(null);
    setPdf(null);
    setNumPages(0);
    setCurrentPage(1);

    const loadPdf = async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
        const task = pdfjs.getDocument({ url: src });
        loadedPdf = (await task.promise) as unknown as PdfDocument;

        if (cancelled) {
          await loadedPdf.destroy?.();
          return;
        }

        setPdf(loadedPdf);
        setNumPages(loadedPdf.numPages);
      } catch {
        if (!cancelled) {
          setError("PDF could not be loaded.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadPdf();

    return () => {
      cancelled = true;
      void loadedPdf?.destroy?.();
    };
  }, [src]);

  const updateSize = useCallback(() => {
    const element = stageRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const next = {
      w: Math.floor(rect.width),
      h: Math.floor(rect.height),
    };

    if (next.w > 0 && next.h > 0) {
      setSize((prev) =>
        prev && prev.w === next.w && prev.h === next.h ? prev : next
      );
    }
  }, []);

  useEffect(() => {
    updateSize();

    const element = stageRef.current;
    if (!element) return undefined;

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, [updateSize]);

  useEffect(() => {
    if (!pdf || !size) return undefined;

    let cancelled = false;
    setRendering(true);

    const renderPage = async () => {
      const page = await pdf.getPage(currentPage);
      if (cancelled) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const baseViewport = page.getViewport({ scale: 1 });
      const pageAspect = baseViewport.width / baseViewport.height;
      const containerAspect = size.w / size.h;
      const stagePadding = 28;
      const availableW = Math.max(size.w - stagePadding * 2, 1);
      const availableH = Math.max(size.h - stagePadding * 2, 1);
      const displayW =
        pageAspect > containerAspect ? availableW : availableH * pageAspect;
      const displayH =
        pageAspect > containerAspect ? availableW / pageAspect : availableH;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({
        scale: (displayW * dpr) / baseViewport.width,
      });
      const context = canvas.getContext("2d");

      if (!context) return;

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${Math.floor(displayW)}px`;
      canvas.style.height = `${Math.floor(displayH)}px`;
      context.clearRect(0, 0, canvas.width, canvas.height);

      await page.render({ canvasContext: context, viewport }).promise;

      if (!cancelled) {
        setRendering(false);
      }
    };

    void renderPage().catch(() => {
      if (!cancelled) {
        setError("PDF page could not be rendered.");
        setRendering(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [currentPage, pdf, size]);

  const goPrev = useCallback(
    () => setCurrentPage((page) => Math.max(page - 1, 1)),
    []
  );
  const goNext = useCallback(
    () => setCurrentPage((page) => Math.min(page + 1, numPages || page)),
    [numPages]
  );

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    if (!start) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    touchStartRef.current = null;

    if (Math.abs(deltaX) < 44 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) {
      return;
    }

    if (deltaX < 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  return (
    <Box
      bg={panelBg}
      color={textColor}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      h={height}
      minH={{ base: "560px", md: "640px" }}
      display="flex"
      flexDirection="column"
      boxShadow="0 28px 100px -58px rgba(0, 0, 0, 0.8)"
      _before={{
        content: '""',
        display: "block",
        h: "3px",
        bg: `linear-gradient(90deg, transparent, ${accentLine}, transparent)`,
      }}
    >
      <Grid
        templateColumns={{ base: "1fr auto", md: "1fr auto 1fr" }}
        alignItems="center"
        gap={3}
        px={{ base: 3, md: 5 }}
        py={3}
        borderBottom="1px solid"
        borderColor={borderColor}
      >
        <Text
          fontFamily="mono"
          fontSize={{ base: "xs", md: "sm" }}
          color={mutedColor}
        >
          Page {currentPage} of {numPages || "-"}
        </Text>

        <HStack spacing={2} justifySelf={{ base: "end", md: "center" }}>
          <IconButton
            aria-label="Previous page"
            icon={<HiChevronLeft />}
            size="sm"
            variant="outline"
            bg={controlBg}
            isDisabled={currentPage <= 1}
            onClick={goPrev}
          />
          <IconButton
            aria-label="Next page"
            icon={<HiChevronRight />}
            size="sm"
            variant="outline"
            bg={controlBg}
            isDisabled={!!numPages && currentPage >= numPages}
            onClick={goNext}
          />
        </HStack>

        <HStack
          spacing={2}
          justify="end"
          display={{ base: "none", md: "flex" }}
        >
          <IconButton
            as={Link}
            href={src}
            isExternal
            aria-label="Open PDF in browser"
            icon={<HiArrowTopRightOnSquare />}
            size="sm"
            variant="outline"
            bg={controlBg}
            _hover={{ textDecoration: "none" }}
          />
          <IconButton
            as={Link}
            href={src}
            download
            aria-label="Download PDF"
            icon={<HiArrowDownTray />}
            size="sm"
            variant="outline"
            bg={controlBg}
            _hover={{ textDecoration: "none" }}
          />
          {onClose && (
            <IconButton
              aria-label="Close PDF preview"
              icon={<HiXMark />}
              size="sm"
              variant="outline"
              bg={controlBg}
              onClick={onClose}
            />
          )}
        </HStack>
      </Grid>

      <HStack
        justify="space-between"
        px={{ base: 4, md: 5 }}
        py={{ base: 3, md: 4 }}
        borderBottom="1px solid"
        borderColor={borderColor}
        gap={3}
      >
        <Text fontWeight="bold" noOfLines={1} flex="1">
          {title}
        </Text>
        <HStack spacing={2} display={{ base: "flex", md: "none" }}>
          <IconButton
            as={Link}
            href={src}
            isExternal
            aria-label="Open PDF in browser"
            icon={<HiArrowTopRightOnSquare />}
            size="sm"
            variant="outline"
            bg={controlBg}
            _hover={{ textDecoration: "none" }}
          />
          <Button
            as={Link}
            href={src}
            download
            size="sm"
            leftIcon={<HiArrowDownTray />}
            _hover={{ textDecoration: "none" }}
          >
            PDF
          </Button>
          {onClose && (
            <IconButton
              aria-label="Close PDF preview"
              icon={<HiXMark />}
              size="sm"
              variant="outline"
              bg={controlBg}
              onClick={onClose}
            />
          )}
        </HStack>
      </HStack>

      <Box
        ref={stageRef}
        position="relative"
        flex="1"
        minH={0}
        bg={stageBg}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={{ base: 3, md: 5 }}
        sx={{ touchAction: "pan-y" }}
        onTouchStart={(event) => {
          const touch = event.touches[0];
          touchStartRef.current = { x: touch.clientX, y: touch.clientY };
        }}
        onTouchEnd={handleTouchEnd}
      >
        {(loading || rendering) && (
          <Center position="absolute" inset={0} zIndex={1}>
            <VStackLike color={mutedColor} />
          </Center>
        )}

        {error ? (
          <Center textAlign="center" color={mutedColor} px={6}>
            <Box>
              <Text fontWeight="bold" mb={2}>
                {error}
              </Text>
              <Button as={Link} href={src} isExternal size="sm">
                Open PDF
              </Button>
            </Box>
          </Center>
        ) : (
          <canvas
            ref={canvasRef}
            style={{
              borderRadius: "8px",
              background: "white",
              boxShadow: "0 24px 80px -40px rgba(0,0,0,0.75)",
              opacity: loading ? 0 : 1,
              transition: "opacity 180ms ease",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

const VStackLike = ({ color }: { color: string }) => (
  <Box textAlign="center" color={color}>
    <Spinner mb={3} />
    <Text fontFamily="mono" fontSize="sm">
      Loading PDF
    </Text>
  </Box>
);

export default PdfCanvasViewer;
