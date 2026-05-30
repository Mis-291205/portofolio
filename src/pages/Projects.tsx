import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

const MotionBox = motion(Box);

const Projects = () => {
  const reducedMotion = useReducedMotion();
  const headingColor = useColorModeValue("gray.900", "white");
  const mutedColor = useColorModeValue("gray.600", "gray.400");
  const statBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const statBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const cursorColor = useColorModeValue("#00987a", "#57dfc2");
  const titleText = "Projects that turn AI ideas into usable systems.";
  const descriptionText =
    "A collection of AI, data, research, and app projects, with visuals and links to show how each idea was built.";
  const [typedTitle, setTypedTitle] = useState(reducedMotion ? titleText : "");
  const [typedDescription, setTypedDescription] = useState(
    reducedMotion ? descriptionText : ""
  );
  const yearRange = `${projects[projects.length - 1]?.year ?? "2023"}-${
    projects[0]?.year ?? "2026"
  }`;

  useEffect(() => {
    if (reducedMotion) {
      setTypedTitle(titleText);
      setTypedDescription(descriptionText);
      return undefined;
    }

    let titleIndex = 0;
    let descriptionIndex = 0;
    let descriptionTimer: ReturnType<typeof setInterval> | undefined;

    setTypedTitle("");
    setTypedDescription("");

    const titleTimer = setInterval(() => {
      titleIndex += 1;
      setTypedTitle(titleText.slice(0, titleIndex));

      if (titleIndex >= titleText.length) {
        clearInterval(titleTimer);
        descriptionTimer = setInterval(() => {
          descriptionIndex += 1;
          setTypedDescription(descriptionText.slice(0, descriptionIndex));

          if (descriptionIndex >= descriptionText.length && descriptionTimer) {
            clearInterval(descriptionTimer);
          }
        }, 7);
      }
    }, 14);

    return () => {
      clearInterval(titleTimer);
      if (descriptionTimer) clearInterval(descriptionTimer);
    };
  }, [descriptionText, reducedMotion, titleText]);

  return (
    <Box
      px={{ base: 4, md: 8, lg: 14, xl: 20 }}
      py={{ base: 8, md: 12 }}
      pb={{ base: 16, md: 20 }}
      maxW="100vw"
      overflowX="hidden"
    >
      <MotionBox
        initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        maxW="1280px"
        w="100%"
        minW={0}
        mx="auto"
        mb={{ base: 8, md: 12 }}
      >
        <VStack align="start" spacing={5} maxW="950px">
          <Heading
            as="h1"
            color={headingColor}
            fontSize={{ base: "4xl", md: "6xl", xl: "7xl" }}
            lineHeight="0.98"
            letterSpacing="0"
            overflowWrap="break-word"
          >
            {typedTitle}
            {typedTitle.length < titleText.length && (
              <Box as="span" className="typing-cursor" color={cursorColor}>
                |
              </Box>
            )}
          </Heading>
          <Text
            color={mutedColor}
            fontSize={{ base: "md", md: "xl" }}
            maxW="760px"
            lineHeight="tall"
          >
            {typedDescription}
            {typedTitle.length === titleText.length && (
              <Box as="span" className="typing-cursor" color={cursorColor}>
                |
              </Box>
            )}
          </Text>
        </VStack>
      </MotionBox>

      <SimpleGrid
        maxW="1280px"
        w="100%"
        minW={0}
        mx="auto"
        columns={{ base: 1, md: 3 }}
        spacing={4}
        mb={{ base: 8, md: 10 }}
      >
        {[
          { label: "Projects", value: `${projects.length}` },
          { label: "Years", value: yearRange },
          { label: "Focus", value: "AI / Data / Apps" },
        ].map((stat) => (
          <Box
            key={stat.label}
            bg={statBg}
            border="1px solid"
            borderColor={statBorder}
            borderRadius="lg"
            p={{ base: 4, md: 5 }}
            backdropFilter="blur(14px)"
          >
            <Text color={mutedColor} fontSize="sm">
              {stat.label}
            </Text>
            <Text
              mt={1}
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              color={headingColor}
              lineHeight="short"
            >
              {stat.value}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      <Stack
        maxW="1280px"
        w="100%"
        minW={0}
        mx="auto"
        mb={5}
        color={mutedColor}
        align="start"
      >
        <Text fontSize="sm">Sorted by most recent work</Text>
      </Stack>

      <SimpleGrid
        maxW="1280px"
        w="100%"
        minW={0}
        mx="auto"
        columns={{ base: 1, xl: 2 }}
        spacing={{ base: 5, md: 7 }}
        alignItems="stretch"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Projects;
