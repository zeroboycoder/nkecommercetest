import React from "react";
import "./Spinner.css";

export default (props) => {
  const color = localStorage.getItem("color");
  return (
    <div className="spinner_container">
      <div className="spinner">
        <div
          className="cube1"
          style={color ? { backgroundColor: color } : null}
        ></div>
        <div
          className="cube2"
          style={color ? { backgroundColor: color } : null}
        ></div>
      </div>
    </div>
  );
};
