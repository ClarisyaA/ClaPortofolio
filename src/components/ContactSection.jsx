import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitch,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import emailjs from '@emailjs/browser';


export const ContactSection = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        const serviceId= "service_omo4ojn";
        const templateId = "template_8rndeev";
        const publicKey = "8sbjap-OZWjI9B865"

        const templateParams = {
            from_name: name,
            from_email: email,
            to_name:'Clarisya',
            message: message,
        }

        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                console.log('Email sent succesfully!', response);
                setName(' ');
                setEmail(' ');
                setMessage(' ');
            })
            .catch((error) => {
                console.error('Error sending email: ', error)
            })


        setTimeout(() => {
        toast({
            title: "Message sent!",
            description: "Thank you for your message. I'll get back to you soon.",
        });
        setIsSubmitting(false);
        }, 1500);
    };
    return (
        <section id="contact" className="py-24 px-4 relative bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Get In <span className="text-primary"> Touch</span>
            </h2>

            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out.
            I'm always open to discussing new opportunities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
                <h3 className="text-2xl font-semibold mb-6">
                {" "}
                Contact Information
                </h3>

                <div className="space-y-6 justify-center">
                <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />{" "}
                    </div>
                    <div>
                    <h4 className="font-medium text-left">Email</h4>
                    <a
                        href="mailto:adelineclarisya@gmail.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        adelineclarisya@gmail.com
                    </a>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />{" "}
                    </div>
                    <div>
                    <h4 className="font-medium text-left">Phone</h4>
                    <a
                        href="tel:+6283807743555"
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        +62 838 0774 3555
                    </a>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />{" "}
                    </div>
                    <div>
                    <h4 className="font-medium text-left">Location</h4>
                    <a className="text-muted-foreground hover:text-primary transition-colors">
                        Jatinangor, Sumedang, Jawa Barat
                    </a>
                    </div>
                </div>
                </div>

                <div className="pt-8">
                <h4 className="font-medium mb-4"> Connect With Me</h4>
                <div className="flex space-x-4 justify-center">
                    <a href="https://www.linkedin.com/in/clarisyaadeline/" target="_blank">
                    <Linkedin />
                    </a>
                    <a href="https://www.instagram.com/clarisyaadeline/" target="_blank">
                    <Instagram />
                    </a>
                </div>
                </div>
            </div>

            <div
                className="bg-card p-8 rounded-lg shadow-xs"
                onSubmit={handleSubmit}
            >
                <h3 className="text-2xl font-semibold mb-6"> Send a Message</h3>

                <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                    >
                    {" "}
                    Your Name
                    </label>
                    <input
                    type="text"
                    id="name"
                    name="from_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                    placeholder="Clarisya Adeline"
                    />

                </div>

                <div>
                    <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    >
                    {" "}
                    Your Email
                    </label>
                    <input
                    type="email"
                    id="email"
                    name="from_email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                    placeholder="adelineclarisya@gmail.com"
                    />

                </div>

                <div>
                    <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                    >
                    {" "}
                    Your Message
                    </label>
                    <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary resize-none"
                    placeholder="Hello, I'd like to talk about..."
                    />

                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                    "cosmic-button w-full flex items-center justify-center gap-2"
                    )}
                >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send size={16} />
                </button>
                </form>
            </div>
            </div>
        </div>
        </section>
    );
    };
