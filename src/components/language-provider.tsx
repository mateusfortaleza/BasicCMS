"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type LanguageContextValue = {
  selectedLanguage: string;
  setSelectedLanguage: (langCode: string) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  return (
    <LanguageContext.Provider
      value={{ selectedLanguage, setSelectedLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
