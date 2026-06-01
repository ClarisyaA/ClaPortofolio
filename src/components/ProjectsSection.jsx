import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, GithubIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SkeletonImage } from "@/components/SkeletonImage";


const techProjects = [
    {
        id: "temantumbuh",
        title: "TemanTumbuh - AI Mental Wellness App",
        role: "Front-End Developer",
        description: "AI-powered mental wellness web app with mood check-in, TemanCerita chatbot, insight dashboard, user dashboard, and admin pages.",
        image: "/projects/TemanTumbuh.png",
        tags: ["Next.js", "React", "Tailwind CSS", "Shadcn/ui", "Supabase", "OpenAI API"],
        demoUrl: "https://temantumbuh.vercel.app/",
        githubUrl: "#",
    },
    {
        id: "boreyes-2026",
        title: "BOREYES 2026 International Energy Fair",
        role: "Front-End Developer",
        description: "Responsive event platform with 10+ pages, authentication, admin dashboard, GSAP animations, and Swiper interactions.",
        image: "/projects/Boreyes.png",
        tags: ["Laravel Blade", "Tailwind CSS", "JavaScript", "Alpine.js", "GSAP", "Swiper"],
        demoUrl: "https://boreyes2026.com",
        githubUrl: "#",
    },
    {
        id: "robot-wasit",
        title: "Robot Wasit - Computer Vision Referee Robot",
        role: "Computer Vision Developer",
        description: "Real-time referee system using body landmark tracking, hit detection, scoring UI, health bar, and Arduino robot movement via PySerial.",
        image: "/projects/RobotWasit.jpeg",
        tags: ["Python", "OpenCV", "MediaPipe", "PySerial", "Arduino", "Computer Vision"],
        demoUrl: "https://www.youtube.com/watch?v=itYGWQ5tNTA",
        githubUrl: "#",
    },
    {
        id: "voiceboost-ai",
        title: "VoiceBoost AI - Dysarthria Classification",
        role: "Machine Learning Developer",
        description: "Streamlit machine learning app for speech classification with prediction output and confidence score interpretation.",
        image: "/projects/VoiceBoost.png",
        tags: ["Python", "Streamlit", "Machine Learning", "Scikit-learn", "Audio Processing"],
        demoUrl: "https://clarisyaa-voiceboostai-app-p6afif.streamlit.app/",
        githubUrl: "#",
    },
    {
        id: "tutorai",
        title: "TutorAI - RAG + 3D Avatar Assistant",
        role: "AI & Front-End Developer",
        description: "AI-powered educational assistant with RAG knowledge base preparation, 3D avatar learning interface, speech interaction, and API integration.",
        image: "/projects/TutorAI.jpeg",
        tags: ["React", "JavaScript", "RAG", "API Integration", "3D Avatar", "AI"],
        demoUrl: "https://www.youtube.com/watch?v=pi-Zoll-Ja4&t=710s",
    },
    {
        id: "home-credit-risk",
        title: "Home Credit Default Risk Prediction",
        role: "Data Scientist",
        description: "Credit risk prediction model using XGBoost on 300K+ applicants with feature engineering, SHAP analysis, Power BI dashboard, and approval threshold optimization.",
        image: "/projects/experiences/HomeCredit/HomeCredit.svg",
        tags: ["Python", "XGBoost", "Pandas", "SHAP", "Power BI", "Data Science"],
        demoUrl: "#",
        githubUrl: "https://github.com/ClarisyaA/HomeCredit_DefaultRisk",
    },
    {
        id: "marketsync",
        title: "MarketSync - Marketing Channel DSS",
        role: "Data Analyst",
        description: "Data-driven dashboard for marketing channel optimization using PCA and K-Means clustering for customer segmentation and business insights.",
        image: "/projects/Boo.png",
        tags: ["Streamlit", "Python", "PCA", "K-Means", "Data Visualization", "Analytics"],
        demoUrl: "https://marketsync.streamlit.app/",
        githubUrl: "#",
    },
    {
        id: 1,
        title: "Fam Property",
        role: "Fullstack Developer",
        description: "A PHP & MySQL-based platform for managing real estate listings, transactions, and clients with a user-friendly admin panel.",
        image: "/projects/fam.png",
        tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Web Development"],
        demoUrl: "http://famproperty.id/?i=1.id",
        githubUrl: "#",
    },
    {
        id: 2,
        title: "Kuliner Jatinangor",
        role: "Fullstack Developer",
        description: "A local culinary review site with login system, restaurant listings, user reviews, and dark mode support.",
        image: "/projects/Boo.png",
        tags: ["PHP", "MySQL", "HTML", "CSS", "Web Development"],
        demoUrl: "#",
        githubUrl: "https://github.com/ClarisyaA/KulinerJatinangor",
    },
    {
        id: 3,
        title: "Color Dominant Picker",
        role: "Machine Learning Developer",
        description: "Streamlit app that extracts dominant colors from images using K-Means and displays results in PNG/CSV formats.",
        image: "/projects/colorPalette.png",
        tags: ["Python", "Streamlit", "K-Means Clustering", "Image Processing", "Machine Learning"],
        demoUrl: "https://clacolorpalette.streamlit.app/",
        githubUrl: "https://github.com/ClarisyaA/ColorPalette",
    },
    {
        id: 4,
        title: "Berrywell - Wellness App",
        role: "UI/UX Designer",
        description: "A wellness app prototype that helps users manage weight via health tracking, food scans, and AI-based plans.",
        image: "/projects/berry.png",
        tags: ["UI/UX Design", "Figma", "HealthTech", "Design Thinking", "Mobile App"],
        demoUrl: "https://www.figma.com/proto/Dr5QeHgYn9FwTRWMweAVOk/BerryWell?node-id=631-2602&node-type=CANVAS&t=xBI0bV7ptMBeSsCV-1&scaling=scale-down&content-scaling=fixed&page-id=631%3A2351&starting-point-node-id=631%3A2599&show-proto-sidebar=1",
        githubUrl: "",
    },
    {
        id: 5,
        title: "Seluna - Women's Safety App",
        role: "UI/UX Designer",
        description: "Mobile app prototype offering safe route suggestions for women based on lighting, crowd data, and crime statistics.",
        image: "/projects/seluna.png",
        tags: ["UI/UX Design", "Figma", "Safety Tech", "Crowdsourced Data", "Mobile App"],
        demoUrl: "https://www.figma.com/proto/JvMTFzw8OcdHNpHPlAEOU9/SAFE-ROUTE?node-id=2448-2547&t=TdKibmjOsTDVwU7F-1",
        githubUrl: ""
    },
];

