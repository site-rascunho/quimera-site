import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const IndustriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const industries = [
    { key: "logistics", ...t.industries.logistics },
    { key: "finance", ...t.industries.finance },
    { key: "energy", ...t.industries.energy },
    { key: "manufacturing", ...t.industries.manufacturing },
  ];

  return (
    <section ref={ref} id="industries" className="py-32 border-t border-border/30">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-display tracking-[0.3em] uppercase text-muted-foreground mb-16">
            {t.industries.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-px bg-border/30">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.key}
                className="bg-background p-8 md:p-12 group hover:bg-secondary/30 transition-colors duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <span className="text-xs font-body text-muted-foreground/50 mb-4 block">
                  0{index + 1}
                </span>
                <h3 className="text-xl md:text-2xl font-display mb-3 group-hover:text-gradient transition-all">
                  {industry.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm">
                  {industry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesSection;
