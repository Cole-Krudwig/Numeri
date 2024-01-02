/*
 * Copyright (c) 2024 Cole Krudwig
 * Email: ckrudwig@gmail.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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

// Functional Component
export const LanguageProvider: React.FC<LanguageContextProps> = ({
  children,
}) => {
  const storedLanguage = localStorage.getItem("currentLanguage");
  const initialLanguage = storedLanguage || "en"; // Use "en" as the default if not stored

  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage);

  const updateLanguage = (newLanguage: string) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem("currentLanguage", newLanguage);
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
