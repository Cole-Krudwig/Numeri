import React, { useEffect } from "react";
import { useLanguage } from "./LanguageContext";

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, updateLanguage } = useLanguage();

  //useEffect(() => {
  //console.log("Current Language: ", currentLanguage);
  //});

  return (
    <select
      value={currentLanguage}
      onChange={(e) => updateLanguage(e.target.value)}
    >
      <option value="en">English</option>
      <option value="fr">Français</option>
      {/* add more language options as needed */}
    </select>
  );
};

export default LanguageSwitcher;
