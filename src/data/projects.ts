export type ProjectLinkKind =
  | "github"
  | "youtube"
  | "drive"
  | "paper"
  | "figma"
  | "pdf"
  | "external";

export type ProjectLink = {
  label: string;
  href: string;
  kind: ProjectLinkKind;
};

export type Project = {
  id: string;
  name: string;
  year: string;
  category: string;
  tagline: string;
  description: string;
  tech: string[];
  links: ProjectLink[];
  images: string[];
  pdf?: string;
};

export const projects: Project[] = [
  {
    id: "illegal-parking",
    name: "Illegal Parking Detection System",
    year: "2026",
    category: "Computer Vision",
    tagline: "Real-time violation detection with alerts and monitoring.",
    description:
      "An AI-powered illegal parking detection system for pre-thesis research at BINUS University. The system combines computer vision, real-time tracking, and an interactive monitoring dashboard to detect vehicles parked in restricted areas and generate automated alerts. My contribution includes training the YOLOv8 warning triangle model, debugging multi-model integration, and assisting the technical documentation.",
    tech: ["Python", "React", "WebSocket", "Edge-TTS", "Google Colab"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Dard1ka/Ai-Ilegal-Parking",
        kind: "github",
      },
    ],
    images: ["/i_parking1.jpeg", "/i_parking2.jpeg"],
  },
  {
    id: "number-memory-ai",
    name: "Number Memory AI",
    year: "2026",
    category: "AI Game",
    tagline: "Speech-to-text number memory practice for pronunciation.",
    description:
      "An AI-powered game that combines number memory challenges with speech-to-text to improve English number pronunciation and memory skills. Players memorize number sequences and recite them through voice input while the system evaluates responses in real time using a fine-tuned recognition model. I contributed to the UI, ideation, system flow, game rules, and debugging.",
    tech: ["Python", "HTML", "CSS", "JavaScript", "Speech-to-Text"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Dard1ka/NumberMemoryAi",
        kind: "github",
      },
      {
        label: "Demo",
        href: "https://www.youtube.com/shorts/Lww2MENCgiA",
        kind: "youtube",
      },
      {
        label: "Explanation",
        href: "https://youtube.com/shorts/LP5iHFPy7QI?si=yOy4Iy9BK7MaSvYf",
        kind: "youtube",
      },
    ],
    images: ["/num_mem1.jpeg", "/num_mem2.jpeg"],
  },
  {
    id: "fortunas-ai",
    name: "Fortunas AI",
    year: "2026",
    category: "AI Product",
    tagline: "Intelligent workflow application for business analysis.",
    description:
      "Fortunas AI is an AI-powered workflow application concept built around a clean user experience for business analysis. It combines automation, prediction-oriented assistance, and an interactive surface that helps users move from raw business context to clearer decisions.",
    tech: ["Python", "FastAPI", "React", "BigQuery", "Ollama", "ChromaDB"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Dard1ka/fortunas-ai",
        kind: "github",
      },
      {
        label: "Demo",
        href: "https://www.youtube.com/watch?v=wWKt6JIUQpg&feature=youtu.be",
        kind: "youtube",
      },
      {
        label: "Presentation",
        href: "/fortunasAI.pdf",
        kind: "pdf",
      },
    ],
    images: ["/fortunasAI_1.png"],
    pdf: "/fortunasAI.pdf",
  },
  {
    id: "itcs",
    name: "Intelligent Traffic Control System",
    year: "2025",
    category: "Computer Vision + IoT",
    tagline: "Adaptive traffic light timing with detection and fuzzy logic.",
    description:
      "An AI-based adaptive traffic light optimization system that uses vehicle detection, PCU calculation, and fuzzy logic to dynamically adjust signal durations. The system integrates computer vision models with a FastAPI backend, a React monitoring dashboard, and IoT microcontrollers for real-time traffic light control. I trained YOLO models for vehicle detection and developed the web dashboard.",
    tech: ["Python", "React", "IoT Microcontroller", "Fuzzy Logic"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Dard1ka/ITCS_Concept_React_IOT_FASTAPI/",
        kind: "github",
      },
      {
        label: "Demo",
        href: "https://www.youtube.com/watch?v=WSv8LOs6RgM",
        kind: "youtube",
      },
      {
        label: "Presentation",
        href: "/itcs.pdf",
        kind: "pdf",
      },
    ],
    images: ["/itcs1.jpeg", "/itcs2.jpeg"],
    pdf: "/itcs.pdf",
  },
  {
    id: "super-resolution",
    name: "Image Super-Resolution",
    year: "2025",
    category: "Deep Learning",
    tagline: "SRResNet vs ESRGAN-Lite for 4x image upscaling.",
    description:
      "A deep learning image super-resolution project comparing SRResNet and ESRGAN-Lite architectures for 4x image upscaling. The work focuses on the trade-off between reconstruction accuracy and perceptual image quality using the DIV2K dataset. I contributed to dataset preparation, training both models, and supporting the research report and evaluation analysis.",
    tech: ["Python", "SRResNet", "ESRGAN-Lite", "Streamlit", "Google Colab"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/yongkytristan/Image_UpScaller",
        kind: "github",
      },
      {
        label: "Drive",
        href: "https://drive.google.com/file/d/1DczKoSFMnDvccMWdwGZAPiS22ob5pJac/view?usp=sharing",
        kind: "drive",
      },
    ],
    images: ["/upscaler1.png", "/upscaler2.png"],
  },
  {
    id: "parkinson-mobilenet",
    name: "Parkinson MobileNet Comparison",
    year: "2025",
    category: "Research",
    tagline: "MobileNet experiments for spiral and wave image detection.",
    description:
      "A Parkinson's detection experiment using spiral and wave images with lightweight deep learning models. The project compares MobileNetV2, custom MobileNetV2, and MobileNetV3-Small to evaluate accuracy, computational efficiency, and potential mobile or edge deployment. I focused on paper writing for Gemastik 2025 and analyzing model results.",
    tech: ["Python", "Google Colab", "Microsoft Word"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Dard1ka/parkinson-mobilenet-comparison",
        kind: "github",
      },
      {
        label: "Drive",
        href: "https://drive.google.com/drive/folders/1Lw_GlFaKSJvVzCAnZ1VRVMkrDOx8T4jq?usp=sharing",
        kind: "drive",
      },
    ],
    images: ["/spiral.jpg", "/wave.jpg"],
  },
  {
    id: "indonesian-news-summarization",
    name: "Indonesian News Text Summarization",
    year: "2025",
    category: "NLP Research",
    tagline: "Transformer-based extractive summarization benchmark.",
    description:
      "A research paper on extractive summarization of Indonesian news articles, comparing DistilBERT, IndoBERT, mBERT, and RoBERTa using ROUGE metrics. I trained the DistilBERT and RoBERTa models, contributed to the introduction and methodology sections, and handled part of the citation work.",
    tech: ["Python", "Google Colab", "Mendeley", "Microsoft Excel"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/migz177/ResearchMethod_Summarize",
        kind: "github",
      },
      {
        label: "Paper",
        href: "https://doi.org/10.1016/j.procs.2025.09.050",
        kind: "paper",
      },
    ],
    images: ["/research.png"],
  },
  {
    id: "churn-prediction",
    name: "Churn Prediction",
    year: "2025",
    category: "Machine Learning",
    tagline: "Android churn prediction app with bagging classifiers.",
    description:
      "An Android application that predicts whether a customer will churn based on customer data input. I focused on training traditional machine learning models and found that bagging classifiers performed best for the dataset, reaching around 0.89 to 0.90 accuracy across several training trials before being used in the application.",
    tech: ["Python", "Kaggle", "Google Colab", "Android Studio", "ONNX Runtime"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Dard1ka/ChurnPredictionApp",
        kind: "github",
      },
      {
        label: "Notebook",
        href: "https://colab.research.google.com/drive/1djGjgmFlPxcZqVYv8r3XV5Bs0QjCcJne",
        kind: "external",
      },
    ],
    images: ["/churn.jpg", "/churn_main.jpg", "/churn_second.jpg"],
  },
  {
    id: "chatbot-university",
    name: "Chatbot University",
    year: "2025",
    category: "NLP",
    tagline: "BERT intent classification chatbot for university support.",
    description:
      "A chatbot using a BERT model with intent classification and a Kaggle-based dataset. The chatbot provides relevant university information responses and includes fallback handling when user input is unclear. It serves as a simple interactive tool to improve access to student support information.",
    tech: ["Python", "BERT", "Google Colab", "Kaggle"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/migz177/chatbot-bert",
        kind: "github",
      },
    ],
    images: ["/chatbot_train.png", "/chatbot.png"],
  },
  {
    id: "kostlife",
    name: "KostLife",
    year: "2025",
    category: "Mobile App",
    tagline: "Student life planning and personal finance companion.",
    description:
      "A mobile app that helps students plan daily activities and manage personal finances. The project uses React Native Expo for the frontend and Next.js with Prisma for the backend. I contributed to the collaborative product development workflow, UI design review, and implementation support.",
    tech: ["React Native", "Next.js", "Prisma", "Supabase", "Figma", "Expo"],
    links: [
      {
        label: "Frontend",
        href: "https://github.com/JasonEvan/kostlife-frontend",
        kind: "github",
      },
      {
        label: "Backend",
        href: "https://github.com/JasonEvan/kostlife-backend",
        kind: "github",
      },
      {
        label: "UI Design",
        href: "https://www.figma.com/design/rxEjv3IvQ6xUURmfw9PJyS/SE-AOL?node-id=0-1&t=pcARrbGplrsreGy9-1",
        kind: "figma",
      },
    ],
    images: ["/kostlife1.png", "/kostlife2.png", "/kostlife3.png"],
  },
  {
    id: "waste-detector",
    name: "Waste Detector",
    year: "2025",
    category: "Computer Vision",
    tagline: "Waste image classification with Streamlit and Android.",
    description:
      "A Streamlit app and Android app that detect and categorize waste images using a VGG16 model trained on a Kaggle dataset. I trained the VGG16 model, designed the Streamlit experience, evaluated model results, and created a mobile version using Android Studio.",
    tech: ["Python", "Google Colab", "Kaggle", "Streamlit", "Android Studio"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Mis-291205/AoL-MachineLearning",
        kind: "github",
      },
    ],
    images: ["/waste.png", "/waste2.jpg"],
  },
  {
    id: "deepfake-detector",
    name: "Deepfake Detector",
    year: "2024",
    category: "Computer Vision",
    tagline: "Deepfake image detection using a VGG16 model.",
    description:
      "A Streamlit app and Android app that detect deepfake images using a VGG16 model trained with a Kaggle dataset. I trained the VGG16 model and created the mobile version in Android Studio.",
    tech: ["Python", "Google Colab", "Kaggle", "Streamlit", "Android Studio"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Mis-291205/AoL-AI_VGG16",
        kind: "github",
      },
    ],
    images: ["/deepfake.png", "/deepfake2.jpg"],
  },
  {
    id: "computer-network",
    name: "Computer Network",
    year: "2024",
    category: "Network Design",
    tagline: "Three-floor network simulation in Cisco Packet Tracer.",
    description:
      "A network circuit design simulation for a three-floor building. The project covers devices, media types, media length, IP addressing, subnetting, routing, and application-layer planning using Cisco Packet Tracer.",
    tech: ["Cisco Packet Tracer"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Mis-291205/AoL-ComputerNetwork",
        kind: "github",
      },
    ],
    images: ["/compnet1.png", "/compnet2.png"],
  },
  {
    id: "data-structure",
    name: "Data Structure",
    year: "2024",
    category: "C Programming",
    tagline: "Trie-based slang dictionary written in C.",
    description:
      "A C program that implements a slang dictionary called Boogle using a Trie data structure. Users can release new slang words with descriptions, search for words, view words by prefix, and display all stored words.",
    tech: ["C", "Dev C++", "Trie"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Mis-291205/AOL_DataStructure",
        kind: "github",
      },
    ],
    images: ["/ds2.png", "/ds1.png"],
  },
  {
    id: "cateringz",
    name: "CAteriNgz",
    year: "2024",
    category: "Web Development",
    tagline: "Simple catering website with ordering and auth flows.",
    description:
      "A simple web development project focused on selling cuisine for catering. It uses HTML, CSS, and JavaScript across eight pages, with JavaScript handling order calculation, total price, login, and registration logic.",
    tech: ["Figma", "HTML", "CSS", "JavaScript"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Mis-291205/AoL_HCI",
        kind: "github",
      },
    ],
    images: ["/cateringz.png"],
  },
  {
    id: "algorithm-programming",
    name: "Algorithm and Programming",
    year: "2023",
    category: "C Programming",
    tagline: "CSV-based housing data management system.",
    description:
      "A menu-driven C program for managing a CSV file containing housing information. The program provides display, search, sort, and export features, and keeps running until the user exits through the menu.",
    tech: ["C", "Dev C++", "CSV"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Mis-291205/AOL_AlgorithmAndProgramming",
        kind: "github",
      },
    ],
    images: ["/alprog1.png", "/alprog2.png"],
  },
];
