import React from 'react';
import { useState } from 'react';
import Board from "./Board.js"
let minePath = require ("../assets/mine.png")

const BOARD_LENGTH = 10
const NUM_MINES = 12

/*
10x10 with 12 mines), Beginner (8x8 with 10 mines), Intermediate (16x16 with 40 mines) and Expert (30x16 with 99 mines)
*/

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
        error: false, 
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
  const [wonGame, setWonGame] = useState(false)
  const [ruleToggle, setRuleToggle] = useState(false)
  let flagCount = board.flat().filter( cell => cell.flagged && cell.hidden).length
  let bombLeftCount = NUM_MINES - flagCount;
  let hiddenCount = board.flat().filter( cell => cell.hidden).length
  let safeSqCount = hiddenCount - bombLeftCount - flagCount;

  if (safeSqCount === 0 && !wonGame) setWonGame(true)

  function handleLeftHiddenCell(cell, newBoard) {
    cell.hidden = false;
    if (cell.mine) {
      setLostGame(true);
      revealMines(newBoard);
    }
    if (cell.count === 0 && !cell.mine) {
      let neighbors = findNearbyCells(cell, board)
      let hiddenNaighbors = neighbors.filter( cell => cell.hidden)
      hiddenNaighbors.forEach(cell => {
        handleLeftHiddenCell(cell, newBoard)
      })
    }
    setBoard(newBoard);
  }

  function handleLeftVisibleCell(cell, newBoard) {
    let neighbors = findNearbyCells(cell, board)
    let flaggedNaighbors = neighbors.filter( cell => cell.hidden && cell.flagged)
    if (flaggedNaighbors.length === cell.count) {
      let unclickedCells = neighbors.filter( cell => cell.hidden && !cell.flagged)
      unclickedCells.forEach(cell => {
        handleLeftHiddenCell(cell, newBoard)
      })
    }
  }

  function handleLeft(id) {
    if (wonGame || lostGame) return;
    let newBoard = dupBoard(board);
    let cell = findCellById(id, newBoard);
    if (cell.flagged) return;
    if (cell.hidden && cell.mine) cell.error = true;
    if (cell.hidden) return handleLeftHiddenCell(cell, newBoard);
    handleLeftVisibleCell(cell, newBoard);
  }

  function handleRight(id) {
    if (wonGame || lostGame) return;
    let newBoard = dupBoard(board);
    let cell = findCellById(id, newBoard);
    if (!cell.hidden) return;
    cell.flagged = !cell.flagged
    if (cell.flagged && !cell.mine) cell.error = true;
    if (!cell.flagged && !cell.mine) cell.error = false;
    setBoard(newBoard);
  }

  function handleNewGame(e) {
    e.preventDefault()
    setBoard(newBoard())
    setLostGame(false);
    setWonGame(false);
  }

  function setGameHeader() {
    if (wonGame) {
      return <div className='won header'><h3>Yay! You this round.</h3></div>
    }
    if (lostGame) {
      return <div className='lost header'><h3>Sorry, you lost this round.</h3></div>
    }
    return (
      <div className='header'>
        <p>Num <img className="cell_img" src={minePath} alt="mine"/> left: {bombLeftCount}</p>
        <p>Num safe cells left: {safeSqCount}</p>
      </div>
    )
  }

  function setRulesButton() {
    if (ruleToggle) return <span>Hide Rules</span>
    return <span>Show Rules</span>
  }

  return (
    <div className='game'>
      <h2>Minesweeper</h2>
      {setGameHeader()}

      <Board board={board} handleLeft={handleLeft} handleRight={handleRight} showErrors={lostGame || wonGame}/>
      <button onClick={handleNewGame}>New Game</button>
      {/* <p onClick={() => setRuleToggle(!ruleToggle)}>Rules<button onClick={setRuleToggle}>Show Rules</button></p> */}
      <div>
        <h3>Rules</h3>
        <button onClick={() => setRuleToggle(!ruleToggle)}>{setRulesButton()}</button>
      </div>
      {ruleToggle && (<div>
        <br></br>
        <h4>Object</h4>
        Reveal all the safe squares.
        * Note: you do not have to mark all the mines in order to win.
        <br></br>
        <h4>Losing the Game</h4>
        Revealing a square with a mine causes you to loose the game.
        <br></br>
        <h4>How to Play</h4>
        <ul>
          <li>"Left Click" a hidden square to reveal if the square is safe or if it contains a mine.</li>
          <li>Revealing a safe square reveals the number of neighboring squares containing mines.</li>
          <li>If you reveal a square that has zero neighbors that contain mines, all the neighbors will also be revealed. This can open large areas of the board at a time.</li>
          <li>Revealing a square with a mine causes you to lose the game.</li>
          <li>"Right Click" a hidden square to mark the square with a flag or remove a flag.</li>
          <li>Flags are used to mark hidden squares that you think are mines.</li>
          <li>Incorrect mine marking doesn't cause you to lose the game immediatly, but can lead to mistakes which can. You will also have to correct the mistake before you can win since you can't reveal a square that is marked with a flag.</li>
          <li>"Left Click" a visible square with a number. If the number of flags on neighbors matches the number on the square then all neighbors withough flags will be revealed. If you have flagged a square that does not have a mine this will cause you to lose the game. This can be used to reveal squares quickly.</li>
          
        </ul>

        <h4>Terms</h4>
        <dl>
          <dt>neighbors</dt>
          <dd>A squares "neighbors" are the squares above, below, left, right, and all 4 diagonals. The board does not wrap so squares on the sides or the corners will have fewer neighbors.</dd>
        </dl>


      </div>)}
    </div>
  );
};

export default Game;