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

const Navbar: React.FC<NavbarProps> = ({
  tabs = [],
  activeIndex,
  onTabClick,
}) => {
  return (
    <div>
      <div className="bg-red-400 flex justify-center space-x-16 px-4 py-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${
              activeIndex === tab.id
                ? "text-white border-b-2 border-white"
                : "hover:text-white hover:border-b-2 hover:border-white"
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
