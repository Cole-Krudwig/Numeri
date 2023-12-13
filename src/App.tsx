// App.tsx

import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import MathProblemGenerator from "./Components/MathProblemGenerator";

interface Tab {
  id: number;
  title: string;
  operation: "addition" | "subtraction" | "multiplication" | "division";
}

const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const tabs: Tab[] = [
    { id: 1, title: "Addition", operation: "addition" },
    { id: 2, title: "Subtraction", operation: "subtraction" },
    { id: 3, title: "Multiplication", operation: "multiplication" },
    { id: 4, title: "Division", operation: "division" },
  ];

  const handleTabClick = (index: number) => setActiveIndex(index);

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
