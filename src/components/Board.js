import React from 'react';
import Cell from './Cell';
// import { useState, useEffect } from 'react';

// function setMines(board, numMines = 10) {
// }

// function setCount(board) {
// }

// function revealMines(board) {
// }

function fillBoard() {
  let res = []
  for (let i=1; i<=9; i++) {
    res.push(i)
  }
  return res
}

const Board = ({board}) => {
  let flatBoard = board.flat()
  // const {boardSize, setBoardSize} = useState(10)


  // let newboard = fillBoard() 
  // let newboard = [
  //   {
  //     hidden: true,
  //     flagged: false,
  //     mine: false,
  //     count: 1,
  //     id: 1,
  //   },
  //   {
  //     hidden: true,
  //     flagged: false,
  //     mine: true,
  //     count: 2,
  //     id: 2,
  //   },
  //   {
  //     hidden: false,
  //     flagged: false,
  //     mine: false,
  //     count: 3,
  //     id: 3,
  //   },
  //   {
  //     hidden: true,
  //     flagged: true,
  //     mine: false,
  //     count: 4,
  //     id: 4,
  //   },
  //   {
  //     hidden: false,
  //     flagged: false,
  //     mine: false,
  //     count: 5,
  //     id: 5,
  //   },
  //   {
  //     hidden: false,
  //     flagged: false,
  //     mine: false,
  //     count: 6,
  //     id: 6,
  //   },
  //   {
  //     hidden: false,
  //     flagged: false,
  //     mine: false,
  //     count: 7,
  //     id: 7,
  //   },
  //   {
  //     hidden: false,
  //     flagged: false,
  //     mine: false,
  //     count: 8,
  //     id: 8,
  //   },
  //   {
  //     hidden: false,
  //     flagged: false,
  //     mine: false,
  //     count: 0,
  //     id: 9,
  //   },
  // ]
  return (
    <div className="board">
      {flatBoard.map(cell => <Cell
        id={cell.id}
        key={cell.id}
        hidden={cell.hidden}
        flagged={cell.flagged}
        mine={cell.mine}
        count={cell.count}
      />)}
    </div>
  );
};

export default Board;