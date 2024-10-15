import React, { useEffect } from 'react';
import { useGameStore } from '../state/GameState';
import './difficulty.scss'

const DifficultySelector = () => {
  const { startGame } = useGameStore();

  useEffect(()=>startGame(1),[])

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const difficulty = Number(event.target.value);
    startGame(difficulty);
  };

  return (
    <div className="difficulty">
      <label htmlFor="difficulty"> Difficulty : </label>
      <select id="difficulty" onChange={handleDifficultyChange}>
        <option value="1">Easy (16 Tiles)</option>
        <option value="2">Medium (24 Tiles)</option>
        <option value="3">Hard (32 Tiles)</option>
      </select>
    </div>
  );
};

export default DifficultySelector;
