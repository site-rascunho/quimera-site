import { motion, useScroll, useTransform } from "framer-motion";
import quimeraLogo from "@/assets/quimera-logo.png";
import QuantumGrid from "./QuantumGrid";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  
  // Parallax refinado para funcionar com sticky
  const logoY = useTransform(scrollY, [0, 500], [0, 100]);
  const logoScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const textY = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    // MUDANÇA IMPORTANTE: sticky top-0 h-screen z-0
    // Isso faz o Hero ficar preso no fundo enquanto a AboutSection desliza por cima
    <section className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pt-20 z-0">
      <QuantumGrid />
      
      <div className="container relative z-10 px-6">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Logo with parallax */}
          <motion.div
            style={{ y: logoY, scale: logoScale }}
            className="mb-12"
          >
            <motion.img
              src={quimeraLogo}
              alt="Quimera"
              className="w-72 md:w-96 lg:w-[30rem] drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.div style={{ y: textY }}>
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-body max-w-3xl mb-8 tracking-wide font-light"
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
              className="text-base md:text-lg text-muted-foreground/80 font-body max-w-xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTA */}
            <motion.a
              href="#contact"
              className="group relative inline-block px-12 py-6 border border-foreground/40 text-foreground font-display text-sm tracking-[0.2em] uppercase overflow-hidden backdrop-blur-sm"
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

      {/* Scroll indicator - desaparece ao rolar */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
      >
        <motion.div
          className="w-6 h-10 border border-foreground/30 rounded-full flex justify-center pt-2"
          animate={{ borderColor: ["rgba(255,255,255,0.3)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.3)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-foreground rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;