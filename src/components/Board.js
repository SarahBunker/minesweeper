import React from 'react';
import Cell from './Cell';

const Board = ({board, handleLeft, handleRight}) => {
  let flatBoard = board.flat()

  return (
    <div className="board">
      {flatBoard.map(cell => <Cell
        id={cell.id}
        key={cell.id}
        hidden={cell.hidden}
        flagged={cell.flagged}
        mine={cell.mine}
        count={cell.count}
        handleLeft={handleLeft}
        handleRight={handleRight}
      />)}
    </div>
  );
};

export default Board;