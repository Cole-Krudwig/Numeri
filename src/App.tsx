import React, { useState, useEffect, useMemo } from "react";
import Navbar from "./Components/Navbar";
import MathProblemGenerator from "./Components/MathProblemGenerator";
import DrawingBoard from "./Components/DrawingBoard";
import { LanguageProvider } from "./Components/LanguageContext";

interface Tab {
  id: number;
  title: string;
  operation: "addition" | "subtraction" | "multiplication" | "division";
}

interface AdditionTextsType {
  en: {
    addition: string;
  };
  fr: {
    addition: string;
  };
}

const App: React.FC = () => {
  // Load the active index from localStorage or set it to the default value
  const initialActiveIndex = parseInt(
    localStorage.getItem("activeIndex") || "1",
    10
  );
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  // Set Language for "Addition" tab
  const AdditionTexts: AdditionTextsType = {
    en: {
      addition: "Addition",
    },
    fr: {
      addition: "Addition (French)",
    },
    // add more languages as needed
  };

  const tabs: Tab[] = useMemo(
    () => [
      {
        id: 1,
        title: "Addition",
        operation: "addition",
      },
      { id: 2, title: "Subtraction", operation: "subtraction" },
      { id: 3, title: "Multiplication", operation: "multiplication" },
      { id: 4, title: "Division", operation: "division" },
    ],
    [] // Empty dependency array, since the tabs array does not depend on any props or state
  );

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    localStorage.setItem("activeIndex", index.toString()); // Save the active index to localStorage
  };

  useEffect(() => {
    document.title = `Numeri - ${tabs[activeIndex - 1].title}`;
  }, [activeIndex, tabs]);

  return (
    <>
      <LanguageProvider>
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
      </LanguageProvider>
    </>
  );
};

export default App;
