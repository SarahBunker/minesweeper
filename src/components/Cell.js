import React from 'react';
import { useCallback } from 'react';
let flagPath = require ("../assets/flag.png")
let minePath = require ("../assets/mine.png")


const Cell = ({id, hidden, flagged, mine, count, handleLeft}) => {
  let classCat = ["cell_container"];

  let countCat = { 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight" }

  function deterimineCellBody() {
    if (hidden && flagged) {
      return (<img className="cell_img" src={flagPath} />)
    }
    if (hidden) {
      return
    }
    if (!hidden && mine) {
      return (<img className="cell_img" src={minePath} />)
    }
    if (count === 0) return
    classCat.push(countCat[count])
    return count
  }

  let cellBody = deterimineCellBody()

  // function handleLeftClick(e) {
  //   e.preventDefault()
  //   let id = e.target
  //   if (e.type === 'click') {
      
  //     console.log({id})
  //     // handleLeft(e.target.id)
  //   } else if (e.type === 'contextmenu') {
  //     console.log('Right click');
  //   }
  // }
  // function handleLeftClick(e) {
  //   e.preventDefault()
  //   const id = Number(e.currentTarget.id)
  //   if (e.type === 'click') {
  //     handleLeft(id)
  //   } else if (e.type === 'contextmenu') {
  //     console.log('Right click');
  //   }
  // }
  function handleClick(e) {
    e.preventDefault();
    const id = Number(e.currentTarget.id)
    if (e.type === 'click') {
      handleLeft(id)
    } else if (e.type === 'contextmenu') {
      console.log('Right click');
    }
  }

  // function handleRightClick(e) {
  //   e.preventDefault()
  //   if (e.type === 'click') {
  //     console.log('Left click');
  //   } else if (e.type === 'contextmenu') {
  //     console.log('Right click');
  //   }
  // }

  return (
    <div className={classCat.join(" ") } onClick={handleClick} id={id}>
      {cellBody}
    </div>
  );
};

export default Cell;