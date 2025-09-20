import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import profilePic from "../assets/profile.webp";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const About = () => {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const accentColor = useColorModeValue("#00987a", "#57dfc2");

  const items = [
    {
      title: "BINUS University",
      period: "Sep 2023 – Now",
      desc: "Student of Computer Science",
      highlight: "GPA 3.98 / 4.00",
    },
    {
      title: "Loyola College Senior High School, Semarang",
      period: "Jul 2020 – Jun 2023",
      desc: "Natural Science Major",
      highlight: "Magna Cumlaude",
    },
  ];

  return (
    <Box px={{ base: 4, md: 12, lg: 28 }} py={{ base: 10, md: 16 }}>
      <MotionFlex
        direction={{ base: "column", md: "row" }}
        align="center"
        mb={16}
        gap={10}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <MotionBox
          borderRadius="full"
          overflow="hidden"
          boxSize={{ base: "200px", md: "250px" }}
          border="6px solid"
          borderColor={accentColor}
          boxShadow="lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={profilePic}
            alt="Profile"
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </MotionBox>

        <MotionBox
          ml="40px"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Heading as="h2" size="xl" mb={4}>
            About Me
          </Heading>
          <Text color={textColor} fontSize="lg" maxW="600px">
            I am Michael Ivan Santoso, a Computer Science student at BINUS
            University with a passion for Intelligence Systems, especially in
            machine learning and deep learning. My goal is to create digital
            solutions that bring real impact.
          </Text>
        </MotionBox>
      </MotionFlex>

      <Box mb={16}>
        <Heading as="h3" size={{ base: "lg", md: "xl" }} mb={8}>
          Education
        </Heading>

        <VStack align="start" spacing={0} position="relative" pl={4}>
          <Box
            position="absolute"
            top={{ base: "-15px", md: "-15px" }}
            bottom={{ base: "35px", md: "35px" }}
            left={{ base: "8px", md: "11px" }}
            w="2px"
            bg={accentColor}
          />

          {items.map((edu, idx) => (
            <MotionFlex
              key={idx}
              mb={10}
              w="full"
              align="flex-start"
              position="relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.3 }}
            >
              <Box
                position="absolute"
                left={{ base: "-14px", md: "-13px" }}
                top={{ base: "6px", md: "6px" }}
                w={{ base: "14px", md: "18px" }}
                h={{ base: "14px", md: "18px" }}
                bg={accentColor}
                borderRadius="full"
                zIndex={1}
              />

              <Box pl={8}>
                <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
                  {edu.title}
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }} color={textColor}>
                  {edu.period}
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }} color={textColor}>
                  {edu.desc}
                </Text>
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  color={accentColor}
                  fontWeight="semibold"
                >
                  {edu.highlight}
                </Text>
              </Box>
            </MotionFlex>
          ))}
        </VStack>
      </Box>

      <MotionBox
        mb={16}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <Heading as="h3" size="lg" mb={6}>
          Languages & Skills
        </Heading>
        <VStack align="start" spacing={4} fontSize="lg">
          <Text>
            <b>Languages:</b> Bahasa Indonesia (Native), English
          </Text>
          <Text>
            <b>Tools:</b> Ms. Word, Ms. PowerPoint, Ms. Teams, Adobe
            Illustrator, Figma, Canva, Postman, Android Studio
          </Text>
          <Text>
            <b>Programming:</b> C, Python, Java, HTML, CSS, JavaScript, SQL,
            React (Typescript), Kotlin, Dart
          </Text>
          <Text>
            <b>Passionate in:</b> Machine Learning and Deep Learning
          </Text>
        </VStack>
      </MotionBox>

      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heading as="h3" size="lg" mb={6}>
          Personal Interest
        </Heading>
        <Text fontSize="lg" color={textColor}>
          Outside of coding, I enjoy playing games and immersing myself in
          music, it helps me stay happy and have a good mood.
        </Text>
      </MotionBox>
    </Box>
  );
};

export default About;
