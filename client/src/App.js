import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";

class App extends Component {

  render() {
    return (
    <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
    </div>
    </Router>
    );
  }
}

export default App;
