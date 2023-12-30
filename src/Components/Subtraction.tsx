import React, { useState } from "react";
import MathOperationInput from "./QuestionSubmit";

const Subtraction: React.FC = () => {
  const [currentProblem, setCurrentProblem] = useState(generateProblem());
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState("");

  // Function to generate a random addition problem
  function generateProblem() {
    const num1 = Math.floor(Math.random() * 500);
    const num2 = Math.floor(Math.random() * (num1 - 1));
    return { num1, num2, answer: num1 - num2 };
  }

  // Function to check the answer
  function checkAnswer() {
    const parsedAnswer = parseInt(userAnswer, 10);

    if (!isNaN(parsedAnswer) && parsedAnswer === currentProblem.answer) {
      setResult("Correct! Well done!");
      setCurrentProblem(generateProblem()); // Generate a new problem
      setUserAnswer(""); // Clear the answer input
    } else {
      setResult("Incorrect. Try again.");
    }
  }

  // Event handler for the submit button
  const handleSubmit = () => {
    checkAnswer();
  };

  // Event handler for the "Enter" key press
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      checkAnswer();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex justify-center bg-custom-gray p-8 text-center w-screen h-48">
        <p className="text-2xl font-bold mb-4 mt-1">
          {currentProblem.num1} - {currentProblem.num2} = &nbsp;
        </p>
        <MathOperationInput
          value={userAnswer}
          onChange={setUserAnswer}
          onKeyUp={handleKeyPress}
          onSubmit={handleSubmit}
          result={result}
        />
      </div>
    </div>
  );
};

export default Subtraction;
