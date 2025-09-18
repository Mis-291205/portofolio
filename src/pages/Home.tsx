import { Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";

const MotionText = motion(Text);

const Home = () => {
  const introColor = useColorModeValue("#00987a", "#57dfc2");
  const nameColor = useColorModeValue("#1a202c", "#cedaf2");
  const taglineColor = useColorModeValue("#2d3748", "#596580");
  const descColor = useColorModeValue("#4a5568", "#404650");
  const linkColor = useColorModeValue("#00987a", "#57dfc2");

  return (
    <VStack
      spacing={3}
      align="start"
      ml={{ base: 5, md: 10, lg: 20, xl: 28, "2xl": 32 }}
      mt={{ base: 5, md: 10 }}
    >
      <MotionText
        fontSize={{ base: "xl", md: "2xl", xl: "3xl" }}
        color={introColor}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        Hi, my name is
      </MotionText>

      <MotionText
        fontSize={{
          base: "3xl",
          md: "5xl",
          lg: "6xl",
          xl: "6xl",
          "2xl": "7xl",
        }}
        fontWeight="bold"
        color={nameColor}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Michael Ivan Santoso.
      </MotionText>

      <MotionText
        fontSize={{
          base: "2xl",
          md: "4xl",
          lg: "5xl",
          xl: "5xl",
          "2xl": "6xl",
        }}
        fontWeight="bold"
        color={taglineColor}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        I transform data into intelligence.
      </MotionText>

      <MotionText
        fontSize={{ base: "sm", md: "md", xl: "lg" }}
        color={descColor}
        maxW={{
          base: "90%",
          md: "600px",
          lg: "800px",
          xl: "1000px",
          "2xl": "1100px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        I am a Computer Science student specializing in Intelligence Systems,
        including Machine Learning, Deep Learning, etc. Currently, I am still
        focused on my studies and am looking for an internship to develop myself
        for the future. For more information about me, visit the{" "}
        <Text
          as={RouterLink}
          to="/projects"
          color={linkColor}
          fontWeight="semibold"
          _hover={{ textDecoration: "underline" }}
          display="inline"
        >
          Projects
        </Text>
        ,{" "}
        <Text
          as={RouterLink}
          to="/about"
          color={linkColor}
          fontWeight="semibold"
          _hover={{ textDecoration: "underline" }}
          display="inline"
        >
          About
        </Text>
        , and{" "}
        <Text
          as={RouterLink}
          to="/resume"
          color={linkColor}
          fontWeight="semibold"
          _hover={{ textDecoration: "underline" }}
          display="inline"
        >
          Resume
        </Text>{" "}
        pages.
      </MotionText>
    </VStack>
  );
};

export default Home;
