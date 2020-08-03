import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import LandingPage from "./Component/LandingPage";
import MockExam from "./Component/MockExam";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/mock-exam/:userName" component={MockExam} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
