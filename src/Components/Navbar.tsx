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
      <div className="flex relative z-50 bg-red-400 px-16 py-4">
        {/* Logo on Large Screens */}
        <div className="flex items-center ml-16 mr-4">
          <img src="CalculatorLogo.png" alt="" width={75} />
        </div>

        {/* Hamburger Menu Icon - Shown on Small Screens */}
        <div
          className="flex lg:hidden justify-end items-center cursor-pointer text-white ml-auto mr-16"
          onClick={toggleMenu}
        >
          <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} />
        </div>

        {/* Navigation Links - Shown on larger screens */}
        <div className="hidden lg:flex items-center justify-end flex-1 space-x-16 text-white text-xl mr-16">
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
      <div
        className={`lg:hidden absolute inset-x-0 top-0 bg-blue-400 px-4 py-4
         ${
           isMenuOpen
             ? "transform translate-y-0 mt-32 duration-500"
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
