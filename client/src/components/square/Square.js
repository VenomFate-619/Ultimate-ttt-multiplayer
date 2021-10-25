import React from "react";
import "./square.css";

const Square= React.memo(({ value, onClick }) =>{
  return (
    <button className="squareButton" onClick={onClick}>
      {value}
    </button>
  );
})

export default Square;
