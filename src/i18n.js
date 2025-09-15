import React, { createContext, useContext, useMemo, useState } from "react";

const I18nContext = createContext({
  language: "en",
  setLanguage: () => {},
  t: (key) => key
});

const translations = {
  en: {
    hero: {
      title: "Transforming Punjab Agriculture with Technology",
      subtitle: "Your one-stop solution for crop advice, market prices, government schemes, and modern farming techniques"
    },
    quick: {
      title: "Quick Access"
    },
    market: {
      title: "Real-Time Market Prices",
      cta: "Check Prices",
      selectDistrict: "Select District",
      selectCrop: "Select Crop"
    },
    schemes: {
      title: "Government Schemes",
      cta: "View All Schemes"
    },
    transport: {
      title: "Shared Transport Facility",
      cta: "Find Transport Partners"
    },
    coldStorage: {
      title: "Cold Storage Locator",
      cta: "Find Cold Storage"
    }
  },
  hi: {
    hero: {
      title: "प्रौद्योगिकी के साथ पंजाब की कृषि में बदलाव",
      subtitle: "फसल सलाह, बाजार भाव, सरकारी योजनाएं और आधुनिक खेती के लिए एक ही स्थान पर समाधान"
    },
    quick: {
      title: "त्वरित पहुँच"
    },
    market: {
      title: "रीयल-टाइम बाजार भाव",
      cta: "भाव देखें",
      selectDistrict: "जिला चुनें",
      selectCrop: "फसल चुनें"
    },
    schemes: {
      title: "सरकारी योजनाएं",
      cta: "सभी योजनाएं देखें"
    },
    transport: {
      title: "साझा परिवहन सुविधा",
      cta: "परिवहन साझेदार खोजें"
    },
    coldStorage: {
      title: "कोल्ड स्टोरेज लोकेटर",
      cta: "कोल्ड स्टोरेज खोजें"
    }
  },
  pa: {
    hero: {
      title: "ਤਕਨੀਕ ਨਾਲ ਪੰਜਾਬ ਦੀ ਖੇਤੀਬਾੜੀ ਵਿੱਚ ਬਦਲਾਅ",
      subtitle: "ਫਸਲ ਸਲਾਹ, ਮੰਡੀ ਭਾਅ, ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਅਤੇ ਆਧੁਨਿਕ ਖੇਤੀ ਲਈ ਇਕੋ ਥਾਂ ਹੱਲ"
    },
    quick: {
      title: "ਤੁਰੰਤ ਪਹੁੰਚ"
    },
    market: {
      title: "ਰੀਅਲ-ਟਾਈਮ ਮੰਡੀ ਭਾਅ",
      cta: "ਭਾਅ ਵੇਖੋ",
      selectDistrict: "ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ",
      selectCrop: "ਫਸਲ ਚੁਣੋ"
    },
    schemes: {
      title: "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ",
      cta: "ਸਾਰੀਆਂ ਯੋਜਨਾਵਾਂ ਵੇਖੋ"
    },
    transport: {
      title: "ਸਾਂਝੀ ਆਵਾਜਾਈ ਸੁਵਿਧਾ",
      cta: "ਆਵਾਜਾਈ ਸਾਥੀ ਲੱਭੋ"
    },
    coldStorage: {
      title: "ਕੋਲਡ ਸਟੋਰੇਜ ਲੋਕੇਟਰ",
      cta: "ਕੋਲਡ ਸਟੋਰੇਜ ਲੱਭੋ"
    }
  }
};

export function I18nProvider({ children, defaultLanguage = "en" }) {
  const [language, setLanguage] = useState(defaultLanguage);

  const t = useMemo(() => {
    return (key) => {
      if (!key) return "";
      const parts = String(key).split(".");
      let node = translations[language] || translations.en;
      for (const p of parts) {
        if (node && typeof node === "object" && p in node) {
          node = node[p];
        } else {
          // fallback: try English
          let fallback = translations.en;
          for (const fp of parts) {
            if (fallback && typeof fallback === "object" && fp in fallback) {
              fallback = fallback[fp];
            } else {
              fallback = key;
              break;
            }
          }
          return typeof fallback === "string" ? fallback : key;
        }
      }
      return typeof node === "string" ? node : key;
    };
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
