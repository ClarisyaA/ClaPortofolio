import { useState, useEffect, useCallback } from "react";
import { ExternalLink, Calendar, MapPin, Award, ChevronLeft, ChevronRight, X } from "lucide-react";
import { SkeletonImage } from "@/components/SkeletonImage";

const tabs = [
  { id: "full", label: "Full Experience" },
  { id: "work", label: "Experience" },
  { id: "org", label: "Organizational" },
  { id: "volunteer", label: "Volunteer" },
];

const experiences = {
  work: [
    {
      title: "BCA Youth Ambassador (BYA) 2.0",
      place: "Bank Central Asia (BCA)",
      date: "April 2026 - Present",
      description:
        "Selected as 1 of 50 participants out of 1,400+ applicants to represent students in promoting financial literacy and digital banking awareness.",
      images: ["/projects/experiences/BYA/BYA1.jpeg"],
      type: "Leadership",
    },
    {
      title: "Data Scientist Cohort",
      place: "Coding Camp powered by DBS Foundation",
      date: "Feb 2026 - Present",
      description:
        "Participating in intensive data science training covering machine learning, data analysis, preprocessing, modeling, and evaluation. Selected as Project Manager for the capstone project.",
      images: [
        "/projects/experiences/DBS_Dicoding/Capstone-CDC22.jpg",
        "/projects/experiences/DBS_Dicoding/CapstoneGroup.jpg",
      ],
      type: "Data Science",
    },
    {
      title: "Project-Based Virtual Intern - Data Scientist",
      place: "Home Credit Indonesia x Rakamin Academy",
      date: "Dec 2025",
      description:
        "Developed a credit risk prediction model using XGBoost, including data preprocessing, feature engineering, model evaluation, SHAP analysis, and financial data analysis.",
      images: ["/projects/experiences/HomeCredit/HomeCredit.svg"],
      type: "Data Science",
    },
    {
      title: "Laboratory Teaching Assistant - Numerical Methods",
      place: "Padjadjaran University",
      date: "Aug 2025 - Dec 2025",
      description:
        "Taught 90+ students Excel modeling and Python automation, evaluated assignments, and helped the class achieve an 86.45% average score and 89.5% pass rate.",
      images: ["/projects/experiences/bemf/minor.jpg"],
      type: "Academic",
    },
    {
      title: "Teaching Assistant – Computer Organization and Architecture",
      place: "Padjadjaran University",
      date: "March 2025 – June 2025",
      description:
        "Facilitated hands-on sessions for 40+ students, graded assignments and final projects, and supported academic growth via consultations and reviews.",
      images: ["/projects/experiences/bemf/Sertifikat.jpg"],
      type: "Academic",
    },
    {
      title: "Founder",
      place: "ClaviaCrochet",
      date: "May 2023 – Present",
      description:
        "Launched handmade crochet business, designed original patterns, promoted on social media, and fulfilled 100+ orders while managing academics.",
      images: ["/projects/experiences/claviacrochet/crochet.png"],
      type: "Entrepreneurship",
    },
    {
      title: "Founder",
      place: "Boobrown",
      date: "July 2022 – June 2023",
      description:
        "Developed food products, led operations, and won 3rd place in Jakbee Business Plan Competition by Baznas.",
      images: ["/projects/experiences/boobrown/boo.jpg"],
      type: "Entrepreneurship",
    },
  ],
  org: [
    {
      title: "Head of External Affairs",
      place: "Informatics Festival 2025 x Himatif",
      date: "June 2025 – Oct 2025",
      description:
        "Led Sponsorship, PR, and Marketing divisions. Managed MoUs, partnerships, and external communications.",
      images: ["/projects/experiences/IFEST/external.png"],
      type: "Leadership",
    },
    {
      title: "Head of Fundraising Department",
      place: "LPM Warta Kema UNPAD",
      date: "March 2025 – Dec 2025",
      description:
        "Handled proposal, ID card production, social media for Warung Kema, and secured sponsors for fundraising campaigns.",
      images: ["/projects/experiences/WartaKema/warkem.png"],
      type: "Leadership",
    },
    {
      title: "Project Officer - ICOMPAS 2025",
      place: "Bank Indonesia and Indosat Ooredoo Hutchison",
      date: "2025",
      description:
        "Successfully led a company visit program for the 2023 Informatics cohort across two major companies, coordinating event planning, stakeholder communication, participant flow, and on-site execution for 78+ participants.",
      images: [
        "/projects/experiences/PoIcompass12025/BankIndo.jpg",
        "/projects/experiences/PoIcompass12025/Indosat.jpg",
      ],
      type: "Project Management",
    },
    {
      title: "Vice Project Officer - ICOMPAS 2 2025",
      place: "KPMG Indonesia",
      date: "2025",
      description:
        "Supported the end-to-end execution of a professional company visit to KPMG Indonesia, aligning internal teams, coordinating participant readiness, and helping deliver a structured career exposure program for 75+ participants.",
      images: ["/projects/experiences/VPOIcompas2_2025/KPMG.jpg"],
      type: "Project Management",
    },
    {
      title: "Project Officer – ICOMPAS 2 2024",
      place: "Career Development Dept. Himatif",
      date: "October 2024",
      description:
        "Planned & hosted online career webinar with Traveloka in 7 days, attended by 130+ participants.",
      images: ["/projects/experiences/keprof/ICOMPAS2.jpg"],
      type: "Project Management",
    },
    {
      title: "Vice Project Officer – ICOMPAS 1 2024",
      place: "Career Development Dept. Himatif",
      date: "September 2024",
      description:
        "Coordinated team ops, worked with BCA Foresta BSD for company visit of 70 participants.",
      images: ["/projects/experiences/keprof/ICOMPAS1.jpg"],
      type: "Project Management",
    },
    {
    title: "Staff – Career Development Department",
    place: "HIMATIF FMIPA Unpad",
    date: "Feb 2024 – Dec 2025",
    description:
      "Coordinated ICOMPAS company visit to BCA with 70+ participants and led ICOMPAS 2 webinar with Traveloka, reaching 130+ attendees in 7 days.",
    images: [
      "/projects/experiences/keprof/HGD2.jpg",
      "/projects/experiences/keprof/Keprof23.jpg",
      "/projects/experiences/keprof/IFFD2024.jpg"
    ],
    type: "Project Management",
    },
    {
      title: "Staff – Kakak Asuh/Mentor Division",
      place: "Character Building Season 2024",
      date: "Aug 2024 – Oct 2024",
      description:
        "Mentored 8 freshmen, introduced academic/campus life, and provided support system.",
      images: Array.from({ length: 24 }, (_, i) => `/projects/experiences/kasuh/${i + 1}.jpg`),
      type: "Mentorship",
    },
    {
    title: "Staff – Human Resource Division",
    place: "Informatics Festival 2024",
    date: "June 2024 – Oct 2024",
    description:
        "Facilitated team bonding, created internal documentation, and supported staff development.",
    images: [
        "/projects/experiences/IFEST/MSDM.jpg",
        "/projects/experiences/IFEST/PR.jpg",
        ...Array.from({ length: 7 }, (_, i) => `/projects/experiences/IFEST/${i + 1}.jpg`)
    ],
    type: "Team Member",
    },
    {
      title: "Head of Economics Speaker Division",
      place: "LOGYTER 2023",
      date: "October 2023",
      description:
        "Led 6 members, focused on MSME digitalization using Google Maps, and gave training to MSME owners.",
      images: Array.from({ length: 6 }, (_, i) => `/projects/experiences/logyter/${i + 1}.jpg`),
      type: "Leadership",
    },
    {
      title: "Head of Fundraising Division",
      place: "Mubes X HIMATIF",
      date: "Nov 2023 – Dec 2023",
      description:
        "Led fundraising team and achieved 200% profit from initial capital through effective strategy.",
      images: ["/projects/experiences/mubes/1.jpg"],
      type: "Leadership",
    },
  ],
  volunteer: [
    {
      title: "Volunteer Community Officer",
      place: "I Am Okay",
      date: "Aug 2023 – Jan 2024",
      description: "Collaborated with Jakarta schools for mental health programs and workshops.",
      images: ["/projects/experiences/iamokay/iam.png", "/projects/experiences/iamokay/bonding.jpg", "/projects/experiences/iamokay/sertifikat.jpg"],
      type: "Community Service",
    },
    {
      title: "Liaison Officer",
      place: "Market Town 2023",
      date: "Oct 2023 – Dec 2023",
      description: "Assisted finalist teams, coordinated with committee for smooth competition experience.",
      images: ["/projects/experiences/markettown/PR.jpg", "/projects/experiences/markettown/dokum.jpg", "/projects/experiences/markettown/sertifikat.jpg"],
      type: "Community Service",
    }
  ],
};

