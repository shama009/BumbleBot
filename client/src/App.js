import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link, withRouter, Redirect } from "react-router-dom";
// import Register from "./components/Register/";
import Home from "./components/Home/";
// import Login from "./components/Login";
import CreateCommands from "./components/CreateCommands"
import SignupTwitter from "./components/SignUpTwitter/SignUpTwitter";
import API from "./utils/API";


class App extends Component {

  state = {
    username: "",
    password: "",
    passwordReEnter: "",
    valid: false,
    input: "",
    interval: ""
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    localStorage.setItem(name, value);
    console.log(this.state);
  };

  reTweetHandler = event => {
    event.preventDefault();
    console.log(this.state.input);
    console.log(this.state.interval);
    const math = this.state.interval * 1000;
    console.log(math);
    API.reTweet({
      method: "retweet",
      id: localStorage.getItem("id"),
      input: this.state.input,
      interval: math
    }).then(res => {
      console.log(res);
    })
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

  // loginFormSubmit = event => {
  //   event.preventDefault();
  //   API.getUser({
  //       username: this.state.username
  //   })
  //   .then(data => {
  //       if (!data.data) {
  //           alert("no username exists, click link to register below");
  //       }
  //       else if (this.state.password === data.data.password) {
  //         this.setState({
  //           valid: true
  //         });
  //           localStorage.setItem("username", this.state.username);
  //       }
  //       else {
  //           alert("Password or Username is incorrect");
  //       }
  //   })
    
  // };


  // registerSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.password === this.state.passwordReEnter) {
  //       API.getUser({username: this.state.username})
  //       .then(data => {
  //           if(!data.data) {
  //               API.saveUser({
  //                   username: this.state.username,
  //                   password: this.state.password
  //               })
  //               .then(res => {
  //                   localStorage.setItem("username", this.state.username);
  //                  this.setState({
  //                    valid: true
  //                  }) 
  //               })
  //               .catch(err => console.log(err));
  //           }
  //           else {
  //               alert("Username already exists");
  //               return;
  //           }
  //       })
  //   }
  //   else {
  //       alert("Password's don't match!");
  //   } 
  // }


  twitterHandler = event => {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    
    return (
    <Router>
      <div>
        {/* <Route path="/register" render={() => {
          if (this.state.valid) {
            return <Redirect to="/twitter-sign-up" />
          }

          return (<Register username={this.state.username} password={this.state.password} passwordReEnter={this.state.passwordReEnter} handleInputChange={this.handleInputChange} registerSubmit={this.registerSubmit}  />)
          }} /> */}
        <Route exact path="/" render={() => <SignupTwitter username={this.state.username} password={this.state.password} />} />
        <Route exact path="/home" render={() => <Home username={this.state.username} password={this.state.password} />} />
        {/* <Route exact path="/" render={() => {
          if (this.state.valid) {
            return <Redirect to="/home" />
          } 
          return (<Login username={this.state.username} password={this.state.password} handleInputChange={this.handleInputChange} loginFormSubmit={this.loginFormSubmit} valid={this.state.valid} />)
          }} /> */}       
        <Route exact path="/create" render={() => <CreateCommands reTweetHandler={this.reTweetHandler} input={this.state.input} interval={this.state.interval} handleInputChange={this.handleInputChange}/>} />
      </div>
    </Router>
    );
  }
}

export default App;
