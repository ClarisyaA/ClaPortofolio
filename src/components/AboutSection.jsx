import { Briefcase, Code, Heart, User } from "lucide-react";

export const AboutSection = () => {
    return (
        <section id="about" className="py-24 px-4 relative"> 
        {" "}
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    About <span className="text-primary text-glow">Me</span> 
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold">Exploring the world of tech with code and curiosity.</h3>
                        <p className="text-muted-foreground">
                            With 3 years of experience in tech, entrepreneurship, and student leadership, i've built websites, developed apps, launched small businesses, and led impactful campus events. 
                            I enjoy turning ideas into action and blending creativity with problem-solving.
                        </p>

                        <p className="text-muted-foreground">
                            Along the way, I've grown strong in collaboration, adaptability, and communication—skills that help me thrive in dynamic environments. 
                            Always eager to learn, i'm excited to take on new challenges and contribute to meaningful projects.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                            <a href="#contact" className="cosmic-button">
                                {" "}
                                Get In Touch

                            </a>

                            <a href="https://drive.google.com/file/d/1tXLkvI2UhZyyC41iQ_vawulyaraCQpEu/view?usp=sharing" className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 text-glow">
                                {" "}
                                Download CV
                                
                            </a>
                            <br/>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Code className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg">Web Development</h4>
                                    <p className="text-muted-foreground">
                                        Creating user-friendly and responsive web experiences with modern development tools.
                                    </p>

                                </div>

                            </div>

                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <User className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg">UI/UX Design</h4>
                                    <p className="text-muted-foreground">
                                          Designed user-friendly interfaces for campus projects using Figma and Canva.
                                    </p>

                                </div>

                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Heart className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg">Crochet</h4>
                                    <p className="text-muted-foreground">
                                        Founded a small crochet business, creating and selling handmade products while managing design, production, and online marketing.
                                    </p>

                                </div>

                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Briefcase className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg">Project Management</h4>
                                    <p className="text-muted-foreground">
                                        Managed events and projects with clear planning, team coordination, and hands-on execution.
                                    </p>

                                </div>

                            </div>
                        </div>
                    </div>

                    <div>

                    </div>

                </div>
            </div>

        </section>
    );
};
