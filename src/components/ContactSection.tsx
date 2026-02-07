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
    <footer className="pt-20 pb-10 border-t border-border/40 bg-background/50 relative z-10 backdrop-blur-sm">
      <div className="container px-6 mx-auto">
        
        {/* Grid Principal do Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Coluna 1: Marca */}
          <div className="md:col-span-1 flex flex-col items-start gap-4">
            <img src={quimeraLogo} alt="Quimera" className="h-14 w-auto opacity-90" /> {/* Logo aumentada para h-14 */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              Soluções de ponta em computação quântica e inteligência artificial.
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase text-foreground/80">Menu</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Início</a></li>
              <li><a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sobre</a></li>
              <li><a href="#industries" className="text-sm text-muted-foreground hover:text-primary transition-colors">Indústrias</a></li>
              <li><a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase text-foreground/80">Contato</h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">contato@quimera.com</li>
              <li className="text-sm text-muted-foreground">+55 83 99999-9999</li>
              <li className="text-sm text-muted-foreground">João Pessoa, PB - Brasil</li>
            </ul>
          </div>

          {/* Coluna 4: Redes (Placeholders) */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase text-foreground/80">Social</h4>
            <div className="flex gap-3">
              {/* Botões sociais simulados */}
              <a href="#" className="w-10 h-10 rounded-md border border-border bg-card flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300">
                in
              </a>
              <a href="#" className="w-10 h-10 rounded-md border border-border bg-card flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300">
                ig
              </a>
              <a href="#" className="w-10 h-10 rounded-md border border-border bg-card flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300">
                gh
              </a>
            </div>
          </div>
        </div>

        {/* Rodapé Inferior */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()} Quimera. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Termos de Uso</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { ContactSection, Footer };