import { ArrowRight, ExternalLink, GithubIcon } from "lucide-react";

const projects = [
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
        image: "/projects/berry.png", // pastikan ini mengarah ke gambar yang ada
        tags: ["UI/UX Design", "Figma", "HealthTech", "Design Thinking", "Mobile App"],
        demoUrl: "https://www.figma.com/proto/Dr5QeHgYn9FwTRWMweAVOk/BerryWell?node-id=631-2602&node-type=CANVAS&t=xBI0bV7ptMBeSsCV-1&scaling=scale-down&content-scaling=fixed&page-id=631%3A2351&starting-point-node-id=631%3A2599&show-proto-sidebar=1",
        githubUrl: "", // tidak ada repo, jadi bisa dikosongkan atau isi dengan "-"
    },

    {
        id: 5,
        title: "Seluna - Women's Safety App",
        description: "Mobile app prototype offering safe route suggestions for women based on lighting, crowd data, and crime statistics.",
        image: "/projects/seluna.png", // ganti sesuai path thumbnail kamu
        tags: ["UI/UX Design", "Figma", "Safety Tech", "Crowdsourced Data", "Mobile App"],
        demoUrl: "https://www.figma.com/proto/JvMTFzw8OcdHNpHPlAEOU9/SAFE-ROUTE?node-id=2448-2547&t=TdKibmjOsTDVwU7F-1",
        githubUrl: "" // karena ini UI/UX saja, bisa dikosongkan
    },

]

export const ProjectsSection = () => {
    return ( <section id="projects" className="py-24 px-24 relative">
        <div className="container mx-auto max-w-5xl" >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                {" "}
                Featured <span className="text-primary"> Projects</span>
            </h2>

            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Here are some of my recent projects, Each project was carefully 
                crafted with attention to detail, performance, and user experiences.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, key) => (
                    <div 
                        key={key} 
                        className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover">
                            <div className="h-48 overflow-hidden">
                                <img src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cober transition-transform duration-500"/>
                            </div>

                            <div className="p-6">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tags) => (
                                            <span className="px-2 py-1 text-xs font-medium rounded-full border bg-secondary text-secondary-foreground text-glow">{tags}</span>
                                        ))}
                                    </div>
                                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    {project.description}
                                </p>
                                <br />
                                <div className="flex justify-between items-center">
                                    <div className="flex space-x-3">
                                        <a href={project.demoUrl} 
                                            target="_blank"
                                            className="text-foreground/80 hover:text-primary transition-colors duration-300">
                                            {" "}
                                            <ExternalLink  size={20}/>
                                        </a>
                                        <a href={project.githubUrl} target="_blank"
                                            className="text-foreground/80 hover:text-primary transition-colors duration-300">
                                            {" "}
                                            <GithubIcon size={20}/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                    </div>
                ))}

            </div>
            <div className="text-center mt-12 ">
                <a href="https://github.com/ClarisyaA"
                    target="_blank"
                    className="cosmic-button w-fit flex items-center mx-auto">
                    Check My Github <ArrowRight size={16}/>
                </a>
            </div>
        </div>

    </section>
    );
};