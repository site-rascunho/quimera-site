import { motion, useScroll, useTransform } from "framer-motion";
import quimeraLogo from "@/assets/quimera-logo.png";
import QuantumGrid from "./QuantumGrid";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  
  // Parallax suave
  const logoY = useTransform(scrollY, [0, 500], [0, 50]);
  const logoOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textY = useTransform(scrollY, [0, 500], [0, 100]);
  const bgOpacity = useTransform(scrollY, [0, 500], [0, 0.6]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-20">
      <QuantumGrid />
      
      <motion.div 
        className="absolute inset-0 bg-background pointer-events-none z-0"
        style={{ opacity: bgOpacity }}
      />

      <div className="container relative z-10 px-6">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* LOGO CONTAINER */}
          <motion.div
            style={{ y: logoY, opacity: logoOpacity }}
            className="relative z-0" 
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.img
                src={quimeraLogo}
                alt="Quimera"
                // Mantendo o logo grande para impacto
                className="w-72 md:w-96 lg:w-[36rem] drop-shadow-2xl opacity-80 mix-blend-screen"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 0.8, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>

          {/* TEXT CONTENT */}
          <motion.div 
            style={{ y: textY }} 
            className="relative z-10 -mt-16 md:-mt-24 lg:-mt-32"
          >
            
            {/* TÍTULO: Fonte Serifada, Itálica e Grande (Elegância Máxima) */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-7xl font-serif italic font-light mb-8 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <span className="bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent drop-shadow-lg">
                {t.hero.tagline.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-3"
                    initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* SUBTÍTULO: Contraste Tech/Minimalista (Uppercase, espaçado) */}
            <motion.p
              className="text-xs md:text-sm text-foreground/80 font-sans uppercase tracking-[0.3em] max-w-lg mx-auto mb-10 leading-loose border-l border-foreground/30 pl-4 text-left md:text-center md:border-l-0 md:pl-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.2 }}
            >
              {t.hero.subtitle}
            </motion.p>

            {/* BOTÃO: Borda Fina (1px) e Estilo Minimalista */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center px-12 py-4 text-xs font-sans font-medium tracking-[0.25em] uppercase text-foreground bg-background/50 border border-foreground/80 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-foreground hover:text-background hover:scale-105"
              >
                {/* Linha decorativa animada no hover */}
                <span className="absolute w-full h-[1px] bg-foreground bottom-0 left-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                
                {/* Efeito Shimmer sutil */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
                
                <span className="relative z-20">{t.hero.cta}</span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicador de Scroll ainda mais fino e minimalista */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
      >
        <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-foreground/40 to-transparent overflow-hidden">
          <motion.div 
            className="w-full h-1/2 bg-foreground shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            animate={{ y: [-20, 50] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;