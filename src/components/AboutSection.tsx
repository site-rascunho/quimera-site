import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section ref={ref} id="about" className="py-32 border-t border-border/30">
      <div className="container px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-display tracking-[0.3em] uppercase text-muted-foreground mb-8">
            {t.about.title}
          </h2>
          
          <p className="text-2xl md:text-3xl lg:text-4xl font-display leading-relaxed text-foreground/90">
            {t.about.description}
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-12">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-12 h-px bg-foreground/30" />
              <h3 className="text-lg font-display">{t.about.features.optimization.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {t.about.features.optimization.description}
              </p>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="w-12 h-px bg-foreground/30" />
              <h3 className="text-lg font-display">{t.about.features.hybrid.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {t.about.features.hybrid.description}
              </p>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="w-12 h-px bg-foreground/30" />
              <h3 className="text-lg font-display">{t.about.features.scalable.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {t.about.features.scalable.description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
