import Navbar from "../Navbar/Navbar";
import Tweets from "../Tweets/Tweets";
// import Tests from "../Test";
import CommandsList from "../CommandsList/CommandsList";
// import CreateCommand from "../CreateCommands";
import "./Home.css";
import React, { Component } from "react";
import API from "../../utils/API";

class Home extends Component {

    state = {
        id: ""
    };

    componentDidMount = () => {
        console.log(document.cookie, typeof document.cookie);
        const cookiesParsed = decodeURIComponent(document.cookie);
        const user = cookiesParsed.slice(5);
        const final = JSON.parse(user);
        localStorage.setItem("id", final.twitter.id);
        this.setState({
            id:  localStorage.setItem("id", final.twitter.id)
        });
        localStorage.setItem("token", final.twitter.token);
        localStorage.setItem("tokenSecret", final.twitter.tokenSecret);
        localStorage.setItem("username", final.twitter.username);
        return user;
    };

    render = () => {
        return (

        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div id="tweets" className="col s12 m6">
                        <Tweets />
                    </div>
                    <div className="col s12 m1"></div>
                        <CommandsList id={this.state.id}/>
                </div>
            </div>
            <footer class="page-footer">
            <div class="container">
            © 2018 BumbleBot
            </div>
        </footer>
        </div>
    )
  }
}

export default Home;