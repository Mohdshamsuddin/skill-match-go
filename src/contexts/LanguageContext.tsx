
import React, { createContext, useContext, useState, useEffect } from "react";

type LanguageType = "en" | "hi" | "ta" | "te" | "bn"; // English, Hindi, Tamil, Telugu, Bengali

type Translations = {
  [key: string]: {
    [key in LanguageType]: string;
  };
};

type LanguageContextType = {
  currentLanguage: LanguageType;
  setLanguage: (language: LanguageType) => void;
  translate: (key: string) => string;
  availableLanguages: { code: LanguageType; name: string }[];
};

// Sample translations - in a real app, this would be much more comprehensive
const translations: Translations = {
  "welcome": {
    en: "Welcome to Inclusive Worker",
    hi: "इनक्लूसिव वर्कर में आपका स्वागत है",
    ta: "இன்க்லுசிவ் வொர்க்கர்-க்கு வரவேற்கிறோம்",
    te: "ఇన్క్లూసివ్ వర్కర్ కు స్వాగతం",
    bn: "ইনক্লুসিভ ওয়ার্কারে স্বাগতম",
  },
  "login": {
    en: "Login",
    hi: "लॉगिन",
    ta: "உள்நுழைக",
    te: "లాగిన్",
    bn: "লগইন",
  },
  "register": {
    en: "Register",
    hi: "रजिस्टर",
    ta: "பதிவு",
    te: "నమోదు",
    bn: "নিবন্ধন",
  },
  "email": {
    en: "Email",
    hi: "ईमेल",
    ta: "மின்னஞ்சல்",
    te: "ఇమెయిల్",
    bn: "ইমেইল",
  },
  "password": {
    en: "Password",
    hi: "पासवर्ड",
    ta: "கடவுச்சொல்",
    te: "పాస్వర్డ్",
    bn: "পাসওয়ার্ড",
  },
  "phone": {
    en: "Phone Number",
    hi: "फोन नंबर",
    ta: "தொலைபேசி எண்",
    te: "ఫోన్ నంబర్",
    bn: "ফোন নম্বর",
  },
  "search_jobs": {
    en: "Search Jobs",
    hi: "नौकरी खोजें",
    ta: "வேலைகளைத் தேடுங்கள்",
    te: "ఉద్యోగాలను శోధించండి",
    bn: "চাকরি খুঁজুন",
  },
  "apply": {
    en: "Apply",
    hi: "आवेदन करें",
    ta: "விண்ணப்பிக்கவும்",
    te: "దరఖాస్తు చేసుకోండి",
    bn: "আবেদন করুন",
  },
  "save": {
    en: "Save",
    hi: "सहेजें",
    ta: "சேமி",
    te: "సేవ్",
    bn: "সংরক্ষণ করুন",
  },
};

const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageType>("en");

  const availableLanguages = [
    { code: "en" as LanguageType, name: "English" },
    { code: "hi" as LanguageType, name: "हिंदी" },
    { code: "ta" as LanguageType, name: "தமிழ்" },
    { code: "te" as LanguageType, name: "తెలుగు" },
    { code: "bn" as LanguageType, name: "বাংলা" }
  ];

  // Detect browser language on first load
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as LanguageType;
    
    if (storedLanguage && availableLanguages.some(lang => lang.code === storedLanguage)) {
      setCurrentLanguage(storedLanguage);
    } else {
      const browserLang = navigator.language.split('-')[0];
      const supportedLang = availableLanguages.find(lang => lang.code === browserLang);
      
      if (supportedLang) {
        setCurrentLanguage(supportedLang.code);
      }
    }
  }, []);

  const setLanguage = (language: LanguageType) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

  const translate = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][currentLanguage] || translations[key].en;
  };

  const value = {
    currentLanguage,
    setLanguage,
    translate,
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
