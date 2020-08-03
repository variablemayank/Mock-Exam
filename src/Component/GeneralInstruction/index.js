import React from 'react'
import './index.css'
const GeneralInstruction = (props) => {
    return (
      <div className="general-instruction">
        <div className="general-instruction-header">General Instruction</div>
        <li className="instruction">This test is of 5 questions.</li>
        <li className="instruction">Each Question is of 1 marks</li>
        <li className="instruction">
          Please Don't forget to mark answer any questions.
        </li>
        <li className="instruction">To Finish the test click on finish button</li>
      </div>
    );
  };
export default GeneralInstruction;