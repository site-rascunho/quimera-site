import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Truck, TrendingUp, Zap, Factory, LucideIcon } from "lucide-react";

const IndustriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const iconMap: Record<string, LucideIcon> = {
    logistics: Truck,
    finance: TrendingUp,
    energy: Zap,
    manufacturing: Factory,
  };

  const industries = [
    { key: "logistics", ...t.industries.logistics },
    { key: "finance", ...t.industries.finance },
    { key: "energy", ...t.industries.energy },
    { key: "manufacturing", ...t.industries.manufacturing },
  ];

  return (
    <section ref={ref} id="industries" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background decorativo geométrico (mantido quadrado) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      <div className="container px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4 font-bold">
            {t.industries.title}
          </h2>
          {/* Linha decorativa quadrada */}
          <div className="h-1 w-20 bg-primary/30 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => {
            const Icon = iconMap[industry.key] || Factory;

            return (
              <motion.div
                key={industry.key}
                className="group relative bg-card border border-border/50 hover:border-primary/50 p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Ícone com fundo ARREDONDADO (rounded-2xl) */}
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-secondary/50 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon size={32} strokeWidth={1.5} />
                </div>

                <div className="space-y-4">
                  <div className="flex items-baseline justify-between border-b border-border/30 pb-4">
                    <h3 className="text-xl font-display font-medium group-hover:text-primary transition-colors">
                      {industry.title}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground/40 group-hover:text-muted-foreground/60">
                      0{index + 1}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {industry.description}
                  </p>
                </div>
                
                {/* Efeito hover quadrado no card */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Detalhes técnicos nos cantos (mantidos) */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;