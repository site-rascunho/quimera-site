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

  return (
    // ADICIONADO: 'pb-40' para criar espaço extra no final da seção,
    // permitindo que o conteúdo desça com o parallax sem ser cortado pelo overflow-hidden.
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-40">
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
            style={{ y: logoY, opacity: logoOpacity }}
            className="mb-12"
          >
            <motion.img
              src={quimeraLogo}
              alt="Quimera"
              className="w-64 md:w-80 lg:w-96"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            />
          </motion.div>

          {/* Tagline with stagger effect */}
          <motion.div style={{ y: textY }}>
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-body max-w-2xl mb-8 tracking-wide"
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
              className="text-sm md:text-base text-muted-foreground/70 font-body max-w-xl mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTA with enhanced hover */}
            <motion.a
              href="#contact"
              className="group relative inline-block px-10 py-5 border border-foreground/30 text-foreground font-display text-sm tracking-widest uppercase overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute inset-0 bg-foreground"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <span className="relative z-10 group-hover:text-background transition-colors duration-300">
                {t.hero.cta}
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border border-foreground/30 rounded-full flex justify-center pt-2"
          animate={{ borderColor: ["rgba(255,255,255,0.3)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.3)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-foreground/50 rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;