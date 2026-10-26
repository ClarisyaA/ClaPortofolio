import {
  SiAlpinedotjs,
  SiArduino,
  SiCodeigniter,
  SiCplusplus,
  SiFigma,
  SiGit,
  SiGithub,
  SiGooglecolab,
  SiJavascript,
  SiJupyter,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiNumpy,
  SiOpenai,
  SiOpencv,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiStreamlit,
  SiSupabase,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";
import { BarChart3, Bot, BrainCircuit, ChartNoAxesCombined, Code2, DatabaseZap } from "lucide-react";
import { crochetProjects } from "./projects";

export const profile = {
  firstName: "Clarisya",
  lastName: "Adeline",
  email: "adelineclarisya@gmail.com",
  phone: "+62 838 0774 3555",
  whatsapp: "https://wa.me/6283807743555",
  location: "Jatinangor, Sumedang, West Java",
  university: "Informatics Engineering, Universitas Padjadjaran",
  cvUrl: "https://drive.google.com/file/d/1Mh-4ENh8hiOMmuFxXW_eGspV4ATJPLdI/view?usp=sharing",
  github: "https://github.com/ClarisyaA",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/clarisyaadeline/" },
    { label: "Instagram", href: "https://www.instagram.com/clarisyaadeline/" },
    { label: "GitHub", href: "https://github.com/ClarisyaA" },
    { label: "WhatsApp", href: "https://wa.me/6283807743555" },
  ],
};

export const roles = ["AI products", "computer vision systems", "ML models", "data dashboards", "web apps"];

export const aboutStatement =
  "I'm an Informatics student at Universitas Padjadjaran who turns data, AI, and web ideas into useful products. I build computer vision systems, machine learning models, and responsive web apps — and I love pairing technical execution with communication, teamwork, and product thinking.";

export const focusAreas = [
  {
    title: "AI & Computer Vision",
    description:
      "Building real-time intelligent systems with OpenCV, MediaPipe, pose estimation, video processing, and robotics integration.",
  },
  {
    title: "Data Science",
    description:
      "Developing predictive models, segmentation workflows, dashboards, and interpretable analysis with Python, XGBoost, PCA, and K-Means.",
  },
  {
    title: "Web Development",
    description:
      "Creating responsive web applications with React, Next.js, Laravel Blade, Tailwind CSS, Supabase, Prisma, and API integrations.",
  },
  {
    title: "Leadership & Product",
    description:
      "Leading partnerships, fundraising, project execution, and cross-functional teams across campus organizations and technology programs.",
  },
];

export const stats = [
  { value: 90, suffix: "+", label: "students taught as a lab TA" },
  { value: 100, suffix: "+", label: "crochet orders fulfilled" },
  { value: 1400, suffix: "+", label: "applicants — I was 1 of 50 BCA Youth Ambassadors" },
  { value: 300, suffix: "K+", label: "loan applicants modeled with XGBoost" },
];

export const skillGroups = ["All", "Languages", "Web", "Data & AI", "Tools"];

export const skills = [
  { name: "Python", icon: SiPython, group: "Languages" },
  { name: "JavaScript", icon: SiJavascript, group: "Languages" },
  { name: "C++", icon: SiCplusplus, group: "Languages" },
  { name: "SQL", icon: DatabaseZap, group: "Languages" },
  { name: "React", icon: SiReact, group: "Web" },
  { name: "Next.js", icon: SiNextdotjs, group: "Web" },
  { name: "Laravel", icon: SiLaravel, group: "Web" },
  { name: "CodeIgniter 4", icon: SiCodeigniter, group: "Web" },
  { name: "Tailwind CSS", icon: SiTailwindcss, group: "Web" },
  { name: "Alpine.js", icon: SiAlpinedotjs, group: "Web" },
  { name: "Supabase", icon: SiSupabase, group: "Web" },
  { name: "MySQL", icon: SiMysql, group: "Web" },
  { name: "PostgreSQL", icon: SiPostgresql, group: "Web" },
  { name: "Streamlit", icon: SiStreamlit, group: "Data & AI" },
  { name: "Pandas", icon: SiPandas, group: "Data & AI" },
  { name: "NumPy", icon: SiNumpy, group: "Data & AI" },
  { name: "Scikit-learn", icon: SiScikitlearn, group: "Data & AI" },
  { name: "XGBoost", icon: ChartNoAxesCombined, group: "Data & AI" },
  { name: "RAG", icon: SiOpenai, group: "Data & AI" },
  { name: "OpenCV", icon: SiOpencv, group: "Data & AI" },
  { name: "MediaPipe", icon: BrainCircuit, group: "Data & AI" },
  { name: "Pose Estimation", icon: Bot, group: "Data & AI" },
  { name: "PySerial", icon: SiArduino, group: "Tools" },
  { name: "Git", icon: SiGit, group: "Tools" },
  { name: "GitHub", icon: SiGithub, group: "Tools" },
  { name: "Jupyter", icon: SiJupyter, group: "Tools" },
  { name: "Google Colab", icon: SiGooglecolab, group: "Tools" },
  { name: "VS Code", icon: Code2, group: "Tools" },
  { name: "Power BI", icon: BarChart3, group: "Tools" },
  { name: "Figma", icon: SiFigma, group: "Tools" },
  { name: "Vercel", icon: SiVercel, group: "Tools" },
];

