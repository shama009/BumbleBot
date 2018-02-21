import Navbar from "../Navbar/Navbar";
import Tweets from "../Tweets/Tweets";
import CommandsList from "../CommandsList/CommandsList";
import "./Home.css";
import React, { Component } from "react";

class Home extends Component {

    componentDidMount() {
        console.log(document.cookie, typeof document.cookie);
        const cookiesParsed = decodeURIComponent(document.cookie);
        const user = cookiesParsed.slice(5);
        const final = JSON.parse(user);
        localStorage.setItem("id", final.twitter.id);
        localStorage.setItem("token", final.twitter.token);
        localStorage.setItem("tokenSecret", final.twitter.tokenSecret);
        localStorage.setItem("username", final.twitter.username);
        return user;
    };

    render() {
        return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div id="tweets" className="col s12 m7">
                        <Tweets />
                    </div>
                        <CommandsList />
                </div>
            </div>
        </div>
    )
  }
}

export default Home;