const crochetProjects = [
  {
    id: 1,
    title: "Catfish",
    images: [
      "/projects/Rajut/Catfish1.jpg",
      "/projects/Rajut/Catfish2.jpg"
    ],
    tags: ["Crochet", "Fish"],
    demoUrl: "#",
  },
  {
    id: 2,
    title: "Spiderman",
    images: [
      "/projects/Rajut/Spiderman1.jpg",
      "/projects/Rajut/Spiderman2.jpg"
    ],
    tags: ["Crochet", "Superhero"],
    demoUrl: "#",
  },
  {
    id: 3,
    title: "Basreng",
    images: ["/projects/Rajut/Basreng.jpg"],
    tags: ["Crochet", "Keychain"],
    demoUrl: "#",
  },
  {
    id: 4,
    title: "Baymax Chibi",
    images: ["/projects/Rajut/Baymax Chibi.jpg"],
    tags: ["Crochet", "Character"],
    demoUrl: "#",
  },
  {
    id: 5,
    title: "Bear KeyHolder",
    images: ["/projects/Rajut/Bear KeyHolder.jpg"],
    tags: ["Crochet", "Bear"],
    demoUrl: "#",
  },
  {
    id: 6,
    title: "Bootao - Genshin Impact",
    images: ["/projects/Rajut/Bootao - Genshin Impact.jpg"],
    tags: ["Crochet", "Genshin"],
    demoUrl: "#",
  },
  {
    id: 7,
    title: "Bunny",
    images: ["/projects/Rajut/Bunny.jpg"],
    tags: ["Crochet", "Animal"],
    demoUrl: "#",
  },
  {
    id: 8,
    title: "Cat",
    images: ["/projects/Rajut/Cat.jpg"],
    tags: ["Crochet", "Animal"],
    demoUrl: "#",
  },
  {
    id: 9,
    title: "Chicken Hen",
    images: ["/projects/Rajut/Chicken Hen.jpg"],
    tags: ["Crochet", "Animal"],
    demoUrl: "#",
  },
  {
    id: 10,
    title: "Chunky Mochi Axolotl",
    images: ["/projects/Rajut/Chunky Mochi Axolot.jpg"],
    tags: ["Crochet", "Axolotl"],
    demoUrl: "#",
  },
  {
    id: 11,
    title: "Dory",
    images: ["/projects/Rajut/Dory.jpg"],
    tags: ["Crochet", "Fish", "Character"],
    demoUrl: "#",
  },
  {
    id: 12,
    title: "Flower Coaster Keychain",
    images: ["/projects/Rajut/Flower Coaster Keychain.jpg"],
    tags: ["Crochet", "Coaster"],
    demoUrl: "#",
  },
  {
    id: 13,
    title: "Donkey",
    images: ["/projects/Rajut/Donkey.jpg"],
    tags: ["Crochet", "Animal"],
    demoUrl: "#",
  },
  {
    id: 14,
    title: "Doa",
    images: ["/projects/Rajut/Doa.JPG"],
    tags: ["Crochet", "Character"],
    demoUrl: "#",
  },
  {
    id: 15,
    title: "Fox",
    images: ["/projects/Rajut/Fox.jpg"],
    tags: ["Crochet", "Animal"],
    demoUrl: "#",
  },
  {
    id: 16,
    title: "Frank Ocean",
    images: ["/projects/Rajut/FrankOcean.JPG"],
    tags: ["Crochet", "Custom", "Singer"],
    demoUrl: "#",
  },
  {
    id: 17,
    title: "Gecko",
    images: ["/projects/Rajut/Gecko.jpg"],
    tags: ["Crochet", "Lizard"],
    demoUrl: "#",
  },
  {
    id: 18,
    title: "Goat",
    images: ["/projects/Rajut/Goat.jpg"],
    tags: ["Crochet", "Animal"],
    demoUrl: "#",
  },
  {
    id: 19,
    title: "Goguma",
    images: ["/projects/Rajut/Goguma.jpg"],
    tags: ["Crochet", "Sweet Potato"],
    demoUrl: "#",
  },
  {
    id: 20,
    title: "Horse",
    images: ["/projects/Rajut/Horse.jpg"],
    tags: ["Crochet", "Animal"],
    demoUrl: "#",
  },
  {
    id: 21,
    title: "Kabinet Logo",
    images: ["/projects/Rajut/Kabinet Logo.jpg"],
    tags: ["Crochet", "Logo"],
    demoUrl: "#",
  },
  {
    id: 22,
    title: "Kanye Bear & RadioHead",
    images: ["/projects/Rajut/Kanye Bear & RadioHead.jpg"],
    tags: ["Crochet", "Bear", "Custom"],
    demoUrl: "#",
  },
  {
    id: 23,
    title: "Kurama",
    images: ["/projects/Rajut/Kurama.jpg"],
    tags: ["Crochet", "Anime"],
    demoUrl: "#",
  },
  {
    id: 24,
    title: "Marie Cat",
    images: ["/projects/Rajut/Marie Cat.jpg"],
    tags: ["Crochet", "Cat", "Character"],
    demoUrl: "#",
  },
  {
    id: 25,
    title: "Miffy Chibi",
    images: ["/projects/Rajut/Miffy Chibi.jpg"],
    tags: ["Crochet", "Bunny"],
    demoUrl: "#",
  },
  {
    id: 26,
    title: "Monkey with Banana",
    images: ["/projects/Rajut/Monkey with Banana.jpg"],
    tags: ["Crochet", "Monkey", "Banana"],
    demoUrl: "#",
  },
  {
    id: 27,
    title: "Mr. Bean Teddy Bear",
    images: ["/projects/Rajut/Mr. Bean Teddy Bear.jpg"],
    tags: ["Crochet", "Bear"],
    demoUrl: "#",
  },
  {
    id: 28,
    title: "Mushrooms",
    images: ["/projects/Rajut/Mushrooms.JPG"],
    tags: ["Crochet", "Mushroom", "Series"],
    demoUrl: "#",
  },
  {
    id: 29,
    title: "Nemo",
    images: ["/projects/Rajut/Nemo.jpg"],
    tags: ["Crochet", "Fish"],
    demoUrl: "#",
  },
  {
    id: 30,
    title: "Nyanko Sensei",
    images: ["/projects/Rajut/NyankoSensei.jpg"],
    tags: ["Crochet", "Anime"],
    demoUrl: "#",
  },
  {
    id: 31,
    title: "Octopus",
    images: ["/projects/Rajut/Octopus.jpg"],
    tags: ["Crochet", "Animal"],
    demoUrl: "#",
  },
  {
    id: 32,
    title: "Onigiri",
    images: ["/projects/Rajut/Onigiri.jpg"],
    tags: ["Crochet", "Food"],
    demoUrl: "#",
  },
  {
    id: 33,
    title: "Ramen",
    images: ["/projects/Rajut/Ramen.jpg"],
    tags: ["Crochet", "Food"],
    demoUrl: "#",
  },
  {
    id: 34,
    title: "Smiski",
    images: ["/projects/Rajut/Smiski.JPG"],
    tags: ["Crochet", "Character"],
    demoUrl: "#",
  },
  {
    id: 35,
    title: "TamTam",
    images: ["/projects/Rajut/TamTam.jpg"],
    tags: ["Crochet", "Custom"],
    demoUrl: "#",
  },
  {
    id: 36,
    title: "Vessels",
    images: ["/projects/Rajut/Vessels.jpg"],
    tags: ["Crochet", "Original"],
    demoUrl: "#",
  },
  {
    id: 37,
    title: "White Mouse Strawberry",
    images: ["/projects/Rajut/White Mouse Strawberry.jpg"],
    tags: ["Crochet", "Mouse", "Strawberry"],
    demoUrl: "#",
  }
];



