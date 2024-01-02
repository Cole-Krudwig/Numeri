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

import React, { createContext, useState, useContext, ReactNode } from "react";

interface DifficultyContextProps {
  children: ReactNode;
}

interface DifficultyContextValue {
  currentDifficulty: string;
  updateDifficulty: (newDifficulty: string) => void;
  difficultyFactors: Record<string, number>;
}

const DifficultyContext = createContext<DifficultyContextValue | undefined>(
  undefined
);

// Functional Component
export const DifficultyProvider: React.FC<DifficultyContextProps> = ({
  children,
}) => {
  const storedDifficulty = localStorage.getItem("currentDifficulty");
  const initialDifficulty = storedDifficulty || "easy"; // Use "easy" as the default if not stored

  const [currentDifficulty, setCurrentDifficulty] = useState(initialDifficulty);

  const updateDifficulty = (newDifficulty: string) => {
    setCurrentDifficulty(newDifficulty);
    localStorage.setItem("currentDifficulty", newDifficulty);
  };

  const difficultyFactors = {
    easy: 500,
    medium: 1000,
    hard: 1500,
    // Add more difficulty factors as needed
  };

  const value: DifficultyContextValue = {
    currentDifficulty,
    updateDifficulty,
    difficultyFactors,
  };

  return (
    <DifficultyContext.Provider value={value}>
      {children}
    </DifficultyContext.Provider>
  );
};

export const useDifficulty = (): DifficultyContextValue => {
  const context = useContext(DifficultyContext);
  if (!context) {
    throw new Error("useDifficulty must be used within a DifficultyProvider");
  }
  return context;
};