const monthRank = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
};

const getTimelineSortValue = (date = "") => {
  if (date.toLowerCase().includes("present")) return 999999;

  const yearMatches = [...date.matchAll(/\b(20\d{2})\b/g)];
  const lastYear = Number(yearMatches.at(-1)?.[1] || 0);
  const lowerDate = date.toLowerCase();
  const monthMatches = Object.keys(monthRank).filter((month) =>
    lowerDate.includes(month)
  );
  const lastMonth = monthMatches.length ? monthRank[monthMatches.at(-1)] : 12;

  return lastYear * 100 + lastMonth;
};

const timelineExperiences = [
  ...experiences.work.map((experience) => ({ ...experience, category: "Experience" })),
  ...experiences.org.map((experience) => ({ ...experience, category: "Organizational" })),
  ...experiences.volunteer.map((experience) => ({ ...experience, category: "Volunteer" })),
].sort((a, b) => getTimelineSortValue(b.date) - getTimelineSortValue(a.date));

const certifications = [
  {
    title: "Understanding Augmented and Virtual Reality",
    image: "/projects/certifications/ARVR.png",
    url: "/projects/certifications/CertificateOfCompletion_Understanding Augmented and Virtual Reality An Introduction (2).pdf",
    issuer: "LinkedIn Learning",
    year: "2026",
  },
  {
    title: "Agile Software Development",
    image: "/projects/certifications/Agile.png",
    url: "/projects/certifications/CertificateOfCompletion_Agile Software Development (3).pdf",
    issuer: "LinkedIn Learning",
    year: "2026",
  },
  {
    title: "Home Credit Indonesia - Project-Based Virtual Internship",
    image: "/projects/certifications/HomeCredit.png",
    url: "/projects/certifications/pbi-certificate-361218IAPCGIH29122025 (1).pdf",
    issuer: "Home Credit Indonesia x Rakamin Academy",
    year: "2025",
  },
  {
    title: "Google Cloud Arcade Facilitator 2025",
    image: "/projects/certifications/GoogleCloud.png",
    url: "/projects/certifications/google-cloud-arcade-fasilitator-2025-program-overview-deep-dive-certificate.pdf",
    issuer: "Google Cloud",
    year: "2025",
  },
  {
    title: "Tech Ethics - LinkedIn Learning",
    image: "/projects/certifications/Tech.jpg",
    url: "/projects/certifications/CertificateOfCompletion_Tech Ethics Avoiding Unintended Consequences.pdf",
    issuer: "LinkedIn Learning",
    year: "2025",
  },
  
  {
    title: "Programming Foundations - Software Testing/QA",
    image: "/projects/certifications/Testing.png",
    url: "/projects/certifications/CertificateOfCompletion_Programming Foundations Software TestingQA.pdf",
    issuer: "LinkedIn Learning",
    year: "2025",
  },
  {
    title: ".NET UI Big Picture - Desktop, ASP.NET, and Cross-Platform",
    image: "/projects/certifications/NET.png",
    url: "/projects/certifications/CertificateOfCompletion_.NET UI Big Picture Desktop ASP.NET and CrossPlatform (1).pdf",
    issuer: "LinkedIn Learning",
    year: "2025",
  },
  {
    title: "Academic Research Foundations - Quantitative",
    image: "/projects/certifications/AcademicResearch.png",
    url: "/projects/certifications/CertificateOfCompletion_Academic Research Foundations Quantitative.pdf",
    issuer: "LinkedIn Learning",
    year: "2025",
  },
  
  {
    title: "BNSP Sertifikasi Junior Web Developer",
    image: "/projects/certifications/BNSP-1.png",
    url: "/projects/certifications/BNSP.pdf",
    issuer: "BNSP",
    year: "2023",
  },
  {
    title: "VSGA Digital Talent - Junior Web Developer",
    image: "/projects/certifications/Digi-1.png",
    url: "/projects/certifications/Digi.pdf",
    issuer: "Kominfo",
    year: "2023",
  },
];