const photographyProjects = [
  {
    id: 1,
    title: "Flowers",
    images: [
      "/projects/foto/flower1.JPG",
      "/projects/foto/flower2.JPG",
      "/projects/foto/flower3.JPG"
    ],
    tags: ["Photography"],
    demoUrl: "#"
  },
  {
    id: 2,
    title: "Forest Walk",
    images: [
      "/projects/foto/forest1.JPG",
      "/projects/foto/forest2.JPG"
    ],
    tags: ["Photography"],
    demoUrl: "#"
  },
  {
    id: 3,
    title: "Hometown",
    images: [
      "/projects/foto/Kampung.JPG",
      "/projects/foto/personback.JPG"
    ],
    tags: ["Photography"],
    demoUrl: "#"
  },
  {
    id: 4,
    title: "Traditional House",
    images: [
      "/projects/foto/house1.JPG"
    ],
    tags: ["Photography"],
    demoUrl: "#"
  },
  {
    id: 5,
    title: "Paku Andam",
    images: [
      "/projects/foto/pakuandam.JPG"
    ],
    tags: ["Photography"],
    demoUrl: "#"
  },
  {
    id: 6,
    title: "Rice Field",
    images: [
      "/projects/foto/sawah1.JPG"
    ],
    tags: ["Photography"],
    demoUrl: "#"
  },
  {
    id: 7,
    title: "Sunrise",
    images: [
      "/projects/foto/sunrise1.JPG",
      "/projects/foto/sunrise2.JPG",
      "/projects/foto/sunrise3.JPG"
    ],
    tags: ["Photography"],
    demoUrl: "#"
  }
];

