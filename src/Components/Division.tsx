import React, { useState } from "react";
import MathOperationInput from "./QuestionSubmit";
import { useDifficulty } from "./DifficultyContext";

const Division: React.FC = () => {
  const { currentDifficulty, difficultyFactors } = useDifficulty(); // Include currentDifficulty in the destructuring

  // Function to generate a random addition problem
  function generateProblem() {
    const num2 =
      Math.floor(Math.random() * (difficultyFactors[currentDifficulty] / 20)) +
      1;
    const num1 =
      num2 *
      (Math.floor(Math.random() * (difficultyFactors[currentDifficulty] / 20)) +
        1);
    return { num1, num2, answer: num1 / num2 };
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
            operation="division"
          />
        </div>
      </div>
    </>
  );
};

export default Division;
