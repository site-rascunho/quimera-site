import { createContext, useContext, useState, ReactNode } from "react";

type Language = "pt" | "en";

interface Translations {
  nav: {
    about: string;
    industries: string;
    contact: string;
    languageLabel: string;
  };
  hero: {
    tagline: string;
    subtitle: string;
    cta: string;
  };
  about: {
    title: string;
    description: string;
    features: {
      optimization: { title: string; description: string };
      hybrid: { title: string; description: string };
      scalable: { title: string; description: string };
    };
  };
  industries: {
    title: string;
    logistics: { title: string; description: string };
    finance: { title: string; description: string };
    energy: { title: string; description: string };
    manufacturing: { title: string; description: string };
  };
  contact: {
    title: string;
    description: string;
    form: {
      name: string;
      email: string;
      phone: string;
      phonePlaceholder: string;
      jobTitle: string;
      industryLabel: string;
      preferredChannelLabel: string;
      channelWhatsapp: string;
      channelEmail: string;
      company: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  footer: {
    rights: string;
  };
}

const translations: Record<Language, Translations> = {
  pt: {
    nav: {
      about: "Sobre",
      industries: "Indústrias",
      contact: "Contato",
      languageLabel: "Idioma",
    },
    hero: {
      tagline: "Algoritmos quantum-inspired de otimização para a indústria do futuro",
      subtitle: "Rodando em HPCs e computadores quânticos",
      cta: "Fale Conosco",
    },
    about: {
      title: "O que fazemos",
      description: "Desenvolvemos algoritmos de otimização inspirados na computação quântica que resolvem problemas complexos de forma mais eficiente que métodos tradicionais.",
      features: {
        optimization: {
          title: "Otimização Avançada",
          description: "Algoritmos que encontram soluções ótimas em espaços de busca complexos",
        },
        hybrid: {
          title: "Computação Híbrida",
          description: "Execução em HPCs clássicos e computadores quânticos reais",
        },
        scalable: {
          title: "Escalabilidade",
          description: "Soluções que crescem com a complexidade do seu problema",
        },
      },
    },
    industries: {
      title: "Indústrias",
      logistics: {
        title: "Logística",
        description: "Otimização de rotas, gestão de frotas e cadeia de suprimentos",
      },
      finance: {
        title: "Finanças",
        description: "Otimização de portfólios, análise de risco e precificação",
      },
      energy: {
        title: "Energia",
        description: "Gestão de redes elétricas e otimização de recursos",
      },
      manufacturing: {
        title: "Manufatura",
        description: "Scheduling de produção e otimização de processos",
      },
    },
    contact: {
      title: "Contato",
      description: "Pronto para otimizar seus processos com o poder da computação quântica?",
      form: {
        name: "Nome",
        email: "Email",
        phone: "Celular",
        phonePlaceholder: "+55 (xx) 12345-6789",
        jobTitle: "Cargo",
        industryLabel: "Indústria",
        preferredChannelLabel: "Preferência de contato",
        channelWhatsapp: "WhatsApp",
        channelEmail: "Email",
        company: "Empresa",
        message: "Mensagem",
        messagePlaceholder: "Conte-nos mais sobre o que você precisa...",
        submit: "Enviar Mensagem",
        sending: "Enviando...",
        success: "Mensagem enviada com sucesso!",
        error: "Erro ao enviar mensagem. Tente novamente.",
      },
    },
    footer: {
      rights: "Todos os direitos reservados.",
    },
  },
  en: {
    nav: {
      about: "About",
      industries: "Industries",
      contact: "Contact",
      languageLabel: "Language",
    },
    hero: {
      tagline: "Quantum-inspired optimization algorithms for the industry of the future",
      subtitle: "Running on HPCs and quantum computers",
      cta: "Contact Us",
    },
    about: {
      title: "What we do",
      description: "We develop quantum-inspired optimization algorithms that solve complex problems more efficiently than traditional methods.",
      features: {
        optimization: {
          title: "Advanced Optimization",
          description: "Algorithms that find optimal solutions in complex search spaces",
        },
        hybrid: {
          title: "Hybrid Computing",
          description: "Execution on classical HPCs and real quantum computers",
        },
        scalable: {
          title: "Scalability",
          description: "Solutions that grow with the complexity of your problem",
        },
      },
    },
    industries: {
      title: "Industries",
      logistics: {
        title: "Logistics",
        description: "Route optimization, fleet management and supply chain",
      },
      finance: {
        title: "Finance",
        description: "Portfolio optimization, risk analysis and pricing",
      },
      energy: {
        title: "Energy",
        description: "Grid management and resource optimization",
      },
      manufacturing: {
        title: "Manufacturing",
        description: "Production scheduling and process optimization",
      },
    },
    contact: {
      title: "Contact",
      description: "Ready to optimize your processes with the power of quantum computing?",
      form: {
        name: "Name",
        email: "Email",
        phone: "Mobile Phone",
        phonePlaceholder: "+1-212-456-7890",
        jobTitle: "Job Title",
        industryLabel: "Industry",
        preferredChannelLabel: "Preferred contact method",
        channelWhatsapp: "WhatsApp",
        channelEmail: "Email",
        company: "Company",
        message: "Message",
        messagePlaceholder: "Tell us more about what you need...",
        submit: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully!",
        error: "Error sending message. Please try again.",
      },
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en"); // Alterado para "en"

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};