/** Facts for the swipe deck — every one of them comes from the portfolio data. */
export const funFacts = [
  {
    image: "/projects/Rajut/Nemo.webp",
    title: `I've crocheted ${crochetProjects.length}+ characters`,
    body: "From Nemo and Dory to Kurama, Miffy and even a Frank Ocean doll.",
  },
  {
    image: "/projects/experiences/claviacrochet/crochet.webp",
    title: "My crochet shop has 100+ orders",
    body: "I founded ClaviaCrochet in 2023 and design my own patterns between classes.",
  },
  {
    image: "/projects/experiences/BYA/BYA1.webp",
    title: "1 of 50 out of 1,400+",
    body: "Selected as a BCA Youth Ambassador 2.0 to promote financial literacy.",
  },
  {
    image: "/projects/RobotWasit.webp",
    title: "I built a robot referee",
    body: "Robot Wasit tracks body landmarks, detects hits and moves an Arduino robot in real time.",
  },
  {
    image: "/projects/experiences/bemf/minor.webp",
    title: "I've taught 90+ students",
    body: "As a Numerical Methods lab TA — the class averaged 86.45% with an 89.5% pass rate.",
  },
  {
    image: "/projects/experiences/boobrown/boo.webp",
    title: "Before code, I sold food",
    body: "My first business, Boobrown, won 3rd place at the Jakbee Business Plan Competition.",
  },
  {
    image: "/projects/experiences/HomeCredit/HomeCredit.svg",
    title: "300K+ rows, one model",
    body: "I predicted credit default risk with XGBoost + SHAP during my Home Credit virtual internship.",
  },
  {
    image: "/projects/foto/sunrise2.webp",
    title: "I chase sunrises",
    body: "Photography is my reset button — rice fields, forests and my hometown.",
  },
];

/** Two truths & a lie. The lies are contradicted by the portfolio itself. */
export const truthRounds = [
  {
    statements: [
      { text: "I've crocheted Nemo, Dory and a catfish.", truth: true },
      { text: "I've never crocheted a single fish.", truth: false },
      { text: "I run a crochet business called ClaviaCrochet.", truth: true },
    ],
    reveal: "Fish are basically my specialty — Catfish, Nemo and Dory are all in the gallery.",
  },
  {
    statements: [
      { text: "I built a referee robot with computer vision.", truth: true },
      { text: "I taught 90+ students as a lab teaching assistant.", truth: true },
      { text: "I've never written a line of Python.", truth: false },
    ],
    reveal: "Python is my daily driver — OpenCV, MediaPipe, Pandas, XGBoost, Streamlit…",
  },
  {
    statements: [
      { text: "I study Medicine at Universitas Padjadjaran.", truth: false },
      { text: "I was selected as a BCA Youth Ambassador.", truth: true },
      { text: "I led External Affairs for Informatics Festival 2025.", truth: true },
    ],
    reveal: "I'm an Informatics Engineering student — no scalpels, only keyboards.",
  },
  {
    statements: [
      { text: "My first business sold food products.", truth: true },
      { text: "I organized company visits to Bank Indonesia and KPMG.", truth: true },
      { text: "I've never organized an event.", truth: false },
    ],
    reveal: "Events are my thing — ICOMPAS visits, webinars with 130+ attendees, and more.",
  },
];
