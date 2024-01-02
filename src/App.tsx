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
