// MathProblemGenerator.tsx

import React from "react";
import Addition from "./Addition";
import Subtraction from "./Subtraction";
import Multiplication from "./Multiplication";
import Division from "./Division";

type MathOperation = "addition" | "subtraction" | "multiplication" | "division";

interface MathProblemGeneratorProps {
  operation: MathOperation;
}

const MathProblemGenerator: React.FC<MathProblemGeneratorProps> = ({
  operation,
}) => {
  // Logic to determine which component to render
  const renderOperationComponent = () => {
    switch (operation) {
      case "addition":
        return <Addition operation={operation} />;
      case "subtraction":
        return <Subtraction operation={operation} />;
      case "multiplication":
        return <Multiplication operation={operation} />;
      case "division":
        return <Division operation={operation} />;
      default:
        return null;
    }
  };

  return <div className="z-50">{renderOperationComponent()}</div>;
};

export default MathProblemGenerator;
