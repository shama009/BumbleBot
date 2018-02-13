import React, { Component } from 'react';
<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
import API from "./utils/API";
=======
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
>>>>>>> master

class App extends Component {

  render() {
    return (
<<<<<<< HEAD
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <button onClick={() => {API.search("api/twitter/big_cat_retweets/get/cats/1000").then(data => console.log(data))}}>test</button>
      </div>
=======
    <Router>
    <div>
      <Route exact path="/home" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Login} />
    </div>
    </Router>
>>>>>>> master
    );
  }
}

export default App;
