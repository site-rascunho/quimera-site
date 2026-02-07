import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section ref={ref} id="about" className="py-32 relative overflow-hidden">
      {/* Background decorativo (Consistente com a ContactSection) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      <div className="container px-6">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Título Centralizado com Design Moderno */}
          <div className="text-center mb-16">
            <h2 className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4 font-bold">
              {t.about.title}
            </h2>
            <div className="h-1 w-20 bg-primary/30 mx-auto rounded-full" />
          </div>
          
          {/* Descrição Principal com mais destaque */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-display leading-relaxed text-foreground/90 text-center max-w-4xl mx-auto mb-20 text-balance">
            {t.about.description}
          </p>

          {/* Grid de Features Modernizado (Cards) */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="group p-8 rounded-2xl bg-card/30 border border-border/50 hover:border-primary/20 hover:bg-card/50 transition-all duration-300 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Linha animada */}
              <div className="w-12 h-1 bg-foreground/20 mb-6 group-hover:w-20 group-hover:bg-primary transition-all duration-300 rounded-full" />
              
              <h3 className="text-lg font-display font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                {t.about.features.optimization.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {t.about.features.optimization.description}
              </p>
            </motion.div>

            <motion.div
              className="group p-8 rounded-2xl bg-card/30 border border-border/50 hover:border-primary/20 hover:bg-card/50 transition-all duration-300 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="w-12 h-1 bg-foreground/20 mb-6 group-hover:w-20 group-hover:bg-primary transition-all duration-300 rounded-full" />
              
              <h3 className="text-lg font-display font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                {t.about.features.hybrid.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {t.about.features.hybrid.description}
              </p>
            </motion.div>

            <motion.div
              className="group p-8 rounded-2xl bg-card/30 border border-border/50 hover:border-primary/20 hover:bg-card/50 transition-all duration-300 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="w-12 h-1 bg-foreground/20 mb-6 group-hover:w-20 group-hover:bg-primary transition-all duration-300 rounded-full" />
              
              <h3 className="text-lg font-display font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                {t.about.features.scalable.title}
              </h3>
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