const allProjects = [...techProjects, ...crochetProjects, ...photographyProjects];

const tabs = [
    { id: "all", label: "All Projects", projects: allProjects },
    { id: "tech", label: "Tech Projects", projects: techProjects },
    { id: "crochet", label: "Crochet", projects: crochetProjects },
    { id: "photography", label: "Photography", projects: photographyProjects },
];

const crochetOrderUrl = `https://wa.me/6283807743555?text=${encodeURIComponent(
  "Nama: \nCustom Crochet: "
)}`;

const getProjectImages = (project) => project.images || [project.image].filter(Boolean);

const ProjectImageModal = ({ title, images, currentIndex, onClose, onNext, onPrev, onSelect }) => {
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" && hasMultipleImages) onNext();
      if (event.key === "ArrowLeft" && hasMultipleImages) onPrev();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [hasMultipleImages, onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 overlay-layer bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative flex h-full max-h-[88vh] w-full max-w-6xl flex-col">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-base sm:text-lg font-semibold text-white">{title}</h3>
            {hasMultipleImages && (
              <p className="text-sm text-white/70">
                {currentIndex + 1} / {images.length}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close image preview"
          >
            <X size={22} />
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          <SkeletonImage
            src={images[currentIndex]}
            alt={`${title} preview ${currentIndex + 1}`}
            className="max-h-full w-full rounded-lg object-contain shadow-2xl"
          />

          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={onPrev}
                className="absolute left-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80 sm:left-2 md:left-4 md:h-11 md:w-11"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={onNext}
                className="absolute right-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80 sm:right-2 md:right-4 md:h-11 md:w-11"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {hasMultipleImages && (
          <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => onSelect(index)}
                className={`h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                  index === currentIndex
                    ? "border-white ring-2 ring-white/40"
                    : "border-white/20 hover:border-white/60"
                }`}
                aria-label={`Open image ${index + 1}`}
              >
                <SkeletonImage
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [imageModal, setImageModal] = useState(null);
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);

  const allTabProjects = tabs.find((tab) => tab.id === activeTab)?.projects || allProjects;
  const currentProjects = showAll ? allTabProjects : allTabProjects.slice(0, 9);

  const isVisualProject = (tags) => tags?.includes("Crochet") || tags?.includes("Photography");
  const openImageModal = (project, index = 0) => {
    const images = getProjectImages(project);
    if (images.length === 0) return;

    setImageModal({
      title: project.title,
      images,
      currentIndex: index,
    });
  };

  const closeImageModal = () => setImageModal(null);
  const showNextImage = () => {
    setImageModal((modal) =>
      modal
        ? { ...modal, currentIndex: (modal.currentIndex + 1) % modal.images.length }
        : modal
    );
  };
  const showPrevImage = () => {
    setImageModal((modal) =>
      modal
        ? {
            ...modal,
            currentIndex:
              (modal.currentIndex - 1 + modal.images.length) % modal.images.length,
          }
        : modal
    );
  };
  const selectModalImage = (index) => {
    setImageModal((modal) => (modal ? { ...modal, currentIndex: index } : modal));
  };

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 px-4 md:px-24 relative">
      <div className="container mx-auto max-w-6xl">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Here are some of my recent projects across AI, data, web, product design, crochet, and photography.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-10 md:mb-12 overflow-x-auto pb-3">
          <div
            className="relative grid min-w-[38rem] md:min-w-0 w-full max-w-3xl grid-cols-4 gap-1 rounded-full border border-border/50 bg-secondary/20 p-1 backdrop-blur-sm mx-auto"
            style={{ "--active-project-tab": activeIndex }}
          >
            <div className="project-tab-indicator" />
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowAll(false);
                }}
                className={`content-raised min-h-12 px-3 py-3 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out hover:scale-[1.03] ${
                  activeTab === tab.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "crochet" && (
          <div className="mb-10 flex justify-center">
            <a
              href={crochetOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="crochet-order-button"
            >
              Order Custom Here
            </a>
          </div>
        )}

        {/* Projects Grid */}
        <div key={activeTab} className="project-grid-enter grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {currentProjects.map((project) => (
            <div
              key={`${project.title}-${project.id}`}
              className={`bg-card rounded-lg overflow-hidden shadow-md group transition-all duration-300 ${
                isVisualProject(project.tags)
                  ? "hover:shadow-xl"
                  : "card-hover hover:shadow-2xl hover:shadow-primary/20"
              }`}
            >
              {/* Image / Slider */}
              <div className={isVisualProject(project.tags) ? "h-64" : "h-48"}>
                <button
                  type="button"
                  onClick={() => openImageModal(project)}
                  className="h-full w-full overflow-hidden text-left"
                  aria-label={`Open ${project.title} image preview`}
                >
                  <SkeletonImage
                    src={getProjectImages(project)[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              </div>

              {/* Card Content */}
              <div className="p-4 text-center">
                <h3 className="text-lg md:text-xl font-semibold mb-2">{project.title}</h3>
                {project.role && (
                  <p className="mb-3 text-sm font-semibold text-primary">
                    {project.role}
                  </p>
                )}
                <div className="flex flex-wrap justify-center gap-2 mb-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium rounded-full border bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {!isVisualProject(project.tags) && project.description && (
                  <>
                    <p className="text-muted-foreground text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex justify-center space-x-3">
                      {project.demoUrl && project.demoUrl !== "#" && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/80 hover:text-primary transition-colors duration-300"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                      {project.githubUrl && project.githubUrl !== "#" && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/80 hover:text-primary transition-colors duration-300"
                        >
                          <GithubIcon size={20} />
                        </a>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>


        {allTabProjects.length > 9 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 text-sm font-medium text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition"
            >
              {showAll ? "See Less" : "See More"}
            </button>
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="https://github.com/ClarisyaA"
            target="_blank"
            rel="noopener noreferrer"
            className="cosmic-button w-fit flex items-center mx-auto"
          >
            Check My Github <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </div>

      {imageModal && (
        <ProjectImageModal
          title={imageModal.title}
          images={imageModal.images}
          currentIndex={imageModal.currentIndex}
          onClose={closeImageModal}
          onNext={showNextImage}
          onPrev={showPrevImage}
          onSelect={selectModalImage}
        />
      )}
    </section>
  );
};