const typeColors = {
  "Academic": { color: "#0c4a6e", border: "#7dd3fc", darkColor: "#93c5fd", darkBorder: "#1e40af" },
  "Data Science": { color: "#1e1b4b", border: "#93c5fd", darkColor: "#a5b4fc", darkBorder: "#3730a3" },
  "Entrepreneurship": { color: "#064e3b", border: "#6ee7b7", darkColor: "#86efac", darkBorder: "#166534" },
  "Leadership": { color: "#4a044e", border: "#f0abfc", darkColor: "#d8b4fe", darkBorder: "#6b21a8" },
  "Project Management": { color: "#78350f", border: "#fcd34d", darkColor: "#fdba74", darkBorder: "#9a3412" },
  "Team Member": { color: "#164e63", border: "#67e8f9", darkColor: "#67e8f9", darkBorder: "#155e75" },
  "Mentorship": { color: "#881337", border: "#fda4af", darkColor: "#f9a8d4", darkBorder: "#9d174d" },
  "Community Service": { color: "#713f12", border: "#fde047", darkColor: "#fde047", darkBorder: "#854d0e" },
};

const getTypeStyle = (type) => {
  const colors = typeColors[type] || {
    color: "#0f172a",
    border: "#cbd5e1",
    darkColor: "#d1d5db",
    darkBorder: "#4b5563",
  };

  return {
    "--badge-color": colors.color,
    "--badge-border": colors.border,
    "--badge-dark-color": colors.darkColor,
    "--badge-dark-border": colors.darkBorder,
  };
};

