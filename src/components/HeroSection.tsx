import { motion } from "framer-motion";
import quimeraLogo from "@/assets/quimera-logo.png";
import QuantumGrid from "./QuantumGrid";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* Fixed hero that stays in place while content scrolls over it */}
      <section className="fixed inset-0 w-full h-screen flex items-center justify-center overflow-hidden z-0">
        <QuantumGrid />

        <div className="container relative z-10 px-6">
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            {/* Decorative line above logo */}
            <motion.div
              className="w-px h-16 bg-gradient-to-b from-transparent via-foreground/40 to-foreground/10 mb-8"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
            />

            {/* Logo */}
            <motion.div className="mb-10">
              <motion.img
                src={quimeraLogo}
                alt="Quimera"
                className="w-64 md:w-80 lg:w-96"
                initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
              />
            </motion.div>

            {/* Tagline with stagger effect */}
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-body max-w-2xl mb-6 tracking-wide"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            >
              {t.hero.tagline.split(" ").map((word: string, i: number) => (
                <motion.span
                  key={i}
                  className="inline-block mr-2"
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.06 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            {/* Subtitle */}
            <motion.p
              className="text-sm md:text-base text-muted-foreground/60 font-body max-w-xl mb-14 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTA with enhanced hover */}
            <motion.a
              href="#contact"
              className="group relative inline-block px-12 py-5 border border-foreground/20 text-foreground font-display text-xs tracking-[0.25em] uppercase overflow-hidden backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 bg-foreground"
                initial={{ x: "-101%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              />
              <span className="relative z-10 group-hover:text-background transition-colors duration-300">
                {t.hero.cta}
              </span>
            </motion.a>
          </motion.div>
        </div>

        {/* Enhanced scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <motion.span
            className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 font-display"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Scroll
          </motion.span>
          <motion.div
            className="w-5 h-9 border border-foreground/20 rounded-full flex justify-center pt-2"
          >
            <motion.div
              className="w-0.5 h-1.5 bg-foreground/40 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [0.8, 0.2, 0.8] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Bottom fade for smooth transition to content */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
      </section>

      {/* Spacer to push content below the fixed hero */}
      <div className="h-screen" />
    </>
  );
};

export default HeroSection;
