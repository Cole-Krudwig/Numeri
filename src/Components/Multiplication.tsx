import React, { useState } from "react";

const Multiplication: React.FC = () => {
  const [currentProblem, setCurrentProblem] = useState(generateProblem());
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState("");

  // Function to generate a random addition problem
  function generateProblem() {
    const num1 = Math.floor(Math.random() * 16);
    const num2 = Math.floor(Math.random() * 16);
    return { num1, num2, answer: num1 * num2 };
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
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-200 p-8 rounded shadow-md text-center">
        <p className="text-2xl font-bold mb-4">
          {currentProblem.num1} x {currentProblem.num2} =
        </p>
        <input
          type="text"
          className="border p-2 mr-2"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyUp={handleKeyPress}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <p className="mt-4">{result}</p>
      </div>
    </div>
  );
};

export default Multiplication;
