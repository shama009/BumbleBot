import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import API from "./utils/API"

class App extends Component {

  state = {
    username: "",
    password: "",
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

//   handleFormSubmit = event => {
//     event.preventDefault();
//     console.log("Username: " + this.state.username + "\nPassword: " + this.state.password);
//     // this.setState({
//     //     username:"",
//     //     password:"",
//     //     passwordReEnter:""
//     // })
// };

  loginFormSubmit = event => {
    event.preventDefault();
    API.getUser({
        username: this.state.username
    })
    .then(data => {
        console.log(data);
        if (!data.data) {
            alert("no username exists, click link to register below");
        }
        else if (this.state.password === data.data.password) {
            localStorage.setItem("username", this.state.username);
            window.location = "/home";
        }
        else {
            alert("Password or Username is incorrect");
        }
    })
    
  };

  render() {
    return (
    <Router>
      <div>
        <Route path="/register" render={() => <Register username={this.state.username} password={this.state.password} handleInputChange={this.handleInputChange}   />} />
        <Route exact path="/home" render={() => <Home username={this.state.username} password={this.state.password} />} />
        <Route exact path="/" render={() => <Login username={this.state.username} password={this.state.password} handleInputChange={this.handleInputChange} loginFormSubmit={this.loginFormSubmit}  />} />
      </div>
    </Router>
    );
  }
}

export default App;
