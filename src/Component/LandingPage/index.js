import React, { Component } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import Header from "../Header";

class Login extends Component {
  state = {
    userName: "",
  };
  handleUserName = (e) => {
    this.setState({ userName: e.target.value });
  };

  render(props) {
    return (
      <div className="login-container">
        <div className="login">
          <div className="title">Enter Your UserName</div>
          <div className="input-container">
            <input
              value={this.state.userName}
              onChange={(e) => {
                this.handleUserName(e);
              }}
              className="user-name"
              type="text"
              placeholder="User Name"
            />
          </div>
          <Link
            to={`/mock-exam/${
              this.state.userName.length > 0 ? this.state.userName : "Demo"
            }`}
            className="button-container"
          >
            Start Exam
          </Link>
        </div>
      </div>
    );
  }
}
const LandingPage = (props) => {
  return (
    <div className="landing-page">
      <Header name={"Test Assesment Mock"} />
      <Login />
    </div>
  );
};

export default LandingPage;
