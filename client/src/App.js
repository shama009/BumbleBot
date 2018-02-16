import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import SignupTwitter from "./components/SignUpTwitter/SignUpTwitter";
import Login from "./components/Login/Login";

class App extends Component {

  render() {
    return (
    <Router>
    <div>
      <Route exact path="/home" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Login} />
      <Route exact path="/twitter-sign-up" component={SignupTwitter} />
    </div>
    </Router>
    );
  }
}

export default App;
