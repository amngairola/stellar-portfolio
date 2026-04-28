import { FormEvent, useState } from "react";
import { Download, Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { personal } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-surface/50 relative">
      <div className="container">
        <SectionHeading eyebrow="06 — Contact" title="Let's build something great." desc="I'm open to full-time roles, internships, and freelance collaborations. The fastest way to reach me is email or LinkedIn." />

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 reveal space-y-3">
            <a href={`mailto:${personal.email}`} className="glass rounded-xl p-4 flex items-center gap-3 hover:border-primary/40 transition-colors block">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Mail className="w-5 h-5" /></div>
              <div>
                <div className="text-xs text-muted-foreground font-mono">EMAIL</div>
                <div className="text-sm font-medium">{personal.email}</div>
              </div>
            </a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="glass rounded-xl p-4 flex items-center gap-3 hover:border-primary/40 transition-colors block">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Linkedin className="w-5 h-5" /></div>
              <div>
                <div className="text-xs text-muted-foreground font-mono">LINKEDIN</div>
                <div className="text-sm font-medium">aman-gairola</div>
              </div>
            </a>
            <a href={personal.github} target="_blank" rel="noreferrer" className="glass rounded-xl p-4 flex items-center gap-3 hover:border-primary/40 transition-colors block">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Github className="w-5 h-5" /></div>
              <div>
                <div className="text-xs text-muted-foreground font-mono">GITHUB</div>
                <div className="text-sm font-medium">@amngairola</div>
              </div>
            </a>
            <div className="glass rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><MapPin className="w-5 h-5" /></div>
              <div>
                <div className="text-xs text-muted-foreground font-mono">LOCATION</div>
                <div className="text-sm font-medium">{personal.location}</div>
              </div>
            </div>
            <Button asChild className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
              <a href={personal.resumeUrl} download>
                <Download className="w-4 h-4 mr-1.5" /> Download Resume
              </a>
            </Button>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-3 reveal glass rounded-2xl p-6 md:p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-1.5 block">NAME</label>
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="bg-background border-border focus-visible:ring-primary" />
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-1.5 block">EMAIL</label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="bg-background border-border focus-visible:ring-primary" />
              </div>
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1.5 block">MESSAGE</label>
              <Textarea rows={6} value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell me about your project or role…" className="bg-background border-border focus-visible:ring-primary resize-none" />
            </div>
            <Button type="submit" size="lg" className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
              <Send className="w-4 h-4 mr-1.5" /> Send Message
            </Button>
            <p className="text-xs text-muted-foreground text-center">Submitting opens your default email client with the message prefilled.</p>
          </form>
        </div>
      </div>
    </section>
  );
};
