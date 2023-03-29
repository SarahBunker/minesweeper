import React from 'react';
// var flagPath = require('../../public/flag.png')

const Cell = ({id, hidden, flagged, mine, count}) => {
  // let cellDisplay = 

  return (
    <div className='cell_container'>
      <img className="cell_img" src={ require ("../assets/mine.png") } />
    </div>
  );
};

export default Cell;

{/* <img className="flagImg" src={ require ("../assets/flag.png") } /> */}