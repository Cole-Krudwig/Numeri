import React, { useState } from "react";
import MathOperationInput from "./QuestionSubmit";
import { useDifficulty } from "./DifficultyContext";

type MathOperation = "addition" | "subtraction" | "multiplication" | "division";

interface SubtractionProps {
  operation: MathOperation;
}

const Subtraction: React.FC<SubtractionProps> = (operation) => {
  const { currentDifficulty, difficultyFactors } = useDifficulty(); // Include currentDifficulty in the destructuring

  // Function to generate a random addition problem
  function generateProblem() {
    const num1 = Math.floor(
      Math.random() * difficultyFactors[currentDifficulty]
    );
    const num2 = Math.floor(Math.random() * (num1 - 1));
    return { num1, num2, answer: num1 - num2 };
  }

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
            operation="subtraction"
          />
        </div>
      </div>
    </>
  );
};

export default Subtraction;
