import "./index.css";
import React from "react";
const Header = (props) => {
  return (
    <div className="header-container">
      <div className="header-heading">{props.name}</div>
      {props.examStart === true && (
        <div onClick={props.handleEndExam} className="finish-button">
          Finish Exam
        </div>
      )}
      {props.examStart === false && (
        <div style={{ marginLeft: "auto" }}>
          You scored {props.marksObtained} marks
        </div>
      )}
    </div>
  );
};
export default Header;
