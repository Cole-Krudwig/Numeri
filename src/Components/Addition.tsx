import React, { useState } from "react";

const MathProblemGenerator: React.FC = () => {
  const [currentProblem, setCurrentProblem] = useState(generateProblem());
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState("");

  // Function to generate a random addition problem
  function generateProblem() {
    const num1 = Math.floor(Math.random() * 500);
    const num2 = Math.floor(Math.random() * 500);
    return { num1, num2, answer: num1 + num2 };
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
    <div>
      <p>
        <span id="problem">
          {currentProblem.num1} + {currentProblem.num2} =
        </span>
        <input
          type="text"
          id="answer"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyUp={handleKeyPress}
        />
        <button onClick={handleSubmit} id="submit">
          Submit
        </button>
      </p>
      <p id="result">{result}</p>
    </div>
  );
};

export default MathProblemGenerator;
