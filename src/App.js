import './App.css';
import Board from './components/Board';

function App() {
  return (
    <div className='app'>
      <div className='game'>
        <p>Number of Bombs left: __</p>
        <p>Number of safe squares left: __</p>
        <Board />
      </div>
    </div>
  );
}

export default App;
