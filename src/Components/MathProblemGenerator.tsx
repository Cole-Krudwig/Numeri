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
        return <Addition />;
      case "subtraction":
        return <Subtraction />;
      case "multiplication":
        return <Multiplication />;
      case "division":
        return <Division />;
      default:
        return null;
    }
  };

  return <div className="z-50">{renderOperationComponent()}</div>;
};

export default MathProblemGenerator;
