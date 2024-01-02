import React from "react";
// Internal Imports
import { useDifficulty } from "./DifficultyContext";
import { useLanguage } from "./LanguageContext";

// Declare types and languages
type LanguageWords = {
  [key: string]: {
    easy: string;
    medium: string;
    hard: string;
  };
};

const languageWords: LanguageWords = {
  en: {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
  },
  es: {
    easy: "Fácil",
    medium: "Media",
    hard: "Difícl",
  },
  fr: {
    easy: "Facile",
    medium: "Moyenne",
    hard: "Difficile",
  },
};

// Functional Component
const DifficultySwitcher: React.FC = () => {
  const { currentDifficulty, updateDifficulty, difficultyFactors } =
    useDifficulty();

  // Sets current language
  const { currentLanguage } = useLanguage();
  const words = languageWords[currentLanguage as keyof typeof languageWords];

  return (
    <>
      <select
        value={currentDifficulty}
        onChange={(e) => updateDifficulty(e.target.value)}
      >
        <option value="easy">{words?.easy}</option>
        <option value="medium">{words?.medium}</option>
        <option value="hard">{words?.hard}</option>
      </select>
    </>
  );
};

export default DifficultySwitcher;
