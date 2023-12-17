import React, { useState } from "react";
import { Divide as Hamburger } from "hamburger-react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <div className="bg-red-400 px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo or Branding can be added here */}

          {/* Hamburger Menu Icon */}
          <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
            <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} />
          </div>

          {/* Navigation Links - Shown on larger screens */}
          <div className="hidden lg:flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${
                  activeIndex === tab.id
                    ? "text-white border-b-2 border-white"
                    : "hover:text-white hover:border-b-2 hover:border-white"
                }`}
                onClick={() => {
                  onTabClick(tab.id);
                  closeMenu(); // Close the menu when a tab is clicked on smaller screens
                }}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Hamburger Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`block w-full py-2 ${
                  activeIndex === tab.id
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-300"
                }`}
                onClick={() => {
                  onTabClick(tab.id);
                  closeMenu();
                }}
              >
                {tab.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
