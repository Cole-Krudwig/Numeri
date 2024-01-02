/*
 * Copyright (c) 2024 Cole Krudwig
 * Email: ckrudwig@gmail.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
    hard: "Difícil",
  },
  fr: {
    easy: "Facile",
    medium: "Moyenne",
    hard: "Difficile",
  },
};

// Functional Component
const DifficultySwitcher: React.FC = () => {
  const { currentDifficulty, updateDifficulty } = useDifficulty();

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
