import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/Register/";
import Home from "./components/Home/";
import Login from "./components/Login";
import CreateCommands from "./components/CreateCommands"
import SignupTwitter from "./components/SignUpTwitter/SignUpTwitter";


class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/create" component={CreateCommands} /> 
          <Route exact path="/twitter-sign-up" component={SignupTwitter} />
        </div>
      </Router>
    );
  }
}

export default App;
