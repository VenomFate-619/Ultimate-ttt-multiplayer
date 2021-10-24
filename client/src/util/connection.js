import io from "socket.io-client";

const socket = io("http://127.0.0.1:4000", { secure: true });


function createGame(name)
{
 socket.emit("newGame",name);
}

function gameCode(fn)
{ 
      socket.on("gameCode", (code) => {
       console.log(code);
       fn(code)
     });  
}


function joinGame(roomName,name)
{
    socket.emit("joinGame", { roomName, nameOfPlayer: name });
}
/**
 * Send index to server
 * @param {number} bigBoardIndex bigBoard
 * @param {number} boardIndex inner board
 * @param {string} roomName rooomName
 */
function sendIndex(bigBoardIndex, boardIndex, roomName, value) {
  socket.emit("move1", { bigBoardIndex, boardIndex, roomName, value });
}


function receiveMove(fn)
{
    socket.on("move2",fn)
}

function updatePlayer(fn)
{
  socket.on("info", fn);
}

export {
  socket,
  createGame,
  gameCode,
  joinGame,
  sendIndex,
  receiveMove,
  updatePlayer,
};