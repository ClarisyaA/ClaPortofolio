import { useState, useEffect } from "react";
import { ExternalLink, Calendar, MapPin, Users, Award, Briefcase, Heart, ChevronLeft, ChevronRight, X } from "lucide-react";

const tabs = [
  { id: "work", label: "Work Experience", icon: Briefcase },
  { id: "org", label: "Organizational", icon: Users },
  { id: "volunteer", label: "Volunteer", icon: Heart },
];

const experiences = {
  work: [
    {
      title: "Teaching Assistant – Computer Organization and Architecture",
      place: "Padjadjaran University",
      date: "March 2025 – June 2025",
      description:
        "Facilitated hands-on sessions for 40+ students, graded assignments and final projects, and supported academic growth via consultations and reviews.",
      images: [],
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
      place: "Informatics Festival 2024 x Himatif",
      date: "June 2025 – Present",
      description:
        "Led Sponsorship, PR, and Marketing divisions. Managed MoUs, partnerships, and external communications.",
      images: ["/projects/experiences/IFEST/external.png"],
      type: "Leadership",
    },
    {
      title: "Head of Fundraising Department",
      place: "LPM Warta Kema UNPAD",
      date: "March 2025 – Present",
      description:
        "Handled proposal, ID card production, social media for Warung Kema, and secured sponsors for fundraising campaigns.",
      images: ["/projects/experiences/WartaKema/warkem.png"],
      type: "Leadership",
    },
    {
      title: "Project Officer – ICOMPAS 2",
      place: "Career Development Dept. Himatif",
      date: "April 2024",
      description:
        "Planned & hosted online career webinar with Traveloka in 7 days, attended by 130+ participants.",
      images: ["/projects/experiences/keprof/ICOMPAS2.jpg"],
      type: "Project Management",
    },
    {
      title: "Vice Project Officer – ICOMPAS 1",
      place: "Career Development Dept. Himatif",
      date: "September 2023",
      description:
        "Coordinated team ops, worked with BCA Foresta BSD for company visit of 70 participants.",
      images: ["/projects/experiences/keprof/ICOMPAS1.jpg"],
      type: "Project Management",
    },
    {
      title: "Staff – Career Development Department",
      place: "Informatics Festival 2024",
      date: "June 2024 – Oct 2024",
      description:
        "Oversaw PR division performance, assisted in program execution, and collaborated across departments.",
      images: [
        "/projects/experiences/keprof/HGD2.jpg",
        "/projects/experiences/keprof/Keprof23.jpg",
        "/projects/experiences/keprof/IFFD2024.jpg"
      ],
      type: "Team Member",
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
      title: "Staff – Kakak Asuh/Mentor Division",
      place: "Character Building Season 2024",
      date: "June 2024 – Oct 2024",
      description:
        "Mentored 8 freshmen, introduced academic/campus life, and provided support system.",
      images: Array.from({ length: 24 }, (_, i) => `/projects/experiences/kasuh/${i + 1}.jpg`),
      type: "Mentorship",
    },
    {
      title: "Head of Economics Speaker Division",
      place: "LOGYTER 2023",
      date: "October 2024",
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

const certifications = [
 {
    title: "Tech Ethics - LinkedIn Learning",
    image: "/projects/certifications/Tech.jpg",
    url: "https://www.linkedin.com/learning/certificates/d1a20d653a3862c8148c09760d184ae681036123df8f2ccbfa2739eacc9d9b11?trk=share_certificate",
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
  "Academic": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
  "Entrepreneurship": "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-300 dark:border-green-800",
  "Leadership": "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800",
  "Project Management": "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800",
  "Team Member": "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800",
  "Mentorship": "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/50 dark:text-pink-300 dark:border-pink-800",
  "Community Service": "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/50 dark:text-yellow-300 dark:border-yellow-800",
};

// Image Gallery Component
const ImageGallery = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        {/* Main Image Container */}
        <div className="aspect-video w-full">
          <img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer transition-all duration-500 hover:scale-105"
            onClick={() => onImageClick(images, currentIndex)}
            onError={(e) => {
              e.currentTarget.src = "/fallback-image.jpg";
            }}
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
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
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
                <img
                  src={img}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
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
  }, []);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
     <div className="relative w-full max-w-5xl mx-auto max-h-[80vh] flex flex-col">
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
          <img
            src={images[currentIndex]}
            alt={`Full view ${currentIndex + 1}`}
            className="w-full max-w-4xl max-h-[70vh] object-contain rounded-lg shadow-2xl mx-auto"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          
          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-colors backdrop-blur-sm"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-colors backdrop-blur-sm"
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
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
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

// Main Experience Section Component
export const ExperienceSection = () => {
  const [activeTab, setActiveTab] = useState("work");
  const [modalImages, setModalImages] = useState([]);
  const [modalStartIndex, setModalStartIndex] = useState(0);

  const currentExperiences = experiences[activeTab] || [];

  const openModal = (images, startIndex) => {
    setModalImages(images);
    setModalStartIndex(startIndex);
  };

  const closeModal = () => {
    setModalImages([]);
    setModalStartIndex(0);
  };

  return (
    <section className="min-h-screen bg-background px-4 md:px-20 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Experience & Certifications
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A journey through professional growth, leadership roles, and meaningful contributions
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tab Navigation */}
            <div className="flex justify-center gap-2 mb-8 flex-wrap">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group relative px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 transform scale-105"
                        : "bg-card text-foreground hover:bg-card/80 border border-border hover:border-primary/50 hover:shadow-md"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Experience Cards */}
            <div className="space-y-8">
              {currentExperiences.length > 0 ? (
                currentExperiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className="group bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border hover:border-primary/50"
                  >
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-foreground/60 mb-3">
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
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${typeColors[exp.type] || 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'}`}>
                            {exp.type}
                          </span>
                        )}
                      </div>
                      <p className="text-foreground/80 leading-relaxed mb-4">{exp.description}</p>
                      
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
          </div>

          {/* Sidebar - Certifications */}
          <aside className="w-full lg:w-96">
            <div className="sticky top-8">
              <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
                <div className="flex items-center gap-2 mb-6">
                  <Award className="text-primary" size={24} />
                  <h3 className="text-2xl font-bold text-foreground">Certifications</h3>
                </div>
                <div className="space-y-4">
                  {certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="group bg-background rounded-xl p-4 border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative overflow-hidden rounded-lg mb-3">
                        <img
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
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium hover:underline transition-colors"
                        >
                          View Certificate
                          <ExternalLink size={12} />
                        </a>
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