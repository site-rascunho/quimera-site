import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import ContactForm from "./ContactForm";
import quimeraLogo from "@/assets/quimera-logo.png";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section ref={ref} id="contact" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background decorativo geométrico */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      <div className="container px-6 mx-auto">
        {/* Título Padronizado com o novo Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4 font-bold">
            {t.contact.title}
          </h2>
          <div className="h-1 w-20 bg-primary/30 mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto bg-card border border-border/50 p-8 shadow-sm hover:shadow-md transition-shadow duration-300 relative group"
        >
           {/* Detalhes técnicos nos cantos do card */}
           <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
           
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="py-12 border-t border-border/30 bg-background relative z-10">
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