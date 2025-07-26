import React from 'react';

interface TableTimeControlerProps {
  timeLimit: number;
  handleDecrement: () => void;
  handleIncrement: () => void;
  handleTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TableTimeControler({ timeLimit, handleDecrement, handleIncrement, handleTimeChange }: TableTimeControlerProps) {
  return (
    <div>
      <button onClick={handleDecrement}>-</button>
      <input type="number" value={timeLimit} onChange={handleTimeChange} />
      <span>분</span>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
}

export default TableTimeControler;
