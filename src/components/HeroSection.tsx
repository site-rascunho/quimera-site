import { motion, useScroll, useTransform } from "framer-motion";
import quimeraLogo from "@/assets/quimera-logo.png";
import QuantumGrid from "./QuantumGrid";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  
  // Parallax effects refinados
  const logoY = useTransform(scrollY, [0, 500], [0, 100]);
  const logoOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textY = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <QuantumGrid />
      
      {/* Elemento de brilho atmosférico (Ambient Glow) para profundidade */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="container relative z-10 px-6">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {/* Logo with parallax */}
          <motion.div
            style={{ y: logoY, opacity: logoOpacity }}
            className="mb-10 relative"
          >
            {/* Efeito de brilho sutil atrás da logo */}
            <div className="absolute inset-0 bg-foreground/10 blur-3xl rounded-full scale-150 z-[-1]" />
            <motion.img
              src={quimeraLogo}
              alt="Quimera"
              className="w-64 md:w-80 lg:w-96 drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </motion.div>

          {/* Text Content Container */}
          <motion.div style={{ y: textY }} className="flex flex-col items-center">
            {/* Tagline com efeito gradiente premium */}
            <motion.h1
              className="text-xl md:text-2xl lg:text-3xl font-display font-light max-w-3xl mb-6 tracking-wide leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              {t.hero.tagline.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-2 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-sm md:text-base text-muted-foreground font-body max-w-xl mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTA Button: Quadrado e Profissional */}
            <motion.a
              href="#contact"
              className="group relative inline-flex items-center justify-center min-w-[180px] h-[54px] px-8 bg-transparent border border-foreground/20 text-foreground font-display text-xs md:text-sm tracking-[0.2em] uppercase overflow-hidden backdrop-blur-sm transition-colors duration-500 hover:border-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Fundo que desliza no hover */}
              <motion.span
                className="absolute inset-0 bg-foreground"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              
              {/* Texto do botão */}
              <span className="relative z-10 mix-blend-exclusion text-white group-hover:text-black transition-colors duration-300 font-medium">
                {t.hero.cta}
              </span>

              {/* Cantos técnicos (opcional, para dar um toque "tech") */}
              <span className="absolute top-0 left-0 w-2 h-2 border-l border-t border-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-2">Scroll</span>
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-foreground/0 via-foreground/50 to-foreground/0"
          animate={{ scaleY: [0.8, 1.2, 0.8], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;