import React, { useState , useEffect } from "react";
import {checkWinner} from "../../util/helper"
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
    setWinner(checkWinner(newBoard))
    // unblock update
    setUnblock(newBoard[boardIndex] ? null : boardIndex);
    setBoard(newBoard);
    // send the info to server
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
    setIndexes({...indexes , turn:"click"})
  }

  return (
    <>
    { overlay &&  <Overlay  content="Waiting for opponents move"/>}
    <div className="bigBoardCon">
      <h1 className="turn">{currentPlayer}'s turn
      <p>X:- {nameOfX} O:- {nameOfO}</p>
      </h1>
      {/* to keep keys different */}
      {[100,101,200, 300, 400, 500, 600, 700, 800].map((x,index) => (
        <>
          <Board
            indexToBeFilled={index===indexes.bigBoardIndex? indexes.boardIndex : null}
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
    </>
  );
}

export default BigBoard;
