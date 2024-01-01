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

export const DifficultyProvider: React.FC<DifficultyContextProps> = ({
  children,
}) => {
  const [currentDifficulty, setCurrentDifficulty] = useState("easy");

  const updateDifficulty = (newDifficulty: string) => {
    setCurrentDifficulty(newDifficulty);
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
