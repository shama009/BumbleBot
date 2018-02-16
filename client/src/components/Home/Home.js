import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Tweets from "../Tweets/Tweets";
import CommandsList from "../CommandsList/CommandsList";
import "./Home.css";

const Home = props => {
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
    

export default Home;