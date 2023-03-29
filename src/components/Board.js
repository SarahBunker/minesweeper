import React from 'react';
import Cell from './Cell';
// import { useState, useEffect } from 'react';

/*
cell = {
  hidden: true,
  flagged: false,
  mine: false,
  count: 0,
  id: num,
}
*/

// function setMines(board, numMines = 10) {
// }

// function setCount(board) {
// }

function fillBoard() {
  let res = []
  for (let i=1; i<=9; i++) {
    res.push(i)
  }
  return res
}

const Board = () => {
  // const {boardSize, setBoardSize} = useState(10)


  // let newboard = fillBoard() 
  let newboard = [
    {
      hidden: true,
      flagged: true,
      mine: false,
      count: 0,
      id: 1,
    },
    {
      hidden: true,
      flagged: false,
      mine: false,
      count: 0,
      id: 2,
    },
    {
      hidden: true,
      flagged: false,
      mine: false,
      count: 0,
      id: 3,
    },
    {
      hidden: true,
      flagged: false,
      mine: false,
      count: 0,
      id: 4,
    },
    {
      hidden: true,
      flagged: false,
      mine: false,
      count: 0,
      id: 5,
    },
    {
      hidden: true,
      flagged: false,
      mine: false,
      count: 0,
      id: 6,
    },
    {
      hidden: true,
      flagged: false,
      mine: false,
      count: 0,
      id: 7,
    },
    {
      hidden: true,
      flagged: false,
      mine: false,
      count: 0,
      id: 8,
    },
    {
      hidden: true,
      flagged: false,
      mine: false,
      count: 0,
      id: 9,
    },
  ]
  return (
    <div className="board">
      {newboard.map(cell => <Cell id={cell.id} key={cell.id}/>)}
    </div>
  );
};

export default Board;