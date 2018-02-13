import React from "react";
import Navbar from "../Navbar/Navbar";
import Tweets from "../Tweets/Tweets";
import CommandsList from "../CommandsList/CommandsList";

const Home = props => (
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

export default Home;