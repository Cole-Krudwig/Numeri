import React, { createContext, useState, useContext, ReactNode } from "react";

interface LanguageContextProps {
  children: ReactNode;
}

interface LanguageContextValue {
  currentLanguage: string;
  updateLanguage: (newLanguage: string) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export const LanguageProvider: React.FC<LanguageContextProps> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const updateLanguage = (newLanguage: string) => {
    setCurrentLanguage(newLanguage);
  };

  const value: LanguageContextValue = {
    currentLanguage,
    updateLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
