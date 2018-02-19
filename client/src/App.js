import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Register from "./components/Register/";
import Home from "./components/Home/";
import Login from "./components/Login";
// import CreateCommands from "./components/CreateCommands"
import SignupTwitter from "./components/SignUpTwitter/SignUpTwitter";
import API from "./utils/API";


class App extends Component {

  state = {
    username: "",
    password: "",
    passwordReEnter: "",
    valid: false,
    method: "",
    input: ""
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    localStorage.setItem(name, value);
    console.log(this.state);
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
        console.log(this.state);
        if (!data.data) {
            alert("no username exists, click link to register below");
        }
        else if (this.state.password === data.data.password) {
          this.setState({
            valid: true
          });
            localStorage.setItem("username", this.state.username);
        }
        else {
            alert("Password or Username is incorrect");
        }
    })
    
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("test");
    if (this.state.password === this.state.passwordReEnter) {
        API.getUser({username: this.state.username})
        .then(data => {
            if(!data.data) {
                API.saveUser({
                    username: this.state.username,
                    password: this.state.password
                })
                .then(res => {
                    localStorage.setItem("username", this.state.username);
                   this.setState({
                     valid: true
                   }) 
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
        alert("Passwords don't match!");
    } 
  }

  twitterHandler = event => {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    
    return (
    <Router>
      <div>
        <Route path="/register" render={() => {
          if (this.state.valid) {
            return <Redirect to="/twitter-sign-up" />
          }
          return (<Register username={this.state.username} password={this.state.password} passwordReEnter={this.state.passwordReEnter} handleInputChange={this.handleInputChange} handleFormSubmit={this.handleFormSubmit}  />)
          }} />
        <Route exact path="/home" render={() => <Home username={this.state.username} password={this.state.password} method={this.state.method} input={this.state.input} handleInputChange={this.handleInputChange} twitterHandler={this.twitterHandler} />} />
        <Route exact path="/" render={() => <Login username={this.state.username} password={this.state.password} handleInputChange={this.handleInputChange} loginFormSubmit={this.loginFormSubmit} valid={this.state.valid} />} />
        <Route path="/twitter-sign-up" render={() => <SignupTwitter username={this.state.username} password={this.state.password} />} />
      </div>
    </Router>
    );
  }
}

export default App;
