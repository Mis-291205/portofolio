import {
  Box,
  Heading,
  Text,
  VStack,
  Link,
  Stack,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MotionBox = motion(Box);
const MotionSpan = motion.span;

const projects = [
  {
    name: "Parkinson MobileNet Comparison",
    year: "2025",
    desc: "Spiral and Wave image-based Parkinson's detection experiment using a lightweight deep learning model. Comparing MobileNetV2, custom MobileNetV2, and MobileNetV3-Small to evaluate accuracy, computational efficiency, and potential implementation on mobile/edge devices. I am focusing on writing a paper for Gemastik 2025, which will analyze and compare the results of each model. The first image shows the results from the spiral image dataset, while the second image shows the results from the wave dataset.",
    tech: ["Python", "Google Colab", "Ms. Word"],
    link: [
      "https://github.com/Dard1ka/parkinson-mobilenet-comparison",
      "https://drive.google.com/drive/folders/1Lw_GlFaKSJvVzCAnZ1VRVMkrDOx8T4jq?usp=sharing",
    ],
    images: ["/spiral.jpg", "/wave.jpg"],
  },
  {
    name: "Extractive Indonesian News Text Summarization using DistilBERT, IndoBERT, MBERT, and RoBERTa",
    year: "2025",
    desc: "A research paper focusing on extractive summarization of Indonesian news articles, comparing the performance of transformer-based models (DistilBERT, IndoBERT, MBERT, and RoBERTa) in terms of accuracy that calculated using ROUGE metric. At that time, I was training the DistilBERT and RoBERTa models. Then, in writing the paper I worked on part of the introduction, part of the methodology, and did the citations.",
    tech: [
      "Python",
      "Google Colab",
      "Ms. Word",
      "Ms. Excell",
      "Mendeley Reference Manager",
    ],
    link: [
      "https://github.com/migz177/ResearchMethod_Summarize",
      "https://drive.google.com/file/d/1pejSYCq1yHDsf9RrVT-pLP9bM157wY5L/view?usp=drivesdk",
    ],
    images: ["/research.png"],
  },
  {
    name: "Churn Prediction",
    year: "2025",
    desc: "An Android application that predicts whether a customer will churn (unsubscribe) or not, based on customer data input. I focused on training traditional machine learning models until I found that the best approach for this dataset was bagging classifiers with an accuracy of around 0.89 to 0.9 in several training trials before later using them in the application.",
    link: "https://github.com/Dard1ka/ChurnPredictionApp",
    tech: [
      "Python",
      "Kaggle",
      "Google Colab",
      "Ms. Excell",
      "Android Studio",
      "ONNX Runtime",
    ],
    images: ["/churn.jpg", "/churn_main.jpg", "/churn_second.jpg"],
  },
  {
    name: '"Chatbot University", NLP Chatbot-BERT',
    year: "2025",
    desc: "A chatbot using BERT model with intent classification approach with datasets from Kaggle. The chatbot uses a transformer-based model for intent classification, ensuring relevant responses, and includes fallback handling when user input is unclear. Overall, it serves as a simple interactive tool to improve access to university information and enhance student support.",
    link: "https://github.com/migz177/chatbot-bert",
    tech: ["Python", "Google Colab", "Kaggle"],
    images: ["/chatbot_train.png", "/chatbot.png"],
  },
  {
    name: "KostLife",
    year: "2025",
    desc: "A mobile app for assisting users, especially students in planning and scheduling daily activities and helping to manage personal finances. Using React Native Expo as frontend and NextJS + Prisma as backend.",
    link: [
      "https://github.com/JasonEvan/kostlife-frontend",
      "https://github.com/JasonEvan/kostlife-backend",
      "https://www.figma.com/design/rxEjv3IvQ6xUURmfw9PJyS/SE-AOL?node-id=0-1&t=pcARrbGplrsreGy9-1",
    ],
    tech: [
      "React Native Expo",
      "NextJS",
      "Expo Go",
      "Figma",
      "Git",
      "Prisma",
      "Supabase",
      "iOS Simulator",
    ],
    images: ["/kostlife1.png", "/kostlife2.png", "/kostlife3.png"],
  },
  {
    name: "Waste Detector",
    year: "2025",
    desc: "Streamlit app and mobile app using Android Studio to detect and categorize waste images using VGG16 model with dataset from Kaggle for training. At that time, I was training the VGG16 models, designed Streamlit, evaluated the model results, and created a mobile version using Android Studio.",
    link: "https://github.com/Mis-291205/AoL-MachineLearning",
    tech: ["Python", "Google Colab", "Kaggle", "Streamlit", "Android Studio"],
    images: ["/waste.png", "/waste2.jpg"],
  },
  {
    name: "Deepfake Detector",
    year: "2024",
    desc: "Streamlit app and mobile app using Android Studio to detect deep-fake images using VGG16 model with dataset from Kaggle for training. At that time, I was training the VGG16 models and created a mobile version using Android Studio.",
    link: "https://github.com/Mis-291205/AoL-AI_VGG16",
    tech: ["Python", "Google Colab", "Kaggle", "Streamlit", "Android Studio"],
    images: ["/deepfake.png", "/deepfake2.jpg"],
  },
  {
    name: "Computer Network",
    year: "2024",
    desc: "A simulation of network circuit design on 3 floors of the building, including: devices used, networking media types, media length used, IP addressing and subnetting, routing, and application layer using Cisco Packet Tracer.",
    link: "https://github.com/Mis-291205/AoL-ComputerNetwork",
    tech: ["Cisco Packet Tracer"],
    images: ["/compnet1.png", "/compnet2.png"],
  },
  {
    name: "Data Structure",
    year: "2024",
    desc: "A C program that implements a slang dictionary called “Boogle” using a Trie (prefix tree) data structure, where users can release new slang words with descriptions, search for specific slang words, view slang words that begin with a certain prefix, and display all slang words stored. These 2 images are screenshots of the code and the display when compiled and run as .exe.",
    link: "https://github.com/Mis-291205/AOL_DataStructure",
    tech: ["Dev C++"],
    images: ["/ds2.png", "/ds1.png"],
  },
  {
    name: "CAteriNgz",
    year: "2024",
    desc: "Simple web development that focuses on selling cuisine for catering using HTML, CSS, and JavaScript with a total of 8 website pages and only using JavaScript for calculating amount, total price, and login/register. This is a screenshot of the website's home page.",
    link: "https://github.com/Mis-291205/AoL_HCI",
    tech: ["Figma", "HTML", "CSS", "JavaScript"],
    images: ["/cateringz.png"],
  },
  {
    name: "Algorithm and Programming",
    year: "2023",
    desc: "A C program that is a menu-driven data management system for a CSV file that stores housing information. The program provides several options: display, search, sort, and export data while it keeps running in a loop until the user selects option 5 to exit.These 2 images are screenshots of the code and the display when compiled and run as .exe.",
    link: "https://github.com/Mis-291205/AOL_AlgorithmAndProgramming",
    tech: ["Dev C++"],
    images: ["/alprog1.png", "/alprog2.png"],
  },
];

const Projects = () => {
  const boxBorder = useColorModeValue("#00987a", "#57dfc2");
  const projectColor = useColorModeValue("black", "white");
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
                  flexDirection="row"
                  flexWrap="wrap"
                  justifyContent={{ base: "center", md: "flex-start" }}
                  alignItems="center"
                  gap={3}
                  maxW="750px"
                >
                  {proj.images.map((img, i) => (
                    <Box
                      key={i}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      maxH="200px"
                      flex="1 1 auto"
                    >
                      <Image
                        src={img}
                        alt={`${proj.name} screenshot ${i + 1}`}
                        maxH="200px"
                        objectFit="contain"
                        borderRadius="md"
                        boxShadow="md"
                      />
                    </Box>
                  ))}
                </Box>
              )}

              <Box flex="1">
                <Text
                  color={projectColor}
                  fontWeight="bold"
                  fontSize="3xl"
                  mb={1}
                >
                  {proj.name}
                </Text>

                <Text
                  fontStyle="italic"
                  color={useColorModeValue("gray.600", "gray.400")}
                  fontSize="lg"
                  mb={3}
                >
                  {proj.year}
                </Text>

                <Text mb={4} color={descColor} fontSize="xl">
                  {proj.desc}
                </Text>

                <Text
                  mb={3}
                  fontWeight="bold"
                  color={useColorModeValue("#2d3748", "#c9caceff")}
                >
                  Technology used: {proj.tech && proj.tech.join(", ")}
                </Text>

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
                  ) : proj.name === "Parkinson MobileNet Comparison" ||
                    "Extractive Indonesian News Text Summarization using DistilBERT, IndoBERT, MBERT, and RoBERTa" ? (
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
