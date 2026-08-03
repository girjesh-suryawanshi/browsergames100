import SEO from "@/components/SEO";
import { useState } from "react";
import { Mail, MessageSquare, Gamepad2, Bug, Shield, CheckCircle2, Loader2 } from "lucide-react";

const CONTACT_EMAIL = "support@cloudplayhub.com";

const SUBJECTS = [
  { value: "general", label: "General Question" },
  { value: "bug", label: "Bug / Technical Issue" },
  { value: "game-suggest", label: "Suggest a Game" },
  { value: "game-report", label: "Report a Game" },
  { value: "dmca", label: "Copyright / DMCA Notice" },
  { value: "advertising", label: "Advertising Inquiry" },
  { value: "other", label: "Other" },
];

const CONTACT_CARDS = [
  {
    icon: <Bug className="w-5 h-5 text-gaming-cyan" />,
    bg: "bg-gaming-cyan/10 border-gaming-cyan/20",
    color: "text-gaming-cyan",
    title: "Technical Support",
    desc: "Game not loading? Something broken? Let us know and we'll look into it.",
  },
  {
    icon: <Gamepad2 className="w-5 h-5 text-primary" />,
    bg: "bg-primary/10 border-primary/20",
    color: "text-primary",
    title: "Game Suggestions",
    desc: "Know a great game we don't have? Tell us the title and we'll review it.",
  },
  {
    icon: <Shield className="w-5 h-5 text-gaming-yellow" />,
    bg: "bg-gaming-yellow/10 border-gaming-yellow/20",
    color: "text-gaming-yellow",
    title: "DMCA & Copyright",
    desc: "For copyright notices, email dmca@cloudplayhub.com directly for fastest processing.",
  },
  {
    icon: <Mail className="w-5 h-5 text-gaming-pink" />,
    bg: "bg-gaming-pink/10 border-gaming-pink/20",
    color: "text-gaming-pink",
    title: "Business Inquiries",
    desc: "Advertising partnerships, developer collaborations, and press enquiries.",
  },
];

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const subjectLabel = SUBJECTS.find((s) => s.value === formData.subject)?.label || formData.subject;
    const mailtoSubject = encodeURIComponent(`[BrowserGames100] ${subjectLabel} — from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${subjectLabel}\n\n${formData.message}`
    );

    // Open the user's email client with the form pre-filled
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Show success state after a brief delay
    setTimeout(() => setStatus("sent"), 800);
  };

  return (
    <div className="min-h-screen py-12">
      <SEO
        title="Contact Us — BrowserGames100"
        description="Get in touch with the BrowserGames100 team. Report bugs, suggest games, submit DMCA notices, or ask any question. We respond within 48–72 hours."
        canonical="/contact"
        breadcrumbs={breadcrumbs}
      />
      <div className="container max-w-4xl">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Support</span>
          </div>
          <h1 className="text-4xl font-black mb-3 text-foreground">Contact Us</h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            We're a small team, but we read every message. Tell us what's on your mind and
            we'll get back to you as soon as we can.
          </p>
        </div>

        {/* Contact type cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {CONTACT_CARDS.map(({ icon, bg, color, title, desc }) => (
            <div key={title} className={`p-4 rounded-xl border ${bg} flex gap-3`}>
              <div className={`w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0`}>
                {icon}
              </div>
              <div>
                <p className={`font-bold text-sm ${color} mb-0.5`}>{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-card rounded-2xl border border-border/50 p-6 md:p-8">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Send Us a Message
          </h2>

          {status === "sent" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Message Prepared!</h3>
              <p className="text-muted-foreground max-w-sm">
                Your email client has been opened with your message pre-filled. 
                Once you send it, we'll respond within 48–72 business hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 text-sm text-primary hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">
                    Your Email <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-1.5">
                  Subject <span className="text-primary">*</span>
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your question, issue, or suggestion in as much detail as possible..."
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground text-sm resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity shadow-glow flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Opening Email…</>
                  ) : (
                    <><Mail className="w-4 h-4" /> Send Message</>
                  )}
                </button>
                <p className="text-xs text-muted-foreground">
                  Or email us directly:{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>

              <p className="text-xs text-muted-foreground/70 border-t border-border/40 pt-4">
                We typically respond within <strong className="text-foreground">48–72 business hours</strong>.
                For copyright/DMCA matters, please email{" "}
                <a href="mailto:dmca@cloudplayhub.com" className="text-primary hover:underline">
                  dmca@cloudplayhub.com
                </a>{" "}
                for the fastest response.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}