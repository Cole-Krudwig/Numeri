// MathOperationInput.tsx
import React, { ChangeEvent, KeyboardEvent } from "react";
import { useLanguage } from "./LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

// Define the type of languageWords
type LanguageWords = {
  [key: string]: {
    submit: string;
    // Add more words/phrases as needed
  };
};

const languageWords: LanguageWords = {
  en: {
    submit: "Submit",
    // Add more words/phrases as needed
  },
  es: {
    submit: "Enviar",
  },
  fr: {
    submit: "Soumettre",
  },

  // Add more languages as needed
};

interface MathOperationInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyUp: (event: KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  result: string;
}

const MathOperationInput: React.FC<MathOperationInputProps> = ({
  value,
  onChange,
  onKeyUp,
  onSubmit,
  result,
}) => {
  const { currentLanguage } = useLanguage();
  const words = languageWords[currentLanguage as keyof typeof languageWords];

  return (
    <>
      <div>
        <div className="flex justify-center">
          <input
            type="text"
            className="border p-2 mr-2"
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange(e.target.value)
            }
            onKeyUp={onKeyUp}
          />
          <button
            className="bg-custom-salmon text-white px-4 py-2 rounded font-bold"
            onClick={onSubmit}
          >
            {words?.submit}
          </button>
        </div>
        <div className="mt-2">
          <LanguageSwitcher />
        </div>
        <p className="mt-4 font-bold">{result}</p>
      </div>
    </>
  );
};

export default MathOperationInput;
