import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import quimeraLogo from "@/assets/quimera-logo.png";

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.95)"]
  );
  
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.2]);

  const navItems = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.industries, href: "#industries" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor,
        borderBottom: useTransform(borderOpacity, (v) => `1px solid rgba(255, 255, 255, ${v})`),
      }}
    >
      <div className="container px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center"
            whileHover={{ opacity: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <img src={quimeraLogo} alt="Quimera" className="h-8" />
          </motion.a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-sm font-display tracking-widest uppercase text-foreground/70 hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Language Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage("pt")}
              className={`text-xs font-display tracking-wider px-2 py-1 transition-all ${
                language === "pt"
                  ? "text-foreground border-b border-foreground"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              PT
            </button>
            <span className="text-foreground/30">|</span>
            <button
              onClick={() => setLanguage("en")}
              className={`text-xs font-display tracking-wider px-2 py-1 transition-all ${
                language === "en"
                  ? "text-foreground border-b border-foreground"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
