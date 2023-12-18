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
    <>
      <div className="relative z-50 bg-red-400 px-4 py-4">
        <div className="flex justify-center items-center">
          {/* Logo or Branding can be added here */}

          {/* Hamburger Menu Icon */}
          <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
            <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} />
          </div>

          {/* Navigation Links - Shown on larger screens */}

          <div className="hidden lg:flex space-x-16 text-white">
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
      </div>

      {/* Responsive Hamburger Menu */}
      <div
        className={`lg:hidden absolute inset-x-0 top-0 bg-blue-400 px-4 py-4
         ${
           isMenuOpen
             ? "transform translate-y-0 mt-20 duration-500"
             : "transform -translate-y-full duration-500"
         }`}
      >
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
    </>
  );
};

export default Navbar;
