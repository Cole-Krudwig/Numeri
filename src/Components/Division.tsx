import React, { useState } from "react";
import MathOperationInput from "./QuestionSubmit";

const Division: React.FC = () => {
  const [currentProblem, setCurrentProblem] = useState(generateProblem());
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState("");

  // Function to generate a random addition problem
  function generateProblem() {
    const num2 = Math.floor(Math.random() * 20) + 1;
    const num1 = num2 * (Math.floor(Math.random() * 25) + 1);
    return { num1, num2, answer: num1 / num2 };
  }

  const handleCorrectAnswer = () => {
    setCurrentProblem(generateProblem()); // Generate a new problem
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex justify-center bg-custom-gray p-8 text-center w-screen h-48">
        <p className="text-2xl font-bold mb-4 mt-1">
          {currentProblem.num1} ÷ {currentProblem.num2} = &nbsp;
        </p>
        <MathOperationInput
          answer={currentProblem.answer}
          onCorrectAnswer={handleCorrectAnswer}
        />
      </div>
    </div>
  );
};

export default Division;
