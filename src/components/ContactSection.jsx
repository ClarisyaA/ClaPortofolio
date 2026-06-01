import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { PageLoader } from "@/components/PageLoader";

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const CONTACT_EMAIL = "adelineclarisya@gmail.com";
const CONTACT_PHONE = "+62 838 0774 3555";

export const ContactSection = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [company, setCompany] = useState('');
    const [lastError, setLastError] = useState("");

    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedMessage = message.trim();

        if (!trimmedName || !trimmedEmail || !trimmedMessage) {
            setLastError("Please complete all fields before sending.");
            return;
        }

        if (!isValidEmail(trimmedEmail)) {
            setLastError("Please enter a valid email address.");
            return;
        }

        if (trimmedMessage.length < 10) {
            setLastError("Please write a message with at least 10 characters.");
            return;
        }

        setIsSubmitting(true);
        setLastError("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: trimmedName,
                    email: trimmedEmail,
                    message: trimmedMessage,
                    company,
                }),
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(result.message || "Message could not be sent.");
            }

            setName("");
            setEmail("");
            setMessage("");
            setCompany("");
            toast({
                title: "Message sent!",
                description: "Thank you for your message. I'll get back to you soon.",
            });
        } catch (error) {
            console.error("Error sending email: ", error);
            setLastError(error.message || "Message could not be sent. Please try again later.");
            toast({
                title: "Message failed",
                description: "Please try again later or reach me through LinkedIn.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <section id="contact" className="py-16 sm:py-20 md:py-24 px-4 relative bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Get In <span className="text-primary"> Touch</span>
            </h2>

            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out.
            I'm always open to discussing new opportunities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            <div className="space-y-8">
                <h3 className="text-2xl font-semibold mb-6">
                {" "}
                Contact Information
                </h3>

                <div className="space-y-6 justify-center">
                <div className="flex items-start gap-4 text-left">
                    <div className="p-3 rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />{" "}
                    </div>
                    <div className="min-w-0">
                    <h4 className="font-medium text-left">Email</h4>
                    <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="break-words text-muted-foreground hover:text-primary transition-colors"
                    >
                        {CONTACT_EMAIL}
                    </a>
                    </div>
                </div>
                <div className="flex items-start gap-4 text-left">
                    <div className="p-3 rounded-full bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />{" "}
                    </div>
                    <div className="min-w-0">
                    <h4 className="font-medium text-left">Phone</h4>
                    <a
                        href="https://wa.me/6283807743555"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        {CONTACT_PHONE}
                    </a>
                    </div>
                </div>
                <div className="flex items-start gap-4 text-left">
                    <div className="p-3 rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />{" "}
                    </div>
                    <div className="min-w-0">
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
                    <a href="https://www.linkedin.com/in/clarisyaadeline/" target="_blank" rel="noopener noreferrer">
                    <Linkedin />
                    </a>
                    <a href="https://www.instagram.com/clarisyaadeline/" target="_blank" rel="noopener noreferrer">
                    <Instagram />
                    </a>
                </div>
                </div>
            </div>

            <div
                className="relative bg-card p-5 sm:p-8 rounded-lg shadow-xs overflow-hidden"
            >
                {isSubmitting && (
                    <div className="absolute inset-0 overlay-layer grid place-items-center bg-card/90 backdrop-blur-sm">
                        <PageLoader label="Sending message" />
                    </div>
                )}
                <h3 className="text-2xl font-semibold mb-6"> Send a Message</h3>

                <form className="space-y-6" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                />
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
                    autoComplete="name"
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
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
                    autoComplete="email"
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                    placeholder="your.email@example.com"
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
                    minLength={10}
                    rows={5}
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Hello, I'd like to talk about..."
                    />

                </div>

                {lastError && (
                    <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                        {lastError}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                    "cosmic-button w-full flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
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
