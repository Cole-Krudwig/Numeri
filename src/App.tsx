import React, { useState, useEffect, useMemo } from "react";
import Navbar from "./Components/Navbar";
import MathProblemGenerator from "./Components/MathProblemGenerator";

interface Tab {
  id: number;
  title: string;
  operation: "addition" | "subtraction" | "multiplication" | "division";
}

const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const tabs: Tab[] = useMemo(
    () => [
      { id: 1, title: "Addition", operation: "addition" },
      { id: 2, title: "Subtraction", operation: "subtraction" },
      { id: 3, title: "Multiplication", operation: "multiplication" },
      { id: 4, title: "Division", operation: "division" },
    ],
    [] // Empty dependency array, since the tabs array does not depend on any props or state
  );

  const handleTabClick = (index: number) => setActiveIndex(index);

  useEffect(() => {
    document.title = `${tabs[activeIndex - 1].title}`;
  }, [activeIndex, tabs]);

  return (
    <div>
      <Navbar
        tabs={tabs}
        activeIndex={activeIndex}
        onTabClick={handleTabClick}
      />
      <MathProblemGenerator operation={tabs[activeIndex - 1].operation} />
    </div>
  );
};

export default App;
