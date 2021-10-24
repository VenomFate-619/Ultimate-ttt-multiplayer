import { useEffect } from "react";
import "./app.css"
import Entry from "./components/entry/Entry";
import Game from "./components/game/Game";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {socket} from "./util/connection"
import {NameProvider} from "./context/nameContext"

function App() {

  useEffect(()=>{
    socket.on("connect", () => {
      console.log(socket.id); 
    });
  },[])


  return (
    <Router>
      <NameProvider>
      <Switch>
        <Route path="/" exact  component={Entry} />
        <Route path="/game/:id" component={Game} />
      </Switch>
      </NameProvider>
    </Router> 
  );
}

export default App;
