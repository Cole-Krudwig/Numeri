import React, { useState, useEffect } from "react";
// Internal Imports
import MathOperationInput from "./QuestionSubmit";
import { useDifficulty } from "./DifficultyContext";

// Declare types
interface MultiplicationProps {
  operation: string;
}

// Functional Component
const Multiplication: React.FC<MultiplicationProps> = () => {
  const { currentDifficulty, difficultyFactors } = useDifficulty();

  // Function to generate a random multiplication problem
  const generateProblem = () => {
    const num1 = Math.floor(
      Math.random() * (difficultyFactors[currentDifficulty] / 20)
    );
    const num2 = Math.floor(
      Math.random() * (difficultyFactors[currentDifficulty] / 20)
    );
    return { num1, num2, answer: num1 * num2 };
  };

  const [currentProblem, setCurrentProblem] = useState(generateProblem());

  // Generate a new problem
  const handleCorrectAnswer = () => {
    setCurrentProblem(generateProblem());
  };

  // Use useEffect to regenerate problems when difficulty changes
  useEffect(() => {
    setCurrentProblem(generateProblem());
  }, [currentDifficulty, difficultyFactors]);

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
          />
        </div>
      </div>
    </>
  );
};

export default Multiplication;
