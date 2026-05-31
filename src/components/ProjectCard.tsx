import {
  Badge,
  Box,
  Button,
  Grid,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  VStack,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { useState, type MouseEvent } from "react";
import type { IconType } from "react-icons";
import {
  FaFigma,
  FaFilePdf,
  FaGithub,
  FaGlobe,
  FaGoogleDrive,
  FaYoutube,
} from "react-icons/fa6";
import {
  HiArrowTopRightOnSquare,
  HiCodeBracket,
  HiDocumentText,
  HiPresentationChartBar,
  HiSquares2X2,
  HiSparkles,
} from "react-icons/hi2";
import type { Project, ProjectLink, ProjectLinkKind } from "../data/projects";
import PdfPreviewModal from "./PdfPreviewModal";
import PdfThumbnail from "./PdfThumbnail";

const MotionBox = motion(Box);

const linkIcons: Record<ProjectLinkKind, IconType> = {
  github: FaGithub,
  youtube: FaYoutube,
  drive: FaGoogleDrive,
  paper: HiDocumentText,
  figma: FaFigma,
  pdf: FaFilePdf,
  external: FaGlobe,
};

const lightGradients = [
  "linear-gradient(135deg, #dcfffa 0%, #dff1ff 48%, #fff7d6 100%)",
  "linear-gradient(135deg, #eaf5ff 0%, #e8fff8 52%, #f3e8ff 100%)",
  "linear-gradient(135deg, #fff4dd 0%, #e5fbff 48%, #ecfff1 100%)",
  "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 50%, #f8fafc 100%)",
];

const darkGradients = [
  "linear-gradient(135deg, rgba(0,152,122,0.24) 0%, rgba(87,223,194,0.08) 46%, rgba(255,218,121,0.14) 100%)",
  "linear-gradient(135deg, rgba(87,223,194,0.18) 0%, rgba(76,111,255,0.14) 52%, rgba(255,255,255,0.04) 100%)",
  "linear-gradient(135deg, rgba(255,191,105,0.16) 0%, rgba(87,223,194,0.12) 48%, rgba(155,93,229,0.13) 100%)",
  "linear-gradient(135deg, rgba(66,153,225,0.18) 0%, rgba(0,152,122,0.14) 50%, rgba(255,255,255,0.04) 100%)",
];

type ProjectCardProps = {
  project: Project;
  index: number;
};

const ProjectLinkButton = ({ link }: { link: ProjectLink }) => {
  const IconComponent = linkIcons[link.kind];
  const borderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const bg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const hoverBg = useColorModeValue("#edf7f5", "whiteAlpha.200");
  const hoverBorder = useColorModeValue("#8accc0", "#57dfc2");

  return (
    <Button
      as={Link}
      href={link.href}
      isExternal
      size="sm"
      variant="outline"
      leftIcon={<Icon as={IconComponent} />}
      rightIcon={<HiArrowTopRightOnSquare />}
      borderColor={borderColor}
      bg={bg}
      _hover={{
        bg: hoverBg,
        borderColor: hoverBorder,
        textDecoration: "none",
        transform: "translateY(-1px)",
      }}
      onClick={(event) => event.stopPropagation()}
    >
      {link.label}
    </Button>
  );
};

const PlaceholderMedia = ({ name }: { name: string }) => (
  <VStack
    position="absolute"
    inset={0}
    spacing={4}
    align="center"
    justify="center"
    px={8}
    textAlign="center"
  >
    <Icon as={HiSparkles} boxSize={14} opacity={0.9} />
    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold">
      {name}
    </Text>
  </VStack>
);

const ProjectDetailModal = ({
  isOpen,
  onClose,
  project,
  activeImage,
  setActiveImage,
  onOpenPdf,
}: {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  activeImage: number;
  setActiveImage: (index: number) => void;
  onOpenPdf: () => void;
}) => {
  const contentBg = useColorModeValue("white", "#101418");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const mutedColor = useColorModeValue("gray.600", "gray.400");
  const mediaBg = useColorModeValue("gray.50", "whiteAlpha.100");
  const isModalCentered = useBreakpointValue({ base: false, md: true });
  const externalLinks = project.links.filter((link) => link.kind !== "pdf");
  const selectedImage = project.images[activeImage];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      isCentered={isModalCentered}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />
      <ModalContent
        bg={contentBg}
        border="1px solid"
        borderColor={borderColor}
        w={{ base: "calc(100vw - 32px)", md: "auto" }}
        maxW={{ base: "calc(100vw - 32px)", md: "5xl" }}
        mt={{ base: "calc(env(safe-area-inset-top) + 72px)", md: "auto" }}
        mb={{ base: 4, md: "auto" }}
        borderRadius={{ base: "lg", md: "xl" }}
        overflow="hidden"
      >
        <ModalHeader pr={14}>
          <Text lineHeight="short">{project.name}</Text>
          <Text mt={1} color={mutedColor} fontSize="sm" fontWeight="normal">
            {project.category} / {project.year}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={{ base: 4, md: 6 }}>
          <Grid
            templateColumns={{ base: "minmax(0, 1fr)", lg: "1.05fr 0.95fr" }}
            gap={6}
          >
            <VStack align="stretch" spacing={3} minW={0}>
              <Box
                position="relative"
                overflow="hidden"
                borderRadius="lg"
                bg={mediaBg}
                aspectRatio="16 / 10"
                minW={0}
              >
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt={`${project.name} preview`}
                    w="100%"
                    h="100%"
                    objectFit="contain"
                  />
                ) : project.pdf ? (
                  <PdfThumbnail src={project.pdf} title={project.name} />
                ) : (
                  <PlaceholderMedia name={project.name} />
                )}
              </Box>

              {project.images.length > 1 && (
                <HStack spacing={2} overflowX="auto" pb={1}>
                  {project.images.map((image, imageIndex) => (
                    <IconButton
                      key={image}
                      aria-label={`Show ${project.name} preview ${imageIndex + 1}`}
                      icon={
                        <Image
                          src={image}
                          alt=""
                          w="100%"
                          h="100%"
                          objectFit="cover"
                        />
                      }
                      onClick={() => setActiveImage(imageIndex)}
                      minW="72px"
                      h="54px"
                      p={0}
                      overflow="hidden"
                      border="2px solid"
                      borderColor={
                        activeImage === imageIndex ? "teal.300" : borderColor
                      }
                      bg="transparent"
                    />
                  ))}
                </HStack>
              )}
            </VStack>

            <VStack align="stretch" spacing={5} minW={0}>
              <Box minW={0}>
                <Badge
                  colorScheme="teal"
                  mb={3}
                  whiteSpace="normal"
                  wordBreak="break-word"
                  lineHeight="short"
                >
                  {project.tagline}
                </Badge>
                <Text color={mutedColor} lineHeight="tall">
                  {project.description}
                </Text>
              </Box>

              <Box>
                <HStack mb={3} color="teal.300">
                  <HiCodeBracket />
                  <Text fontWeight="bold">Technology</Text>
                </HStack>
                <HStack flexWrap="wrap" gap={2}>
                  {project.tech.map((tech) => (
                    <Tag key={tech} borderRadius="full" colorScheme="teal">
                      {tech}
                    </Tag>
                  ))}
                </HStack>
              </Box>

              <Stack direction="row" flexWrap="wrap" gap={2}>
                {externalLinks.map((link) => (
                  <ProjectLinkButton key={link.href} link={link} />
                ))}
                {project.pdf && (
                  <Button
                    size="sm"
                    colorScheme="teal"
                    leftIcon={<HiPresentationChartBar />}
                    rightIcon={<HiArrowTopRightOnSquare />}
                    onClick={onOpenPdf}
                  >
                    View Presentation
                  </Button>
                )}
              </Stack>
            </VStack>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const detailDisclosure = useDisclosure();
  const pdfDisclosure = useDisclosure();
  const reducedMotion = useReducedMotion();
  const cardBg = useColorModeValue(
    "rgba(255,255,255,0.86)",
    "rgba(16,20,24,0.78)"
  );
  const cardBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const titleColor = useColorModeValue("gray.900", "white");
  const mutedColor = useColorModeValue("gray.600", "gray.400");
  const chipBg = useColorModeValue("teal.50", "whiteAlpha.100");
  const chipBorder = useColorModeValue("teal.100", "whiteAlpha.200");
  const hoverBorder = useColorModeValue("#8accc0", "#57dfc2");
  const hoverTitle = useColorModeValue("#007f66", "#57dfc2");
  const cardShadow = useColorModeValue(
    "0 18px 60px -42px rgba(0, 72, 65, 0.55)",
    "0 24px 80px -52px rgba(87, 223, 194, 0.55)"
  );
  const mediaBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const detailsBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const detailsHoverBg = useColorModeValue("#f2fbf8", "whiteAlpha.200");
  const mediaBg = useColorModeValue(
    lightGradients[index % lightGradients.length],
    darkGradients[index % darkGradients.length]
  );
  const externalLinks = project.links.filter((link) => link.kind !== "pdf");
  const selectedImage = project.images[activeImage];

  const openPdf = () => {
    if (project.pdf) {
      pdfDisclosure.onOpen();
    }
  };

  return (
    <>
      <MotionBox
        as="article"
        role="group"
        initial={{ opacity: 0, y: reducedMotion ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        whileHover={reducedMotion ? undefined : { y: -8 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        bg={cardBg}
        border="1px solid"
        borderColor={cardBorder}
        borderRadius="xl"
        overflow="hidden"
        h="full"
        display="flex"
        flexDirection="column"
        position="relative"
        cursor="pointer"
        boxShadow={cardShadow}
        backdropFilter="blur(16px)"
        onClick={detailDisclosure.onOpen}
        _before={{
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: "1px",
          bg: "linear-gradient(135deg, transparent, rgba(87,223,194,0.32), rgba(255,218,121,0.18), transparent)",
          opacity: 0,
          transition: "opacity 260ms ease",
          pointerEvents: "none",
          sx: {
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          },
        }}
        _after={{
          content: '""',
          position: "absolute",
          inset: 0,
          bg: "linear-gradient(115deg, transparent 34%, rgba(255,255,255,0.12) 50%, transparent 66%)",
          transform: "translateX(-120%)",
          transition: "transform 850ms cubic-bezier(.22,1,.36,1)",
          pointerEvents: "none",
        }}
        _hover={{
          borderColor: hoverBorder,
          _before: { opacity: 1 },
          _after: { transform: "translateX(120%)" },
        }}
      >
        <Box
          position="relative"
          overflow="hidden"
          aspectRatio="16 / 10"
          bg={mediaBg}
          color={titleColor}
          borderBottom="1px solid"
          borderColor={mediaBorder}
          boxShadow="inset 0 0 0 1px rgba(255,255,255,0.08)"
        >
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt={`${project.name} screenshot`}
              w="100%"
              h="100%"
              objectFit="cover"
              transition="transform 900ms cubic-bezier(.22,1,.36,1), filter 600ms ease"
              _groupHover={{
                transform: "scale(1.055)",
                filter: "saturate(1.12) contrast(1.04)",
              }}
            />
          ) : project.pdf ? (
            <PdfThumbnail src={project.pdf} title={project.name} />
          ) : (
            <PlaceholderMedia name={project.name} />
          )}

          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-t, blackAlpha.700, transparent 58%)"
            opacity={selectedImage ? 0.24 : 0.18}
          />

          <HStack
            position="absolute"
            top={4}
            left={4}
            right={4}
            justify="space-between"
            align="start"
            spacing={3}
          >
            <HStack flexWrap="wrap" gap={2}>
              <Badge colorScheme="teal" borderRadius="full" px={3} py={1}>
                {String(index + 1).padStart(2, "0")}
              </Badge>
              <Badge
                bg="blackAlpha.700"
                color="white"
                borderRadius="full"
                px={3}
                py={1}
              >
                {project.category}
              </Badge>
            </HStack>
            <Badge
              bg="whiteAlpha.900"
              color="gray.900"
              borderRadius="full"
              px={3}
              py={1}
            >
              {project.year}
            </Badge>
          </HStack>

          {project.images.length > 1 && (
            <HStack
              position="absolute"
              left={4}
              bottom={4}
              spacing={2}
              display={{ base: "none", md: "flex" }}
            >
              {project.images.slice(0, 4).map((image, imageIndex) => (
                <Box
                  key={image}
                  as="button"
                  type="button"
                  aria-label={`Preview ${imageIndex + 1}`}
                  onClick={(event: MouseEvent<HTMLButtonElement>) => {
                    event.stopPropagation();
                    setActiveImage(imageIndex);
                  }}
                  w="52px"
                  h="38px"
                  borderRadius="md"
                  overflow="hidden"
                  border="2px solid"
                  borderColor={
                    activeImage === imageIndex ? hoverBorder : "whiteAlpha.600"
                  }
                  bg="blackAlpha.500"
                  transition="transform 180ms ease, border-color 180ms ease"
                  _hover={{ transform: "translateY(-2px)" }}
                >
                  <Image src={image} alt="" w="100%" h="100%" objectFit="cover" />
                </Box>
              ))}
            </HStack>
          )}
        </Box>

        <VStack align="stretch" spacing={4} p={{ base: 5, md: 6 }} flex="1">
          <Box>
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              lineHeight="shorter"
              fontWeight="extrabold"
              color={titleColor}
              transition="color 220ms ease"
              _groupHover={{ color: hoverTitle }}
            >
              {project.name}
            </Text>
            <Text mt={2} color={hoverTitle} fontWeight="semibold">
              {project.tagline}
            </Text>
          </Box>

          <Text color={mutedColor} lineHeight="tall" noOfLines={5}>
            {project.description}
          </Text>

          <SimpleGrid columns={{ base: 2, sm: 3 }} spacing={2}>
            {project.tech.slice(0, 6).map((tech) => (
              <Tag
                key={tech}
                borderRadius="full"
                bg={chipBg}
                border="1px solid"
                borderColor={chipBorder}
                justifyContent="center"
                minH="32px"
                fontSize="xs"
              >
                {tech}
              </Tag>
            ))}
          </SimpleGrid>

          <Stack direction="row" flexWrap="wrap" gap={2} pt={2} mt="auto">
            {externalLinks.slice(0, 3).map((link) => (
              <ProjectLinkButton key={link.href} link={link} />
            ))}
            {project.pdf && (
              <Button
                size="sm"
                colorScheme="teal"
                leftIcon={<HiPresentationChartBar />}
                rightIcon={<HiArrowTopRightOnSquare />}
                onClick={(event) => {
                  event.stopPropagation();
                  openPdf();
                }}
              >
                View Presentation
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              leftIcon={<HiSquares2X2 />}
              borderColor={hoverBorder}
              bg={detailsBg}
              _hover={{
                bg: detailsHoverBg,
                transform: "translateY(-1px)",
              }}
              onClick={(event) => {
                event.stopPropagation();
                detailDisclosure.onOpen();
              }}
            >
              Details
            </Button>
          </Stack>
        </VStack>
      </MotionBox>

      <ProjectDetailModal
        isOpen={detailDisclosure.isOpen}
        onClose={detailDisclosure.onClose}
        project={project}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
        onOpenPdf={openPdf}
      />

      {project.pdf && (
        <PdfPreviewModal
          isOpen={pdfDisclosure.isOpen}
          onClose={pdfDisclosure.onClose}
          src={project.pdf}
          title={project.name}
        />
      )}
    </>
  );
};

export default ProjectCard;
