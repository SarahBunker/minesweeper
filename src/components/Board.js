import React from 'react';

function fillBoard() {
  let res = []
  for (let i=1; i<=100; i++) {
    res.push(i)
  }
  return res
}

const Board = () => {
  return (
    <div className="board">
      {fillBoard().map(num => <button id='{num}' key={num}></button>)}
    </div>
  );
};

export default Board;