import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/Register/";
import Home from "./components/Home/";
import Login from "./components/Login";
import CreateCommands from "./components/CreateCommands"
import SignupTwitter from "./components/SignUpTwitter/SignUpTwitter";


class App extends Component {

  state = {
    username: "",
    password: "",
    passwordReEnter: ""
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  registerSubmit = event => {
    event.preventDefault();
    if (this.props.password === this.props.passwordReEnter) {
        API.getUser({username: this.props.username})
        .then(data => {
            if(!data.data) {
                API.saveUser({
                    username: this.props.username,
                    password: this.props.password
                })
                .then(res => {
                    localStorage.setItem("username", this.props.username);
                    // window.location = "/twitter-sign-up";
                })
                .catch(err => console.log(err));
            }
            else {
                alert("Username already exists");
                return;
            }
        })
    }
    else {
        alert("Password's don't match!");
    } 
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => <Login username={this.state.username} password={this.state.password} handleInputChange={this.handleInputChange} />} />
          <Route exact path="/home" component={Home} />
          <Route path="/register" render={() => <Register username={this.state.username} password={this.state.password} passwordReEnter={this.state.passwordReEnter} handleInputChange={this.handleInputChange} registerSubmit={this.registerSubmit} />} />
          <Route exact path="/create" component={CreateCommands} /> 
          <Route exact path="/twitter-sign-up" render={() => <SignupTwitter username={this.state.username} password={this.state.password} />} />
        </div>
      </Router>
    );
  }
}

export default App;
