import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import quimeraLogo from "@/assets/quimera-logo-short.png";
import { useEffect, useState } from "react";
import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

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

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300"
      style={{
        backgroundColor,
        borderBottom: useTransform(borderOpacity, (v) => `1px solid rgba(255, 255, 255, ${v})`),
        paddingTop: isScrolled ? "1rem" : "1.5rem",
        paddingBottom: isScrolled ? "1rem" : "1.5rem",
      }}
    >
      <div className="container px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => handleScroll(e, "#")}
            className="flex items-center cursor-pointer"
            whileHover={{ opacity: 0.8, scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img src={quimeraLogo} alt="Quimera" className="h-12 w-auto object-contain" />
          </motion.a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-sm font-display tracking-widest uppercase text-foreground/70 hover:text-foreground transition-colors relative group py-2"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:text-full" />
              </motion.a>
            ))}
          </div>

          {/* Language Selector - Discreet Design */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-display tracking-widest uppercase text-foreground/70 hover:text-foreground hover:bg-white/5 transition-all duration-200 outline-none"
              >
                <Globe className="h-4 w-4" strokeWidth={1.5} />
                {/* Alteração aqui: Removido 'hidden sm:inline-block' para mostrar sempre */}
                <span className="text-xs font-bold">{t.nav.languageLabel}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-background/95 backdrop-blur-md border-border/40 mt-2">
              <DropdownMenuItem 
                onClick={() => setLanguage("pt")}
                className="cursor-pointer flex items-center justify-between text-sm"
              >
                <span>Português</span>
                {language === "pt" && <Check className="h-3.5 w-3.5" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLanguage("en")}
                className="cursor-pointer flex items-center justify-between text-sm"
              >
                <span>English</span>
                {language === "en" && <Check className="h-3.5 w-3.5" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;