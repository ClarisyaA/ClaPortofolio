import { ArrowLeft, ArrowRight, ExternalLink, GithubIcon } from "lucide-react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


const techProjects = [
    {
        id: 1,
        title: "Fam Property",
        description: "A PHP & MySQL-based platform for managing real estate listings, transactions, and clients with a user-friendly admin panel.",
        image: "/projects/fam.png",
        tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Web Development"],
        demoUrl: "http://famproperty.id/?i=1.id",
        githubUrl: "#",
    },
    {
        id: 2,
        title: "Kuliner Jatinangor",
        description: "A local culinary review site with login system, restaurant listings, user reviews, and dark mode support.",
        image: "/projects/Boo.png",
        tags: ["PHP", "MySQL", "HTML", "CSS", "Web Development"],
        demoUrl: "#",
        githubUrl: "https://github.com/ClarisyaA/KulinerJatinangor",
    },
    {
        id: 3,
        title: "Color Dominant Picker",
        description: "Streamlit app that extracts dominant colors from images using K-Means and displays results in PNG/CSV formats.",
        image: "/projects/colorPalette.png",
        tags: ["Python", "Streamlit", "K-Means Clustering", "Image Processing", "Machine Learning"],
        demoUrl: "https://clacolorpalette.streamlit.app/",
        githubUrl: "https://github.com/ClarisyaA/ColorPalette",
    },
    {
        id: 4,
        title: "Berrywell - Wellness App",
        description: "A wellness app prototype that helps users manage weight via health tracking, food scans, and AI-based plans.",
        image: "/projects/berry.png",
        tags: ["UI/UX Design", "Figma", "HealthTech", "Design Thinking", "Mobile App"],
        demoUrl: "https://www.figma.com/proto/Dr5QeHgYn9FwTRWMweAVOk/BerryWell?node-id=631-2602&node-type=CANVAS&t=xBI0bV7ptMBeSsCV-1&scaling=scale-down&content-scaling=fixed&page-id=631%3A2351&starting-point-node-id=631%3A2599&show-proto-sidebar=1",
        githubUrl: "",
    },
    {
        id: 5,
        title: "Seluna - Women's Safety App",
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

export const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const allTabProjects = tabs.find((tab) => tab.id === activeTab)?.projects || allProjects;
  const currentProjects = showAll ? allTabProjects : allTabProjects.slice(0, 9);

  const isVisualProject = (tags) => tags?.includes("Crochet") || tags?.includes("Photography");

  return (
    <section id="projects" className="py-24 px-4 md:px-24 relative">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects across different disciplines. Each project was carefully
          crafted with attention to detail, performance, and user experiences.
        </p>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="relative flex flex-wrap gap-1 p-1 bg-secondary/20 rounded-full border border-border/50 backdrop-blur-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowAll(false);
                }}
                className={`relative px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  activeTab === tab.id
                    ? "text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === tab.id && (
                  <div className="absolute inset-0 bg-primary rounded-full shadow-lg animate-in slide-in-from-left-1 duration-300" />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project) => (
            <div
              key={project.id}
              className={`bg-card rounded-lg overflow-hidden shadow-md group transition-all duration-300 ${
                isVisualProject(project.tags)
                  ? "hover:shadow-xl"
                  : "card-hover hover:shadow-2xl hover:shadow-primary/20"
              }`}
            >
              {/* Image / Slider */}
              <div className={isVisualProject(project.tags) ? "h-64" : "h-48"}>
                {project.images && project.images.length > 1 ? (
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop
                    className="h-full group relative"
                  >
                    {project.images.map((img, i) => (
                      <SwiperSlide key={i}>
                        <img
                          src={img}
                          alt={`${project.title} ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <img
                    src={project.images ? project.images[0] : project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              {/* Card Content */}
              <div className="p-4 text-center">
                <h3 className="text-lg md:text-xl font-semibold mb-2">{project.title}</h3>
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
    </section>
  );
};
