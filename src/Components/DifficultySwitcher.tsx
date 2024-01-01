import React from "react";
import { useDifficulty } from "./DifficultyContext";

const DifficultySwitcher: React.FC = () => {
  const { currentDifficulty, updateDifficulty, difficultyFactors } =
    useDifficulty();

  return (
    <>
      <select
        value={currentDifficulty}
        onChange={(e) => updateDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </>
  );
};

export default DifficultySwitcher;
