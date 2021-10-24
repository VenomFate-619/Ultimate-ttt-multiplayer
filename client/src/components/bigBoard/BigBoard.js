import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import { checkWinner, getWinner } from "../../util/helper";
import Board from "../board/Board";
import "./bigBoard.css";
import { sendIndex ,receiveMove, updatePlayer } from "../../util/connection";
import Overlay from "../overlay/Overlay";
import {useName} from "../../context/nameContext"
function BigBoard() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const { nameOfX, nameOfO, player , setX ,setO } = useName();
  const [board, setBoard] = useState(new Array(9).fill(null));
  const [unblock, setUnblock] = useState(null);
  const [winner, setWinner] = useState(null);
  const [indexes, setIndexes] = useState({ bigBoardIndex: null, boardIndex:null , turn:"click" });
  const [overlay, setOverlay] = useState(false)

  useEffect(()=>{
    receiveMove((x)=>{
      console.log("runn receive");
      // click is real click by user
      // simulate is a event clicked to replicate another user
      setIndexes({ bigBoardIndex: x.bigBoardIndex , boardIndex:x.boardIndex , turn:"simulate" });
      setOverlay(false)
    })
  },[])

  useEffect(()=>{
    updatePlayer(x=>{
      console.log(x);
      if(player==="X") setO(x.nameOfO)
      else setX(x.nameOfX)
    })
  },[])

  useEffect(()=>{
    if(currentPlayer!==player) setOverlay(true)
  },[currentPlayer])

  const handleAfterClick = (bigBoardIndex,boardIndex,square) =>{
    // check the winner
    console.log(bigBoardIndex, boardIndex);
    if (winner) return;
    // update BigBoard
    let newBoard = [...board];
    // check for winner for BB inside square
    newBoard[bigBoardIndex] = checkWinner(square);
    // update the board (squares one)
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    // winner
    setWinner(checkWinner(newBoard));
    // unblock update
    setUnblock(newBoard[boardIndex] ? null : boardIndex);
    setBoard(newBoard);
    // send the info to server
    // simulate is a event clicked to replicate another user so info of click is not required to send to another user
    if (indexes.turn === "click") {
      let roomName = window.location.href.split("/").slice(-1)[0];
      sendIndex(
        bigBoardIndex,
        boardIndex,
        roomName,
        // to get pervoius value
        currentPlayer
      );
      // setOverlay(true);
    }
    setIndexes({ ...indexes, turn: "click" });
  }

  function getOverlay()
  {
    if(winner)
    {
      return (
      <Overlay>
        <div>Player {getWinner(winner,nameOfX,nameOfO)} win's</div>
        <Link to="/">Create a new game</Link>
      </Overlay>
      )
    }
    else{
      if(overlay)
      {
        return (
          <Overlay>
            <div>Waiting for opponents move</div>
          </Overlay>
        );
      }
    }
  }

  return (
    <>
      {getOverlay()}
      <div className="bigBoardCon">
        <h1 className="turn">
          {currentPlayer}'s turn
          <p>
            X:- {nameOfX} O:- {nameOfO}
          </p>
        </h1>
        {/* to keep keys different */}
        {[100, 101, 200, 300, 400, 500, 600, 700, 800].map((x, index) => (
          <>
            <Board
              indexToBeFilled={
                index === indexes.bigBoardIndex ? indexes.boardIndex : null
              }
              key={x}
              winnerValue={board[index]}
              blocked={
                (unblock !== null && unblock !== index) || board[index] !== null
              }
              currentMove={currentPlayer}
              afterEffect={(boardIndex, square) =>
                // index-bigBoard , boardIndex-sqaure , square- array
                handleAfterClick(index, boardIndex, square)
              }
            />
          </>
        ))}
      </div>
    </>
  );
}

export default BigBoard;
