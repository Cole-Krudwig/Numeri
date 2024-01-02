import React, { useState, useEffect } from "react";
import MathOperationInput from "./QuestionSubmit";
import { useDifficulty } from "./DifficultyContext";

type MathOperation = "addition" | "subtraction" | "multiplication" | "division";

interface SubtractionProps {
  operation: MathOperation;
}

const Subtraction: React.FC<SubtractionProps> = () => {
  const { currentDifficulty, difficultyFactors } = useDifficulty();

  // Function to generate a random subtraction problem
  const generateProblem = () => {
    const num1 = Math.floor(
      Math.random() * difficultyFactors[currentDifficulty]
    );
    const num2 = Math.floor(Math.random() * (num1 - 1));
    console.log("Num1 (subtract):", num1);
    console.log("Num2 (subtract):", num2);
    return { num1, num2, answer: num1 - num2 };
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
            operation="subtraction"
          />
        </div>
      </div>
    </>
  );
};

export default Subtraction;
