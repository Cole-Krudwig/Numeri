import React, { useState, useEffect } from "react";
import MathOperationInput from "./QuestionSubmit";
import { useDifficulty } from "./DifficultyContext";

type MathOperation = "addition" | "subtraction" | "multiplication" | "division";

interface AdditionProps {
  operation: MathOperation;
}

const Addition: React.FC<AdditionProps> = () => {
  const { currentDifficulty, difficultyFactors } = useDifficulty();

  // Function to generate a random addition problem
  const generateProblem = () => {
    const num1 = Math.floor(
      Math.random() * difficultyFactors[currentDifficulty]
    );
    const num2 = Math.floor(
      Math.random() * difficultyFactors[currentDifficulty]
    );
    console.log("Num1 (add):", num1);
    console.log("Num2 (add):", num2);
    return { num1, num2, answer: num1 + num2 };
  };

  const [currentProblem, setCurrentProblem] = useState(generateProblem());

  const handleCorrectAnswer = () => {
    setCurrentProblem(generateProblem()); // Generate a new problem
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
            operation="addition"
          />
        </div>
      </div>
    </>
  );
};

export default Addition;
