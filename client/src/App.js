import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Link, withRouter, Redirect } from "react-router-dom";
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
    rtInput: "",
    rtInterval: "",
    favInput: "",
    favInterval: "",
    postInput: ""
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    localStorage.setItem(name, value);
  };

  reTweetHandler = event => {
    event.preventDefault();
    const math = this.state.rtInterval * 1000;
    console.log(math);
    API.reTweet({
      method: "retweet",
      id: localStorage.getItem("id"),
      input: this.state.rtInput,
      interval: math
    }).then(res => {
      console.log(res);
      this.setState({
        rtInput: "",
        rtInterval: ""
      })
    })
  };

  favTweetHandler = (e) => {
    console.log("Fav Button hit");
    e.preventDefault();
    const math = this.state.favInterval * 1000;
    let data = {
        method: "fav",
        id: localStorage.getItem("id"),
        input: this.state.favInput,
        interval: math
    };
    console.log(data);
    API.favTweet(data).then(res => {
        console.log(res);
        this.setState({
          favInput: "",
          favInterval: ""
        })
    });
  };

  postTweetHandler = e => {
    e.preventDefault();
    console.log("post tweet")
    let data = {
      method: "post",
      id: localStorage.getItem("id"),
      input: this.state.postInput
    };
    console.log(data);
    API.postTweet(data).then(res => {
      console.log(res);
      this.setState({
        postInput: ""
      })
    });
  };
  
  followTweetHandler = e => {
    e.preventDefault();
    console.log("follow tweet");
    let data = {
      method: "follow-listen",
      id: localStorage.getItem("id")
    };
    API.followTweet(data).then(res => {
      console.log(res);
    })
  }
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
        <Route exact path="/create" render={() => <CreateCommands 
          favTweetHandler={this.favTweetHandler} 
          reTweetHandler={this.reTweetHandler}
          postTweetHandler={this.postTweetHandler}
          followTweetHandler={this.followTweetHandler}
          rtInput={this.state.rtInput} 
          rtInterval={this.state.rtInterval}
          favInput={this.state.favInput}
          favInterval={this.state.favInterval}
          postInput={this.state.postInput}
          handleInputChange={this.handleInputChange}/>} />
      </div>
    </Router>
    );
  }
}

export default App;
