import React , {useEffect , useState} from 'react'
import { createGame, gameCode, joinGame , socket } from "../../util/connection";
import "./entry.css"
import {useName} from "../../context/nameContext"

const Entry = ({ history }) => {
  // const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  // const [name2, setName2] = useState("");
  const { nameOfX, nameOfO, setX, setO, setPlayer } = useName();
  useEffect(()=>{
    socket.on("unknowCode",()=>{
      alert("unknow Code");
      setUrl("")
      history.replace('/')
    });
    socket.on("tooManyPlayers",()=>{
      alert("Already two players joined");
      setUrl("")
      history.replace("/");
    });
  },[])


  const handleSubmitToCreateGame = (e) => {
    e.preventDefault();
    if (nameOfX.length > 0) {
      setPlayer("X")
      createGame(nameOfX);
      gameCode((x) => {
        console.log(x);
        const url = "/game/" + x.roomId;
        history.replace(url);
        console.log(url);
      });
    }
  };

 const handleSubmitToJoinGame = (e) =>{
   e.preventDefault();
   
   if (nameOfO.length > 0 && url.length > 0) {
     setPlayer("O")
     console.log("runnn");
     joinGame(url.split("/").slice(-1)[0], nameOfO);
     let url2 = "/game/" + url.split("/").slice(-1)[0];
     history.replace(url2);
   }
   
 }

  return (
    <div className="container">
      <h1>Welcome to ultimate Tic Tac Toe Game</h1>
      <h4>A statergic boardgame for 2 players.</h4>
      <br />
      <p>
        Win three games of Tic Tac Toe in a row. You may only play in the big
        field that corresponds to the last small field your opponent played.
        When your are sent to a field that is already decided, you can choose
        freely
      </p>
      <br />
      <p>Create a game</p>
      <br />
      <form onSubmit={handleSubmitToCreateGame}>
        <input
          type="text"
          placeholder="Your name"
          autoFocus
          value={nameOfX}
          onChange={(e) => setX(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <br />
      <p>Join a Game</p>
      <br />
      <form onSubmit={handleSubmitToJoinGame}>
        <input
          type="text"
          placeholder="Your name"
          value={nameOfO}
          required
          onChange={(e) => setO(e.target.value)}
        />
        <input
          type="url"
          placeholder="Paste the url"
          value={url}
          required
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Entry
