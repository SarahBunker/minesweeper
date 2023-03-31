import './App.css';
import Board from './components/Board';
import { useState, useEffect } from 'react';

const BOARD_LENGTH = 3
const NUM_MINES = 5

// function countHiddenCells () {}
// function countHiddenFlagged () {}
// function countHiddenMines () {}

// function revealMines(board) {
// }

function randomID(maxID) {
  return Math.floor(Math.random() * maxID) + 1
}

function initialBoard() {
  let board = [];
  let id = 1
  for(let row = 0; row < BOARD_LENGTH; row ++) {
    board.push([])
    for(let col = 0; col < BOARD_LENGTH; col ++) {
      board[row].push({ 
        hidden: false,  //FIXME change to true, set to false for debugging
        flagged: false, 
        mine: false, 
        count: 0, 
        id, row, col})
      id ++
    }
  }
  return board;
}

function setBombs(board) {
  let bombs = []
  while (bombs.length < NUM_MINES) {
    let cellID = randomID(BOARD_LENGTH**2);
    if (bombs.includes(cellID)) continue;
    bombs.push(cellID);
    let cell = findCellById(cellID, board)
    cell.mine = true;
  }
  return board
}

function findCellById(cellID, board) {
  return board.flat().filter( c => c.id === cellID)[0]
}

function findNearCellsByID(cell, board) {
  let nearCells = [];
  for (let row = cell.row - 1; row <= cell.row + 1; row ++) {
    for (let col = cell.col - 1; col <= cell.col + 1; col ++) {
      if (row === cell.row && col === cell.col) continue;
      if (row < 0 || col < 0) continue;
      if (row >= BOARD_LENGTH || col >= BOARD_LENGTH) continue;
      nearCells.push(board[row][col])
    }
  }
  return nearCells;
}

function findBombCells(board) {
  return board.flat().filter(c => c.mine)
}

function tallyCounts(board) {
  let bombIDs = findBombCells(board);
  bombIDs.forEach( bombCell => addCountFromBomb(bombCell, board)  )
}

function addCountFromBomb(bombCell, board) {
  let nearCells = findNearCellsByID(bombCell, board)
  nearCells.forEach( cell => {
    if (cell.mine) return;
    cell.count ++
  })
}

function newBoard() {
  let board = initialBoard();
  setBombs(board);
  tallyCounts(board);
  return board;
}

function App() {
  const [board, setBoard] = useState(newBoard())

  return (
    <div className='app'>
      <div className='game'>
        <p>Number of Bombs left: __</p>
        <p>Number of safe squares left: __</p>
        <Board board={board}/>
        <button>New Game</button>
        <p>Rules</p>
      </div>
    </div>
  );
}

export default App;
