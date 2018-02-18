import Navbar from "../Navbar/Navbar";
import Tweets from "../Tweets/Tweets";
import CommandsList from "../CommandsList/CommandsList";
import "./Home.css";
import React, { Component } from "react";

class Home extends Component {
    render() {
        console.log(/*"props from Login: " + */ this.props)
        return (
          <div>
        <Navbar />
        <div className="container">
            <div className="row">
                <Tweets />
                <CommandsList />
            </div>
        </div>
    </div>
    )
  }
}

export default Home;