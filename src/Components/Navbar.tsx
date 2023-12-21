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
      <div className="flex relative z-50 bg-custom-red px-16 py-4 h-32">
        {/* Logo on Large Screens */}

        <div className="flex items-center sm:ml-16">
          <img src="CalculatorLogo2.png" alt="" width={75} />
          <span className="hidden md:flex ml-16 text-white text-5xl">
            <div className="font-bold">Numeri</div>
          </span>
        </div>

        {/* Hamburger Menu Icon - Shown on Small Screens */}
        <div
          className="flex xl:hidden justify-end items-center cursor-pointer text-white ml-auto sm:mr-16"
          onClick={toggleMenu}
        >
          <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} />
        </div>

        {/* Navigation Links - Shown on larger screens */}
        <div className="hidden xl:flex items-center justify-end flex-1 space-x-16 text-white text-xl mr-16">
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
        className={`xl:hidden absolute inset-x-0 top-0 bg-custom-red px-4 py-4
         ${
           isMenuOpen
             ? "transform translate-y-0 mt-32 duration-500"
             : "transform -translate-y-full duration-500"
         }`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`block w-full py-4 text-white text-lg ${
              activeIndex === tab.id
                ? "bg-custom-yellow rounded-lg text-white"
                : "hover:bg-gray-300 rounded-lg"
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
