import React, { useContext, useState, useEffect } from "react";

const NameContext = React.createContext();

export function useName()
{
    return useContext(NameContext)
}

export function NameProvider({ children }) {
  const [names, setNames] = useState({ nameOfX: "", nameOfO: "" });
  const [player,setPlayer] = useState("X")

  function setX(name) {
    setNames({ ...names, nameOfX: name });
  }
  function setO(name) {
    setNames({ ...names, nameOfO: name });
  }


  const value = {
    nameOfX: names.nameOfX,
    nameOfO: names.nameOfO,
    setX,
    setO,
    player,
    setPlayer
  };

  return <NameContext.Provider value={value}>{children}</NameContext.Provider>;
}