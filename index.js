const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const port = process.env.PORT || 4000;
const { v4: uuidv4 } = require("uuid");
const io = socketIo(server, { cors: { origin: "*" } });
const path = require("path")

let clientRooms = [] 
// roomId , arrayOfMoves , nameOfX , nameOfO , currentPlayer




io.on("connection", (socket) => {
  console.log("id", socket.id);
  socket.on("newGame" ,handleNewGame)
  socket.on("joinGame",handleJoinGame)
  socket.on("move1",receiveIndex)
  // socket.on("disconnect",handleDisconnect);
  function handleNewGame (nameOfPlayer)  {
    let roomName = uuidv4();
    let instance = { roomId: roomName, nameOfX: nameOfPlayer , count:1 };
    clientRooms.push(instance);
    socket.join(roomName);
    socket.emit("gameCode", instance);
    console.log(clientRooms);
  };


  function handleJoinGame({ roomName, nameOfPlayer }) {
    console.log("someone slides in");
    const room = io.sockets.adapter.rooms.has(roomName);
    let numClients = 0;
    if (room) {
      numClients = io.sockets.adapter.rooms.get(roomName).size;
      console.log(numClients);
    }
    if (numClients == 0) {
      // emit error
      socket.emit("unknowCode");
      return;
    }
    if (numClients > 1) {
      // emit error
      socket.emit("tooManyPlayers");
      return;
    }
    clientRooms.forEach((x) => {
      if (x.roomId == roomName) {
        x.nameOfO = nameOfPlayer;
        x.count = 2
      }
    });
    console.log(clientRooms);
    socket.join(roomName);

    const instance = clientRooms.filter(x => x.roomId===roomName)[0]

    io.in(roomName).emit("info", instance);

  };
 
  function receiveIndex(data) {
    console.log(data);
    socket.to(data.roomName).emit("move2", data);
  }
  

});

if(process.env.NODE_ENV==="production")
{
    app.use(express.static('client/build'))
    app.get('/*',(req,res)=>{
      res.sendFile("index.html", {
        root: path.join(__dirname + "/client/build"),
      });
    })
}

server.listen(port, () => {
  console.log(`Server is live at ${port} ✨`);
});
