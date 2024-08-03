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

import React, { useState, useEffect } from "react";
// Internal Imports
import MathOperationInput from "./QuestionSubmit";
import { useDifficulty } from "./DifficultyContext";

// Declare types
interface MultiplicationProps {
  operation: string;
}

// Helper function to round numbers to a fixed number of decimal places
const roundToDecimalPlaces = (number: number, places: number) => {
  return Number(number.toFixed(places));
};

// Functional Component
const Multiplication: React.FC<MultiplicationProps> = () => {
  const { currentDifficulty, difficultyFactors } = useDifficulty();

  // Retrieve saved states from localStorage
  const savedIncludeNegative = JSON.parse(
    localStorage.getItem("includeNegative") || "false"
  );
  const savedIncludeDecimals = JSON.parse(
    localStorage.getItem("includeDecimals") || "false"
  );

  // State for checkboxes
  const [includeNegative, setIncludeNegative] = useState(savedIncludeNegative);
  const [includeDecimals, setIncludeDecimals] = useState(savedIncludeDecimals);

  // Function to generate a random multiplication problem
  const generateProblem = () => {
    let num1: number;
    let num2: number;

    if (includeDecimals) {
      num1 = roundToDecimalPlaces(
        Math.random() * (difficultyFactors[currentDifficulty] / 20),
        3
      );
      num2 = roundToDecimalPlaces(
        Math.random() * (difficultyFactors[currentDifficulty] / 20),
        3
      );
    } else {
      num1 = Math.floor(
        Math.random() * (difficultyFactors[currentDifficulty] / 20)
      );
      num2 = Math.floor(
        Math.random() * (difficultyFactors[currentDifficulty] / 20)
      );
    }

    if (includeNegative) {
      num1 = num1 * (Math.random() < 0.5 ? -1 : 1);
      num2 = num2 * (Math.random() < 0.5 ? -1 : 1);
    }

    return { num1, num2, answer: roundToDecimalPlaces(num1 * num2, 3) };
  };

  const [currentProblem, setCurrentProblem] = useState(generateProblem());

  // Save states to localStorage when they change
  useEffect(() => {
    localStorage.setItem("includeNegative", JSON.stringify(includeNegative));
    localStorage.setItem("includeDecimals", JSON.stringify(includeDecimals));
  }, [includeNegative, includeDecimals]);

  // Generate a new problem
  const handleCorrectAnswer = () => {
    setCurrentProblem(generateProblem());
  };

  // Use useEffect to regenerate problems when difficulty or checkbox states change
  useEffect(() => {
    setCurrentProblem(generateProblem());
  }, [currentDifficulty, difficultyFactors, includeNegative, includeDecimals]);

  return (
    <>
      <div className="bg-custom-gray text-center w-screen h-40">
        <div className="flex justify-center">
          <MathOperationInput
            answer={currentProblem.answer}
            onCorrectAnswer={handleCorrectAnswer}
            num1={currentProblem.num1}
            num2={currentProblem.num2}
            operation="multiplication"
            includeNegative={includeNegative}
            setIncludeNegative={setIncludeNegative}
            includeDecimals={includeDecimals}
            setIncludeDecimals={setIncludeDecimals}
          />
        </div>
      </div>
    </>
  );
};

export default Multiplication;
