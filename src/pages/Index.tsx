import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Freelance } from "@/components/portfolio/Freelance";
import { Experience } from "@/components/portfolio/Experience";
import { Achievements } from "@/components/portfolio/Achievements";
import { CompetitiveProgramming } from "@/components/portfolio/CompetitiveProgramming";
import { Photography } from "@/components/portfolio/Photography";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { useReveal } from "@/hooks/useReveal";

const Index = () => {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <CompetitiveProgramming />
        <Freelance />
        <Photography />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
