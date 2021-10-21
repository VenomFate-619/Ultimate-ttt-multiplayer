import React from "react";
import "./square.css";


const xe =()=> console.log("click");

const Square= React.memo(({ value, onClick }) =>{
  return (
    <button className="squareButton" onClick={onClick}>
      {value}
    </button>
  );
})

export default Square;
