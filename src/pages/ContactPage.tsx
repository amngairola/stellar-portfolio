import { Contact } from "@/components/portfolio/Contact";
import { useReveal } from "@/hooks/useReveal";

const ContactPage = () => {
  useReveal();
  return (
    <div className="pt-24">
      <Contact />
    </div>
  );
};

export default ContactPage;