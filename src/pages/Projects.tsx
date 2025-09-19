import {
  Box,
  Heading,
  Text,
  VStack,
  Link,
  Stack,
  useColorModeValue,
  HStack,
  Image,
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
    images: ["src/assets/cateringz.png"],
  },
  {
    name: "Deepfake Detector",
    desc: "Streamlit app and mobile app using Android Studio to detect deep-fake images using VGG16 model with dataset from Kaggle for training.",
    link: "https://github.com/Mis-291205/AoL-AI_VGG16",
    images: ["src/assets/deepfake.png"],
  },
  {
    name: "NLP Chatbot-BERT",
    desc: "A chatbot using BERT model with intent classification approach with datasets from Kaggle.",
    link: "https://github.com/migz177/chatbot-bert",
    images: ["src/assets/chatbot_train.png", "src/assets/chatbot.png"],
  },
  {
    name: "KostLife",
    desc: "A mobile app for assisting users, especially students in planning and scheduling daily activities and helping to manage personal finances. Using React Native Expo as frontend and NextJS + Prisma as backend.",
    link: [
      "https://github.com/JasonEvan/kostlife-frontend",
      "https://github.com/JasonEvan/kostlife-backend",
      "https://www.figma.com/design/rxEjv3IvQ6xUURmfw9PJyS/SE-AOL?node-id=0-1&t=pcARrbGplrsreGy9-1",
    ],
    images: [
      "src/assets/kostlife1.png",
      "src/assets/kostlife2.png",
      "src/assets/kostlife3.png",
    ],
  },
  {
    name: "Waste Detector",
    desc: "Streamlit app and mobile app using Android Studio to detect and categorize waste images using VGG16 model with dataset from Kaggle for training.",
    link: "https://github.com/Mis-291205/AoL-MachineLearning",
    images: ["src/assets/waste.png"],
  },
  {
    name: "Churn Prediction",
    desc: "An Android application that predicts whether a customer will churn (unsubscribe) or not, based on customer data input. I focused on training traditional machine learning models until I found that the best approach for this dataset was bagging classifiers before later using them in the application.",
    link: "https://github.com/Dard1ka/ChurnPredictionApp",
    images: [
      "src/assets/churn.png",
      "src/assets/churn_main.jpg",
      "src/assets/churn_second.jpg",
    ],
  },
  {
    name: "Parkinson MobileNet Comparison",
    desc: "Spiral and Wave image-based Parkinson's detection experiment using a lightweight deep learning model. Comparing MobileNetV2, custom MobileNetV2, and MobileNetV3-Small to evaluate accuracy, computational efficiency, and potential implementation on mobile/edge devices. I am focusing on writing a paper for Gemastik 2025, which will analyze and compare the results of each model. The image on the left shows the results from the spiral image dataset, while the image on the right shows the results from the wave dataset.",
    link: [
      "https://github.com/Dard1ka/parkinson-mobilenet-comparison",
      "https://drive.google.com/drive/folders/1Lw_GlFaKSJvVzCAnZ1VRVMkrDOx8T4jq?usp=sharing",
    ],
    images: ["src/assets/spiral.jpg", "src/assets/wave.jpg"],
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
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={6}
              align="center"
            >
              {proj.images && (
                <Box
                  display="flex"
                  gap={3}
                  flexWrap="wrap"
                  justifyContent={{ base: "center", md: "flex-start" }}
                >
                  {proj.images.map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      alt={`${proj.name} screenshot ${i + 1}`}
                      maxH="200px" // batas tinggi gambar
                      objectFit="contain" // biar tidak ketarik
                      borderRadius="md"
                      boxShadow="md"
                    />
                  ))}
                </Box>
              )}

              {/* Deskripsi di kanan */}
              <Box flex="1">
                <Text
                  color={projectColor}
                  fontWeight="bold"
                  fontSize="4xl"
                  mb={2}
                >
                  {proj.name}
                </Text>
                <Text mb={4} color={descColor} fontSize="xl">
                  {proj.desc}
                </Text>

                {/* Link Buttons */}
                {Array.isArray(proj.link) ? (
                  proj.name === "KostLife" ? (
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
                        <HiArrowTopRightOnSquare
                          style={{ marginLeft: "6px" }}
                        />
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
                        <HiArrowTopRightOnSquare
                          style={{ marginLeft: "6px" }}
                        />
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
                        <HiArrowTopRightOnSquare
                          style={{ marginLeft: "6px" }}
                        />
                      </Link>
                    </Stack>
                  ) : proj.name === "Parkinson MobileNet Comparison" ? (
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
                        GitHub{" "}
                        <HiArrowTopRightOnSquare
                          style={{ marginLeft: "6px" }}
                        />
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
                        Drive{" "}
                        <HiArrowTopRightOnSquare
                          style={{ marginLeft: "6px" }}
                        />
                      </Link>
                    </Stack>
                  ) : (
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
                      GitHub{" "}
                      <HiArrowTopRightOnSquare style={{ marginLeft: "6px" }} />
                    </Link>
                  )
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
                    GitHub{" "}
                    <HiArrowTopRightOnSquare style={{ marginLeft: "6px" }} />
                  </Link>
                )}
              </Box>
            </Stack>
          </MotionBox>
        ))}
      </VStack>
    </Box>
  );
};

export default Projects;
