import React, { useState , useEffect , useRef } from "react";
import Square from "../square/Square";
import "./board.css";

function Board({ blocked, currentMove, afterEffect, winnerValue }) {
  const [square, setSquare] = useState(new Array(9).fill(null));
  const [index, setIndex] = useState(null)
  let firstRef = useRef(false)
  useEffect(()=>{
    if(firstRef.current) afterEffect(index, square);
    else firstRef.current = true
  },[index,square])
 
  const handleClickOnSquare = (index) => {
    if (!square[index]) {
      setSquare((square) => {
        let newSquare = [...square];
        newSquare[index] = currentMove;
        setIndex(index)
        // afterEffect(index, newSquare);
        return newSquare;
      });
    }
  };

  return (
    <div className="boardCon">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
        <>
          <Square
            key={x}
            value={square[x]}
            onClick={() => handleClickOnSquare(x)}
          />
          {x === 8 && (
            <button className="overLay" disabled={blocked}>
              {winnerValue}
            </button>
          )}
        </>
      ))}
    </div>
  );
}

export default Board;
