import './App.css';
import Board from './components/Board';
// import { useState, useEffect } from 'react';

// function countHiddenCells () {}
// function countHiddenFlagged () {}
// function countHiddenMines () {}

// function setMines(board, numMines = 10) {
// }

// function setCount(board) {
// }

// function revealMines(board) {
// }

function App() {
  return (
    <div className='app'>
      <div className='game'>
        <p>Number of Bombs left: __</p>
        <p>Number of safe squares left: __</p>
        <Board />
        <button>New Game</button>
        <p>Rules</p>
      </div>
    </div>
  );
}

export default App;
