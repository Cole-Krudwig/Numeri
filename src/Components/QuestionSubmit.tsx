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

import React, { useState, ChangeEvent, KeyboardEvent } from "react";
// Internal Imports
import { useLanguage } from "./LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import DifficultySwitcher from "./DifficultySwitcher";

// Declare types and languages
type LanguageWords = {
  [key: string]: {
    submit: string;
    correct: string;
    incorrect: string;
  };
};

const languageWords: LanguageWords = {
  en: {
    submit: "Submit",
    correct: "Correct! Well done!",
    incorrect: "Incorrect. Try again.",
  },
  es: {
    submit: "Enviar",
    correct: "Correcto. buen trabajo.",
    incorrect: "Incorrecto. Intentar otra vez.",
  },
  fr: {
    submit: "Soumettre",
    correct: "Correct. Bien joué.",
    incorrect: "Incorrect. Essayer à nouveau.",
  },
};

interface MathOperationInputProps {
  num1: number;
  num2: number;
  answer: number;
  onCorrectAnswer: () => void;
  operation: string;
}

// Functional Component
const MathOperationInput: React.FC<MathOperationInputProps> = ({
  num1,
  num2,
  answer,
  onCorrectAnswer,
  operation,
}) => {
  // Sets language
  const { currentLanguage } = useLanguage();
  const words = languageWords[currentLanguage as keyof typeof languageWords];
  // Sets user answer
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(0);
  // Checks answer
  const handleCheckAnswer = () => {
    const parsedAnswer = parseInt(userAnswer, 10);

    //console.log("Parsed Answer:", parsedAnswer);
    //console.log("Current Problem Answer:", answer);

    // Checks answer
    if (!isNaN(parsedAnswer) && parsedAnswer === answer) {
      setResult(1);
      setUserAnswer(""); // Clear the answer input
      onCorrectAnswer(); // Trigger callback for correct answer
    } else {
      setResult(2);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };
  // Allows for enter key
  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCheckAnswer();
    }
  };

  return (
    <>
      <div className="bg-custom-gray p-4 text-center w-screen h-40">
        <div className="xs:flex justify-center">
          <p className="text-2xl font-bold mb-2 mt-1">
            {num1}{" "}
            {operation === "addition"
              ? "+"
              : operation === "subtraction"
              ? "-"
              : operation === "multiplication"
              ? "x"
              : operation === "division"
              ? "÷"
              : ""}{" "}
            {num2} = &nbsp;
          </p>
          <div>
            <div className="flex justify-center mb-4">
              <input
                type="text"
                className="border p-2 mr-2"
                value={userAnswer}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
              />
              <button
                className="bg-custom-salmon text-white px-4 py-2 rounded font-bold"
                onClick={handleCheckAnswer}
              >
                {words?.submit}
              </button>
            </div>
          </div>
        </div>
        <div className="space-x-4">
          <LanguageSwitcher />
          <DifficultySwitcher />
        </div>
        <p className="mt-2 mb-2 xs:mt-6 font-bold">
          {(result === 1 && words?.correct) ||
            (result === 2 && words?.incorrect)}
        </p>
      </div>
    </>
  );
};

export default MathOperationInput;
