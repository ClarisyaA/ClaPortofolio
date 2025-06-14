import { ArrowDown } from "lucide-react"
import headerImg from "../assets/img/isya1.jpg";

export const HeroSection = () => {
    return <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <div className="container max-w-4xl mx-auto text-center z-10">
                            <div className="container max-w-5xl mx-auto text-center z-10">
                            <div className="flex justify-center mb-6">
                            <img
                                src={headerImg} // sesuaikan path
                                alt="Clarisya"
                                className="w-40 h-40 rounded-3xl shadow-blue-300 object-cover border-4 border-primary animate-float">
                            </img>
                            </div>
                        </div>
            <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-float">
                    <span className="opacity-0 animate-fade-in">Hi, i'm</span> 
                    <span className="opacity-0 animate-fade-in-delay-1 text-glow text-primary"> {" "} Clarisya</span>
                    <span className="opacity-0 animate-fade-in-delay-2 text-glow text-gradient">{" "} Adeline</span>
                </h1>
                <div className="animate-float opacity-80 text-glow">
                    <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
                        {/* Hi, I'm an Informatics Engineering student at Padjadjaran University with a passion for technology, creativity, and meaningful impact. 
                        I enjoy building digital solutions, leading initiatives, and continuously learning across disciplines. 
                        Whether it's launching small businesses, organizing campus events, or developing tech skills in Python, C++, and web development, 
                        I thrive in dynamic environments where innovation meets purpose. */}

                        I'm currently  learning and exploring the world of tech as a Computer Science student at Padjadjaran University and enjoy working on creative and tech-related projects. 
                        I've had experience building websites, organizing events, and even running small businesses. 
                        I'm someone who learns quickly, works well with others, and likes solving problems. 
                        I'm always looking for new opportunities to grow and contribute in a meaningful way.
                    </p>
                </div>
                
                <div className="pt-4 opacity-0 animate-fade-in-delay-4">
                    <a href="#projects" className="cosmic-button">
                        View My Work
                    </a>
                </div>
            </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-sm text-muted-foreground">Scroll</span>
            <ArrowDown className="h-5 w-5 text-primary"/>

        </div>
    </section>
}