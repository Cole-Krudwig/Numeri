// MathOperationInput.tsx
import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { useLanguage } from "./LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import DifficultySwitcher from "./DifficultySwitcher";

type LanguageWords = {
  [key: string]: {
    submit: string;
    correct: string;
    incorrect: string;
  };
};

const languageWords: LanguageWords = {
  en: {
    submit: "Submit",
    correct: "Correct! Well done!",
    incorrect: "Incorrect. Try again.",
  },
  es: {
    submit: "Enviar",
    correct: "(ES) Correct! Well done!",
    incorrect: "(ES) Incorrect. Try again.",
  },
  fr: {
    submit: "Soumettre",
    correct: "(FR) Correct! Well done!",
    incorrect: "(FR) Incorrect. Try again.",
  },
};

interface MathOperationInputProps {
  answer: number;
  onCorrectAnswer: () => void;
}

const MathOperationInput: React.FC<MathOperationInputProps> = ({
  answer,
  onCorrectAnswer,
}) => {
  const { currentLanguage } = useLanguage();
  const words = languageWords[currentLanguage as keyof typeof languageWords];
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(0);

  const handleCheckAnswer = () => {
    const parsedAnswer = parseInt(userAnswer, 10);

    console.log("Parsed Answer:", parsedAnswer);
    console.log("Current Problem Answer:", answer);

    if (!isNaN(parsedAnswer) && parsedAnswer === answer) {
      setResult(1);
      setUserAnswer(""); // Clear the answer input
      onCorrectAnswer(); // Trigger callback for correct answer
    } else {
      setResult(2);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCheckAnswer();
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-center">
          <input
            type="text"
            className="border p-2 mr-2"
            value={userAnswer}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
          <button
            className="bg-custom-salmon text-white px-4 py-2 rounded font-bold"
            onClick={handleCheckAnswer}
          >
            {words?.submit}
          </button>
        </div>
        <div className="mt-2">
          <LanguageSwitcher />
          <DifficultySwitcher />
        </div>
        <p className="mt-4 font-bold">
          {(result === 1 && words?.correct) ||
            (result === 2 && words?.incorrect)}
        </p>
      </div>
    </>
  );
};

export default MathOperationInput;
