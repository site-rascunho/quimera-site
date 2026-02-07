import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import quimeraLogo from "@/assets/quimera-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section ref={ref} id="contact" className="py-32 border-t border-border/30">
      <div className="container px-6">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-display tracking-[0.3em] uppercase text-muted-foreground mb-8">
            {t.contact.title}
          </h2>

          <p className="text-2xl md:text-3xl font-display leading-relaxed mb-12">
            {t.contact.description}
          </p>

          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="py-12 border-t border-border/30">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img src={quimeraLogo} alt="Quimera" className="h-8 opacity-70" />
          <p className="text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()} Quimera. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export { ContactSection, Footer };
