import { motion, useScroll, useTransform } from "framer-motion";
import quimeraLogo from "@/assets/quimera-logo.png";
import QuantumGrid from "./QuantumGrid";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  
  // Ajustei o parallax para ser um pouco mais sutil dado o tamanho maior da logo
  const logoY = useTransform(scrollY, [0, 500], [0, 80]);
  const logoOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textY = useTransform(scrollY, [0, 500], [0, 120]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <QuantumGrid />
      
      <div className="container relative z-10 px-6">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Logo with parallax and enhanced size/glow */}
          <motion.div
            style={{ y: logoY, opacity: logoOpacity }}
            className="mb-10"
          >
            <motion.img
              src={quimeraLogo}
              alt="Quimera"
              // Aumentei os tamanhos aqui (w-80, w-96, w-[32rem])
              className="w-80 md:w-96 lg:w-[32rem] drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            />
          </motion.div>

          {/* Tagline with stagger effect - Fonte levemente aumentada para impacto */}
          <motion.div style={{ y: textY }}>
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-body max-w-3xl mb-10 tracking-wide leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              {t.hero.tagline.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.05 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            {/* Subtitle */}
            <motion.p
              className="text-base md:text-lg text-muted-foreground/80 font-body max-w-xl mx-auto mb-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTA with enhanced hover - Mantido quadrado e mais robusto */}
            <motion.a
              href="#contact"
              className="group relative inline-block px-12 py-6 border-2 border-foreground/30 text-foreground font-display text-base tracking-[0.2em] uppercase overflow-hidden backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute inset-0 bg-foreground"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <span className="relative z-10 group-hover:text-background transition-colors duration-300 font-bold">
                {t.hero.cta}
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator removido conforme solicitado */}
    </section>
  );
};

export default HeroSection;