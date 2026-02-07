import { motion, useScroll, useTransform } from "framer-motion";
import quimeraLogo from "@/assets/quimera-logo.png";
import QuantumGrid from "./QuantumGrid";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  
  // Parallax effects
  const logoY = useTransform(scrollY, [0, 500], [0, 100]);
  const logoOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textY = useTransform(scrollY, [0, 500], [0, 150]);
  
  // Opacidade do background para dar profundidade ao scrolar
  const bgOpacity = useTransform(scrollY, [0, 500], [0, 0.5]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-40">
      {/* Background Elements */}
      <QuantumGrid />
      
      {/* Overlay gradiente suave que escurece ao rolar */}
      <motion.div 
        className="absolute inset-0 bg-background pointer-events-none z-0"
        style={{ opacity: bgOpacity }}
      />

      {/* Spot de luz ambiental atrás do logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="container relative z-10 px-6">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Logo Container com Floating Animation + Parallax */}
          <motion.div
            style={{ y: logoY, opacity: logoOpacity }}
            className="mb-10 relative"
          >
            {/* Animação de flutuação contínua */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <motion.img
                src={quimeraLogo}
                alt="Quimera"
                className="w-64 md:w-80 lg:w-[30rem] drop-shadow-2xl"
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div style={{ y: textY }} className="relative">
            
            {/* Tagline com efeito de Gradiente de Texto */}
            <motion.h1
              className="text-2xl md:text-3xl lg:text-4xl font-display max-w-3xl mb-8 tracking-wide leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <span className="bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50 bg-clip-text text-transparent drop-shadow-sm">
                {t.hero.tagline.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-2"
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Subtitle mais sutil */}
            <motion.p
              className="text-sm md:text-base text-muted-foreground/80 font-body max-w-xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTA Button "Futurista" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center px-12 py-4 text-sm font-display tracking-[0.2em] uppercase text-background bg-foreground overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
              >
                {/* Efeito de brilho passando (Shimmer) */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                
                <span className="relative z-20">{t.hero.cta}</span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator Minimalista */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">Scroll</span>
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-foreground/0 via-foreground/50 to-foreground/0"
          animate={{ scaleY: [0.5, 1.5, 0.5], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;