// Image Gallery Component
const ImageGallery = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return null;

  const activeImage = images[currentIndex] || images[0];

  return (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        {/* Main Image Container */}
        <div className="aspect-video w-full">
          <SkeletonImage
            src={activeImage}
            alt={`Gallery image ${currentIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer transition-all duration-500 hover:scale-105"
            onClick={() => onImageClick(images, currentIndex)}
            onError={() => "/projects/seluna.png"}
          />
        </div>
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Indicators for small collections */}
        {images.length > 1 && images.length <= 10 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Strip - Only show for reasonable number of images */}
      {images.length > 1 && images.length <= 8 && (
        <div className="mt-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'border-blue-500 ring-2 ring-blue-500/30' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <SkeletonImage
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid View for Large Collections */}
      {images.length > 8 && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {images.length} photos available
            </p>
            <button
              onClick={() => onImageClick(images, currentIndex)}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
            >
              View all →
            </button>
          </div>
          
          {/* Preview Grid */}
          <div className="grid grid-cols-6 gap-2">
            {images.slice(0, 6).map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  onImageClick(images, idx);
                }}
                className="aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all duration-300 group"
              >
                <SkeletonImage
                  src={img}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Image Modal Component
const ImageModal = ({ images, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    setCurrentIndex(Math.min(startIndex, Math.max(images.length - 1, 0)));
  }, [images.length, startIndex]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [nextImage, onClose, prevImage]);

  return (
    <div className="fixed inset-0 overlay-layer bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
     <div className="relative w-full max-w-5xl mx-auto max-h-[84vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-white text-sm font-medium bg-black/30 px-3 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 p-2 bg-black/30 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Main Image */}
        <div className="relative flex-1 flex items-center justify-center">
          <SkeletonImage
            src={images[currentIndex] || images[0]}
            alt={`Full view ${currentIndex + 1}`}
            className="w-full max-w-4xl max-h-[70vh] object-contain rounded-lg shadow-2xl mx-auto"
          />
          
          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 sm:p-3 transition-colors backdrop-blur-sm"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 sm:p-3 transition-colors backdrop-blur-sm"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="mt-4 max-h-20 overflow-hidden">
            <div className="flex gap-2 overflow-x-auto justify-center pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all ${
                    idx === currentIndex 
                      ? 'border-white ring-2 ring-white/50' 
                      : 'border-gray-500 hover:border-gray-300'
                  }`}
                >
                  <SkeletonImage
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FullExperienceTimeline = ({ items, onImageClick }) => {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-primary via-primary/50 to-transparent lg:left-1/2 lg:-translate-x-1/2" />

      <div className="space-y-4 md:space-y-0">
        {items.map((item, index) => {
          const isRight = index % 2 === 1;
          const firstImage = item.images?.[0];

          return (
            <div
              key={`${item.category}-${item.title}-${index}`}
              className="relative grid gap-3 pl-14 lg:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] lg:pl-0"
            >
              <div
                className={`group rounded-2xl border border-slate-200 bg-white/95 p-4 text-left shadow-lg shadow-slate-200/70 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 dark:border-border dark:bg-card dark:shadow-none ${
                  isRight ? "lg:col-start-3" : "lg:col-start-1 lg:row-start-1"
                }`}
              >
                {firstImage && (
                  <button
                    type="button"
                    onClick={() => onImageClick(item.images, 0)}
                    className="mb-4 block aspect-video w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-background"
                    aria-label={`Open ${item.title} image gallery`}
                  >
                    <SkeletonImage
                      src={firstImage}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                )}

                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    {item.category}
                  </span>
                  {item.type && (
                    <span
                      className="experience-badge content-raised rounded-full border px-3 py-1 text-xs font-bold shadow-sm"
                      style={getTypeStyle(item.type)}
                    >
                      {item.type}
                    </span>
                  )}
                </div>

                <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                  <Calendar size={15} />
                  {item.date}
                </p>
                <h3 className="mb-2 text-xl font-bold text-slate-950 transition-colors group-hover:text-primary dark:text-foreground">
                  {item.title}
                </h3>
                <p className="mb-3 flex items-center gap-2 text-sm text-slate-500 dark:text-foreground/60">
                  <MapPin size={15} />
                  {item.place}
                </p>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-foreground/80">
                  {item.description}
                </p>
              </div>

              <div className="absolute left-5 top-6 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-lg shadow-primary/30 lg:static lg:col-start-2 lg:row-start-1 lg:mx-auto lg:mt-8 lg:translate-x-0">
                <span className="h-2.5 w-2.5 rounded-full bg-current" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main Experience Section Component
export const ExperienceSection = () => {
  const [activeTab, setActiveTab] = useState("work");
  const [modalImages, setModalImages] = useState([]);
  const [modalStartIndex, setModalStartIndex] = useState(0);

  const currentExperiences = experiences[activeTab] || [];

  const openModal = useCallback((images, startIndex) => {
    setModalImages(images);
    setModalStartIndex(startIndex);
  }, []);

  const closeModal = useCallback(() => {
    setModalImages([]);
    setModalStartIndex(0);
  }, []);

  return (
    <section className="min-h-screen bg-transparent px-4 md:px-10 lg:px-20 py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary text-glow mb-4">
            Experience & Certifications
          </h2>
          <p className="text-lg text-slate-600 dark:text-foreground/70 max-w-2xl mx-auto">
            A journey through professional growth, leadership roles, and meaningful contributions
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tab Navigation */}
            <div className="mb-8 overflow-x-auto pb-3">
              <div className="mx-auto flex w-max min-w-full justify-start gap-2 sm:justify-center">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group relative min-w-[8.5rem] px-4 sm:px-5 py-3 rounded-2xl text-sm sm:text-base font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 transform scale-105"
                        : "bg-white/90 text-slate-700 hover:bg-primary/10 border border-slate-200 hover:border-primary/50 hover:text-primary hover:shadow-md dark:bg-card dark:text-foreground dark:border-border dark:hover:bg-card/80"
                    }`}
                  >
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Cards */}
            {activeTab === "full" ? (
              <FullExperienceTimeline
                items={timelineExperiences}
                onImageClick={openModal}
              />
            ) : (
              <div className="space-y-8">
                {currentExperiences.length > 0 ? (
                currentExperiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className="group bg-white/95 rounded-2xl shadow-lg shadow-slate-200/70 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden border border-slate-200 hover:border-primary/50 dark:bg-card dark:shadow-none dark:border-border"
                  >
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-950 dark:text-foreground mb-2 group-hover:text-primary transition-colors">
                            {exp.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-slate-500 dark:text-foreground/60 mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              {exp.place}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              {exp.date}
                            </div>
                          </div>
                        </div>
                        {exp.type && (
                          <span
                            className="experience-badge content-raised w-fit px-3 py-1 rounded-full text-xs font-bold border shadow-sm"
                            style={getTypeStyle(exp.type)}
                          >
                            {exp.type}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-700 dark:text-foreground/80 leading-relaxed mb-4">{exp.description}</p>
                      
                      {/* Image Gallery */}
                      {exp.images && exp.images.length > 0 && (
                        <ImageGallery 
                          images={exp.images} 
                          onImageClick={openModal}
                        />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
                    <Heart size={32} className="text-foreground/40" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Coming Soon</h3>
                  <p className="text-foreground/60">This section will be updated with more experiences.</p>
                </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar - Certifications */}
          <aside className="w-full lg:w-96">
            <div className="sticky top-8">
              <div className="bg-white/95 rounded-2xl shadow-lg shadow-slate-200/70 p-4 sm:p-6 border border-slate-200 dark:bg-card dark:shadow-none dark:border-border">
                <div className="flex items-center gap-2 mb-6">
                  <Award className="text-primary" size={24} />
                  <h3 className="text-2xl font-bold text-foreground">Certifications</h3>
                </div>
                <div className="space-y-4">
                  {certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="group bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-primary/50 hover:shadow-md transition-all duration-300 dark:bg-background dark:border-border"
                    >
                      <div className="relative overflow-hidden rounded-lg mb-3">
                        <SkeletonImage
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-foreground">
                          {cert.year}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground text-sm leading-tight">
                          {cert.title}
                        </h4>
                        <p className="text-xs text-foreground/60">{cert.issuer}</p>
                        {cert.url && cert.url !== "#" && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium hover:underline transition-colors"
                          >
                            View Certificate
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Modal */}
      {modalImages.length > 0 && (
        <ImageModal
          images={modalImages}
          startIndex={modalStartIndex}
          onClose={closeModal}
        />
      )}
    </section>
  );
};
