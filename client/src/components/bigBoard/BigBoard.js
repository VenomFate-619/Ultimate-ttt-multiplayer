import React, { useState } from "react";
import Board from "../board/Board";
import "./bigBoard.css";

function BigBoard() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [board, setBoard] = useState(new Array(9).fill(null));
  const [unblock, setUnblock] = useState(null);
  const [winner, setWinner] = useState(null);

  const handleAfterClick = (bigBoardIndex,boardIndex,square) =>{
    // check the winner
    if (winner) return;
    // update BigBoard
    let newBoard = [...board];
    // check for winner for BB inside square
    newBoard[bigBoardIndex] = checkWinner(square);
    // update the board (squares one)
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    // winner 
    setWinner(checkWinner(newBoard))
    // unblock update
    setUnblock(newBoard[boardIndex] ? null : boardIndex);
    setBoard(newBoard);
  }
  
  function checkWinner(squares) {
    
    const winIndex = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]
    for (const [a, b, c] of winIndex) {
      if (
        (squares[a] === 'X' || squares[a] === 'O') &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      )
        return squares[a]
    }
    if (squares.every((s) => s != null)) return '#' //for tie
    return null
  }


  return (
    <div className="bigBoardCon">
      <h1 className="turn">{currentPlayer}'s turn</h1>
      {/* to keep keys different */}
      {[100,101,200, 300, 400, 500, 600, 700, 800].map((x,index) => (
        <>
          <Board
            key={x}
            winnerValue={board[index]}
            blocked={(unblock !== null && unblock !== index) || board[index]!==null}
            currentMove={currentPlayer}
            afterEffect={(boardIndex,square)=> 
              // index-bigBoard , boardIndex-sqaure , square- array 
              handleAfterClick(index,boardIndex,square)}
          />
        </>
      ))}
    </div>
  );
}

export default BigBoard;
