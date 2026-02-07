import { motion, useScroll, useTransform } from "framer-motion";
import quimeraLogo from "@/assets/quimera-logo.png";
import QuantumGrid from "./QuantumGrid";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  
  // Parallax mais suave
  const logoY = useTransform(scrollY, [0, 500], [0, 50]);
  const contentY = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background com Grid e Gradientes para profundidade */}
      <div className="absolute inset-0 z-0">
        <QuantumGrid />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-40 pointer-events-none" />
      </div>
      
      <div className="container relative z-10 px-6">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{ opacity }}
        >
          {/* Logo com efeito de flutuação (breathing effect) */}
          <motion.div
            style={{ y: logoY }}
            className="mb-10 relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <motion.div 
                className="absolute inset-0 blur-3xl bg-primary/20 rounded-full opacity-0"
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.img
                src={quimeraLogo}
                alt="Quimera"
                className="w-56 md:w-72 lg:w-80 relative z-10 drop-shadow-2xl"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Conteúdo de Texto */}
          <motion.div style={{ y: contentY }} className="max-w-4xl mx-auto">
            {/* Tagline Principal */}
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight text-foreground mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t.hero.tagline}
            </motion.h1>

            {/* Subtítulo Elegante */}
            <motion.p
              className="text-base md:text-lg text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto mb-12 tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTA Minimalista e Premium */}
            <motion.a
              href="#contact"
              className="group relative inline-flex items-center justify-center px-12 py-4 overflow-hidden rounded-full backdrop-blur-sm bg-background/5 border border-foreground/10 transition-all duration-500 hover:border-foreground/30 hover:bg-background/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              <span className="relative z-10 font-display text-sm tracking-[0.2em] uppercase text-foreground/90 group-hover:text-foreground transition-colors">
                {t.hero.cta}
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator Sutil */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-foreground/50 to-transparent opacity-50" />
      </motion.div>
    </section>
  );
};

export default HeroSection;