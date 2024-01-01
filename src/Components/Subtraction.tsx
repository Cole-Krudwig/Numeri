import React, { useState } from "react";
import MathOperationInput from "./QuestionSubmit";
import { useDifficulty } from "./DifficultyContext";

const Subtraction: React.FC = () => {
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
    <div className="flex items-center justify-center">
      <div className="flex justify-center bg-custom-gray p-8 text-center w-screen h-48">
        <p className="text-2xl font-bold mb-4 mt-1">
          {currentProblem.num1} - {currentProblem.num2} = &nbsp;
        </p>
        <MathOperationInput
          answer={currentProblem.answer}
          onCorrectAnswer={handleCorrectAnswer}
        />
      </div>
    </div>
  );
};

export default Subtraction;
