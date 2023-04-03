import React from 'react';
import { useState } from 'react';
import Board from "./Board.js"
let minePath = require ("../assets/mine.png")

const BOARD_LENGTH = 10
const NUM_MINES = 12

/*
10x10 with 12 mines), Beginner (8x8 with 10 mines), Intermediate (16x16 with 40 mines) and Expert (30x16 with 99 mines)
*/

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
        hidden: true,
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

function findNearbyCells(cell, board) {
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
  let nearCells = findNearbyCells(bombCell, board)
  nearCells.forEach( cell => {
    if (cell.mine) return;
    cell.count ++
  })
}

function dupBoard(board) {
  return board.slice();
}

function newBoard() {
  let board = initialBoard();
  setBombs(board);
  tallyCounts(board);
  return board;
}

function revealMines(board) {
  return board.map( row => {
    row.map( cell => {
      if (cell.mine && !cell.flagged) cell.hidden = false;
      return cell
    })
    return row
  })
}

const Game = () => {
  const [board, setBoard] = useState(newBoard())
  const [lostGame, setLostGame] = useState(false);
  let flagCount = board.flat().filter( cell => cell.flagged && cell.hidden).length
  let bombLeftCount = NUM_MINES - flagCount;
  let hiddenCount = board.flat().filter( cell => cell.hidden).length
  let safeSqCount = hiddenCount - bombLeftCount - flagCount;

  function handleLeft(id) {
    if (lostGame) return;
    // console.log({board})
    let newBoard = dupBoard(board);
    let cell = findCellById(id, newBoard);
    if (cell.flagged) return;
    cell.hidden = false;
    if (cell.mine) {
      setLostGame(true);
      revealMines(newBoard);
    }
    if (cell.count === 0 && !cell.mine) {
      let naighbors = findNearbyCells(cell, board)
      let hiddenNaighbors = naighbors.filter( cell => cell.hidden)
      hiddenNaighbors.forEach(cell => {
        handleLeft(cell.id)
      })
    }
    setBoard(newBoard);
  }

  function handleRight(id) {
    if (lostGame) return;
    let newBoard = dupBoard(board);
    let cell = findCellById(id, newBoard);
    if (!cell.hidden) return;
    cell.flagged = !cell.flagged
    setBoard(newBoard);
  }

  function handleNewGame(e) {
    e.preventDefault()
    setBoard(newBoard())
    setLostGame(false);
  }

  function setGameHeader() {
    if (lostGame) {
      return <div className='header'><h3>Sorry, you lost this round.</h3></div>
    }
    return (
      <div className='header'>
        <p>Num <img className="cell_img" src={minePath} alt="mine"/> left: {bombLeftCount}</p>
        <p>Num safe cells left: {safeSqCount}</p>
      </div>
    )
  }

  return (
    <div className='game'>
      {setGameHeader()}

      <Board board={board} handleLeft={handleLeft} handleRight={handleRight} lostGame={lostGame}/>
      <button onClick={handleNewGame}>New Game</button>
      <p>Rules</p>
    </div>
  );
};

export default Game;