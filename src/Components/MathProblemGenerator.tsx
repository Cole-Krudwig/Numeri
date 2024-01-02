/*
 * Copyright (c) 2024 Cole Krudwig
 * Email: ckrudwig@gmail.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from "react";
// Internal Imports
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
