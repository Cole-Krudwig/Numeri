// Navbar.tsx

import React from "react";

interface Tab {
  id: number;
  title: string;
  operation: "addition" | "subtraction" | "multiplication" | "division";
}

interface NavbarProps {
  tabs: Tab[];
  activeIndex: number;
  onTabClick: (index: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ tabs, activeIndex, onTabClick }) => {
  return (
    <div>
      <div className="bg-indigo-400 flex space-x-8 rounded-lg px-4 py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${
              activeIndex === tab.id
                ? "text-blue-600 border-b-2 border-white"
                : ""
            }`}
            onClick={() => onTabClick(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
