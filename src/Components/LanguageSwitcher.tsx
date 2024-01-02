import React, { useEffect } from "react";
// Internal Imports
import { useLanguage } from "./LanguageContext";

// Functional Component
const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, updateLanguage } = useLanguage();

  // To log current language
  //useEffect(() => {
  //console.log("Current Language: ", currentLanguage);
  //});

  return (
    <>
      <select
        value={currentLanguage}
        onChange={(e) => updateLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>

        {/* add more language options as needed */}
      </select>
    </>
  );
};

export default LanguageSwitcher;
