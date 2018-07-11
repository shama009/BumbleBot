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
        function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }
        const userCookie = readCookie("user");
        console.log(userCookie);
        const user = decodeURIComponent(userCookie);
        // const user = cookiesParsed.slice(5);
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
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div id="tweets" className="col s12 m6">
                            <Tweets />
                        </div>
                        <div className="col s12 m1"></div>
                            <CommandsList id={this.state.id}/>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default Home;