import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { EASE, FadeIn, Magnetic, RevealText, SectionLabel } from "@/components/motion/primitives";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const topics = ["Internship", "Collaboration", "Freelance", "Custom crochet", "Just saying hi"];

export const Contact = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [lastError, setLastError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: `[${topic}] ${trimmedMessage}`,
          company,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "Message could not be sent.");

      setName("");
      setEmail("");
      setMessage("");
      setCompany("");
      setSent(true);
      toast({ title: "Message sent!", description: "Thank you for your message. I'll get back to you soon." });
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
    <section id="contact" className="relative pb-24 pt-24 sm:pb-32 sm:pt-36">
      <div className="container-x">
        <SectionLabel>Contact</SectionLabel>

        <h2 className="display mt-5 max-w-4xl text-4xl sm:text-6xl">
          <RevealText text="An internship, a project, or a custom crochet order? Send me a message." />
        </h2>

        <div className="mt-20 grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <FadeIn className="space-y-10">
            <div>
              <p className="eyebrow mb-3">Email</p>
              <button type="button" onClick={copyEmail} className="group flex items-center gap-3 text-left text-lg font-medium sm:text-xl">
                <span className="min-w-0 [overflow-wrap:anywhere] border-b border-transparent transition-colors group-hover:border-ink">{profile.email}</span>
                <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={copied ? "ok" : "copy"} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </button>
              <AnimatePresence>
                {copied && (
                  <motion.p className="mt-2 text-sm text-accent" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    Copied to clipboard
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div>
              <p className="eyebrow mb-3">Phone / WhatsApp</p>
              <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="text-xl font-medium hover:text-accent sm:text-2xl">
                {profile.phone}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-3">Based in</p>
              <p className="text-xl font-medium sm:text-2xl">{profile.location}</p>
            </div>
            <ul className="border-t border-line">
              {profile.socials.map((s) => (
                <li key={s.label} className="border-b border-line">
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-4">
                    <span className="text-lg transition-transform duration-500 group-hover:translate-x-2">{s.label}</span>
                    <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:rotate-45" />
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1}>
            <form onSubmit={handleSubmit} className="relative space-y-10" noValidate>
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
                <p className="eyebrow mb-4">What's it about?</p>
                <div className="flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={cn(
                        "relative rounded-md border px-4 py-2 text-sm transition-colors",
                        topic === t ? "border-ink text-bg" : "border-line hover:border-ink"
                      )}
                    >
                      {topic === t && <motion.span layoutId="contact-topic" className="absolute inset-0 rounded-md bg-ink" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                      <span className="relative">{t}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-10 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm text-muted">Your name</span>
                  <input id="name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" className="field text-xl" placeholder="Jane Doe" />
                </label>
                <label className="block">
                  <span className="text-sm text-muted">Your email</span>
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className="field text-xl" placeholder="jane@example.com" />
                </label>
              </div>
              <label className="block">
                <span className="text-sm text-muted">Your message</span>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  minLength={10}
                  rows={4}
                  className="field resize-none text-xl"
                  placeholder="Hello Clarisya, I'd love to talk about…"
                />
              </label>

              {lastError && (
                <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                  {lastError}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4">
                <Magnetic>
                  <button type="submit" disabled={isSubmitting} className="btn-ink !px-8 !py-4 text-base disabled:opacity-60">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={isSubmitting ? "sending" : sent ? "sent" : "idle"}
                        className="flex items-center gap-2"
                        initial={{ y: 16, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -16, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      >
                        {isSubmitting ? "Sending…" : sent ? "Sent — send another?" : "Send message"}
                        <Send size={16} />
                      </motion.span>
                    </AnimatePresence>
                  </button>
                </Magnetic>
                <p className="text-sm text-muted">Prefer email? Tap the address to copy it.</p>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
