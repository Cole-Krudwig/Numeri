import React, { useState } from "react";
import MathOperationInput from "./QuestionSubmit";
import { useDifficulty } from "./DifficultyContext";

type MathOperation = "addition" | "subtraction" | "multiplication" | "division";

interface AdditionProps {
  operation: MathOperation;
}

const Addition: React.FC<AdditionProps> = (operation) => {
  const { currentDifficulty, difficultyFactors } = useDifficulty(); // Include currentDifficulty in the destructuring

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

  return (
    <>
      <div className="bg-custom-gray p-8 text-center w-screen h-48">
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
