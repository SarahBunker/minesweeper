import React from 'react';
let flagPath = require ("../assets/flag.png")
let minePath = require ("../assets/mine.png")


const Cell = ({id, hidden, flagged, mine, count, handleLeft, handleRight}) => {
  let classCat = ["cell_container"];

  let countCat = { 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight" }

  function deterimineCellBody() {
    if (hidden) {
      classCat.push("hidden")
      if (flagged) return (<img className="cell_img" src={flagPath} alt="flag"/>)
      return
    }
    if (mine) {
      return (<img className="cell_img" src={minePath} alt="mine"/>)
    }
    if (count === 0) return
    classCat.push(countCat[count])
    return count
  }

  let cellBody = deterimineCellBody()

  function handleClick(e) {
    e.preventDefault();
    const id = Number(e.currentTarget.id)
    if (e.type === 'click') {
      handleLeft(id)
    } else if (e.type === 'contextmenu') {
      handleRight(id)
    }
  }

  return (
    <div className={classCat.join(" ") } onClick={handleClick} onContextMenu={handleClick} id={id}>
      {cellBody}
    </div>
  );
};

export default Cell;