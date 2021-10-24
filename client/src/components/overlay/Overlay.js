import React from 'react'
import "./overlay.css"
const Overlay = ({ children }) => {
  return (
      <div  className="overlay" >
          {children}
      </div>
  )
};

export default Overlay
