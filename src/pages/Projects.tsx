import {
  Box,
  Heading,
  Text,
  VStack,
  Link,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MotionBox = motion(Box);
const MotionSpan = motion.span;

const projects = [
  {
    name: "CAteriNgz",
    desc: "Simple web development that focuses on selling cuisine for catering using HTML, CSS, and JavaScript with a total of 8 website pages and only using JavaScript for calculating amount, total price, and login/register.",
    link: "https://github.com/Mis-291205/AoL_HCI",
  },
  {
    name: "Deepfake Detector",
    desc: "Streamlit app and mobile app using Android Studio to detect deep-fake images using VGG16 model with dataset from Kaggle for training.",
    link: "https://github.com/Mis-291205/AoL-AI_VGG16",
  },
  {
    name: "NLP Chatbot-BERT",
    desc: "A chatbot using BERT model with intent classification approach with datasets from Kaggle.",
    link: "https://github.com/migz177/chatbot-bert",
  },
  {
    name: "KostLife",
    desc: "A mobile app for assisting users, especially students in planning and scheduling daily activities and helping to manage personal finances. Using React Native Expo as frontend and NextJS + Prisma as backend.",
    link: [
      "https://github.com/JasonEvan/kostlife-frontend",
      "https://github.com/JasonEvan/kostlife-backend",
      "https://www.figma.com/design/rxEjv3IvQ6xUURmfw9PJyS/SE-AOL?node-id=0-1&t=pcARrbGplrsreGy9-1",
    ],
  },
  {
    name: "Waste Detector",
    desc: "Streamlit app and mobile app using Android Studio to detect and categorize waste images using VGG16 model with dataset from Kaggle for training.",
    link: "https://github.com/Mis-291205/AoL-MachineLearning",
  },
  {
    name: "Traffic Light",
    desc: "This project uses YOLO (Ultralytics) for vehicle detection from YouTube streams/local streams, as well as Fuzzy Logic (scikit-fuzzy) for traffic density analysis.",
    link: "https://github.com/Dard1ka/TrafficLightAi",
  },
  {
    name: "Churn Prediction",
    desc: "An Android application that predicts whether a customer will churn (unsubscribe) or not, based on customer data input.",
    link: "https://github.com/Dard1ka/ChurnPredictionApp",
  },
  {
    name: "Parkinson MobileNet Comparison",
    desc: "Spiral and Wave image-based Parkinson's detection experiment using a lightweight deep learning model. Comparing MobileNetV2, custom MobileNetV2, and MobileNetV3-Small to evaluate accuracy, computational efficiency, and potential implementation on mobile/edge devices.",
    link: "https://github.com/Dard1ka/parkinson-mobilenet-comparison",
  },
];

const Projects = () => {
  const boxBorder = useColorModeValue("#00987a", "#57dfc2");
  const projectColor = useColorModeValue("#2d3748", "#c9caceff");
  const descColor = useColorModeValue("#4a5568", "gray.400");
  const linkColor = useColorModeValue("#00987a", "teal.400");
  const linkHover = useColorModeValue("#007f66", "teal.600");

  const fullText = "My Projects";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box py={{ base: 8, md: 12 }}>
      <Heading
        as="h2"
        size="2xl"
        mb={10}
        ml={{ base: 5, md: 10, lg: 28 }}
        fontFamily="monospace"
        display="flex"
        alignItems="center"
      >
        {displayText}
        <MotionSpan
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          style={{ marginLeft: "2px" }}
        >
          |
        </MotionSpan>
      </Heading>

      <VStack spacing={8}>
        {projects.map((proj, index) => (
          <MotionBox
            key={index}
            w="full"
            maxW="1255px"
            px={{ base: 4, md: 6, lg: 10 }}
            py={6}
            borderRadius="xl"
            boxShadow="md"
            border="2px solid"
            borderColor={boxBorder}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Text color={projectColor} fontWeight="bold" fontSize="4xl" mb={2}>
              {proj.name}
            </Text>
            <Text mb={4} color={descColor} fontSize="xl">
              {proj.desc}
            </Text>

            {Array.isArray(proj.link) ? (
              <Stack
                spacing={4}
                direction={{ base: "column", sm: "row" }}
                align={{ base: "flex-start", sm: "center" }}
              >
                <Link
                  href={proj.link[0]}
                  isExternal
                  fontWeight="medium"
                  color={linkColor}
                  fontSize="lg"
                  display="inline-flex"
                  alignItems="center"
                  _hover={{ color: linkHover }}
                >
                  Frontend{" "}
                  <HiArrowTopRightOnSquare style={{ marginLeft: "6px" }} />
                </Link>
                <Link
                  href={proj.link[1]}
                  isExternal
                  fontWeight="medium"
                  color={linkColor}
                  fontSize="lg"
                  display="inline-flex"
                  alignItems="center"
                  _hover={{ color: linkHover }}
                >
                  Backend{" "}
                  <HiArrowTopRightOnSquare style={{ marginLeft: "6px" }} />
                </Link>
                <Link
                  href={proj.link[2]}
                  isExternal
                  fontWeight="medium"
                  color={linkColor}
                  fontSize="lg"
                  display="inline-flex"
                  alignItems="center"
                  _hover={{ color: linkHover }}
                >
                  UI Design{" "}
                  <HiArrowTopRightOnSquare style={{ marginLeft: "6px" }} />
                </Link>
              </Stack>
            ) : (
              <Link
                href={proj.link}
                isExternal
                fontWeight="medium"
                color={linkColor}
                fontSize="lg"
                display="inline-flex"
                alignItems="center"
                _hover={{ color: linkHover }}
              >
                Detail <HiArrowTopRightOnSquare style={{ marginLeft: "6px" }} />
              </Link>
            )}
          </MotionBox>
        ))}
      </VStack>
    </Box>
  );
};

export default Projects;
