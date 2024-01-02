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

import React, { useState, useEffect, useMemo } from "react";
import { useLanguage } from "./Components/LanguageContext";
// Internal Imports
import Navbar from "./Components/Navbar";
import MathProblemGenerator from "./Components/MathProblemGenerator";
import DrawingBoard from "./Components/DrawingBoard";

// Declare types and translations
interface Tab {
  id: number;
  title: string;
  operation: "addition" | "subtraction" | "multiplication" | "division";
}

const NavWords = {
  en: {
    addition: "Addition",
    subtraction: "Subtraction",
    multiplication: "Multiplication",
    division: "Division",
  },
  es: {
    addition: "Suma",
    subtraction: "Resta",
    multiplication: "Multiplicación",
    division: "División",
  },
  fr: {
    addition: "Ajout",
    subtraction: "Soustraction",
    multiplication: "Multiplication",
    division: "Division",
  },
  // Add more languages as needed
};

// Functional Component
const App: React.FC = () => {
  // Set Language
  const { currentLanguage } = useLanguage();
  const words = NavWords[currentLanguage as keyof typeof NavWords];

  useEffect(() => {
    console.log("Current Language: ", currentLanguage);
  });

  // Load the active index from localStorage or set it to the default value
  const initialActiveIndex = parseInt(
    localStorage.getItem("activeIndex") || "1",
    10
  );
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const tabs: Tab[] = useMemo(
    () => [
      {
        id: 1,
        title: words.addition,
        operation: "addition",
      },
      { id: 2, title: words.subtraction, operation: "subtraction" },
      { id: 3, title: words.multiplication, operation: "multiplication" },
      { id: 4, title: words.division, operation: "division" },
    ],
    [currentLanguage]
  );

  // Saves active index to localStorage
  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    localStorage.setItem("activeIndex", index.toString());
  };

  // Sets document title
  useEffect(() => {
    document.title = `Numeri - ${tabs[activeIndex - 1].title}`;
  }, [activeIndex, tabs]);

  return (
    <>
      <div className="bg-graph-paper min-h-screen">
        <div>
          <Navbar
            tabs={tabs}
            activeIndex={activeIndex}
            onTabClick={handleTabClick}
          />
          <MathProblemGenerator operation={tabs[activeIndex - 1].operation} />
          <DrawingBoard />
        </div>
      </div>
    </>
  );
};

export default App;
