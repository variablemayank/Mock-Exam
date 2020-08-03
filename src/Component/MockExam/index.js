import React, { Component } from "react";
import Header from "../Header";
import GeneralInstruction from "../GeneralInstruction";
import Axios from "axios";
import "./index.css";

class Markup extends Component {
  render() {
    const { markup } = this.props;
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: markup,
        }}
      />
    );
  }
}
const Question = (props) => {
  return (
    <div className="question">
      <div className="question-title">Q {props.questionIndex}</div>
      <div className="question-content">
        <Markup markup={props.question.question} />
      </div>
    </div>
  );
};

class Answer extends Component {
  state = {
    answerArr: [],
    submittedAnsArr: new Array(5),
    submitButton: new Array(5).fill(false),
  };
  getShuffledArr = (arr) => {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr;
  };
  componentDidMount() {
    let resultArr = [...this.props.question.incorrect_answers];
    resultArr.push(this.props.question.correct_answer);
    this.setState({ answerArr: this.getShuffledArr(resultArr) });
  }
  handleChange = (e) => {
    let tempArr = [...this.state.submittedAnsArr];
    tempArr[this.props.questionIndex - 1] = this.state.answerArr[
      e.target.value
    ];
    this.setState({ submittedAnsArr: tempArr });
  };
  handleSubmit = (questionIndex) => {
    let tempSubmitButon = [...this.state.submitButton];
    tempSubmitButon[questionIndex - 1] = !tempSubmitButon[questionIndex - 1];
    this.setState({ submitButton: tempSubmitButon });
    this.props.handleUserResp(questionIndex-1,this.state.submittedAnsArr);
  };

  render(props) {
    const { submitButton, submittedAnsArr } = this.state;
    const { questionIndex, examStart, question } = this.props;
    return (
      <div className="answer">
        <div className="answer-title">Choose Answer</div>
        <div className="answer-content">
          {this.state.answerArr.map((value, index) => {
            return (
              <div key={index} className="input-container-mock">
                <input
                  value={index}
                  name={value}
                  type="radio"
                  disabled={
                    submitButton[questionIndex - 1] === true ||
                    examStart === false
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                  checked={submittedAnsArr[questionIndex - 1] === value}
                />
                <Markup markup={value} />
              </div>
            );
          })}
        </div>
        {examStart === true && (
          <div
            onClick={() => {
              this.handleSubmit(this.props.questionIndex);
            }}
            className="submit-answer"
          >
            {this.state.submitButton[this.props.questionIndex - 1] === false
              ? "Submit Answer"
              : "Update Answer"}
          </div>
        )}
        {examStart == false && (
          <div className="solution">
            <div className="answer-title">Correct Answer</div>
            <div className="solution-content">
              <Markup markup={question.correct_answer} />
            </div>
          </div>
        )}
        {examStart === false && (
          <div
            className={
              question.correct_answer === submittedAnsArr[questionIndex - 1]
                ? "answer-status-correct"
                : "answer-status-incorrect"
            }
          >
            {question.correct_answer === submittedAnsArr[questionIndex - 1]
              ? "Correct"
              : "Incorrect"}
          </div>
        )}
      </div>
    );
  }
}

const QuestionView = (props) => {
  return (
    <div className="questionview">
      <Question
        questionIndex={props.questionIndex}
        question={props.questionData}
      />
      <Answer
        handleUserResp={props.handleUserResp}
        examStart={props.examStart}
        questionIndex={props.questionIndex}
        question={props.questionData}
      />
    </div>
  );
};
export default class MockExam extends Component {
  state = {
    userName: "",
    questionData: [],
    examStart: true,
    userAnswerArr: new Array(5).fill(''),
    marksObtained:0,
  };
  componentDidMount() {
    this.setState({ userName: this.props.match.params.userName });
    const api_url = `https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple`;
    Axios.get(api_url)
      .then((api_resp) => {
        this.setState({ questionData: api_resp.data.results });
      })
      .catch((err) => {
        alert("Error Fetching Questions");
      });
  }
  calculateMarksObtained = () => {
    let calculateMarksObtained = 0;
    if (this.state.userAnswerArr.length > 0) {
      this.state.questionData.map((value, index) => {
        if (value.correct_answer === this.state.userAnswerArr[index]) {
          calculateMarksObtained += 1;
        }
      });
    }
    this.setState({marksObtained:calculateMarksObtained})
  };
  handleEndExam = () => {
    this.setState({ examStart: false });
    this.calculateMarksObtained()
  };
  handleUserResp = (questionIndex,submittedAnsArr) => {
    let newUserResponse = [...this.state.userAnswerArr];
    newUserResponse[questionIndex] = submittedAnsArr[questionIndex]
    this.setState({userAnswerArr:newUserResponse})
  };

  render(props) {
    return (
      <div>
        <Header
          examStart={this.state.examStart}
          handleEndExam={this.handleEndExam}
          name={"Student Name:- " + this.state.userName}
          marksObtained = {this.state.marksObtained}
        />
        <GeneralInstruction />
        <div className="question-view-container">
          {this.state.questionData.length > 0 &&
            this.state.questionData.map((value, index) => {
              return (
                <div
                  key={"answer" + index}
                  className="question-container"
                  key={index}
                >
                  <QuestionView
                    handleUserResp={this.handleUserResp}
                    examStart={this.state.examStart}
                    questionData={value}
                    questionIndex={index + 1}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
