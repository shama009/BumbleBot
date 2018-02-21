import React from "react";
import Navbar from "../Navbar/Navbar";
import Tweets from "../Tweets/Tweets";
import CommandsList from "../CommandsList/CommandsList";
import "./Home.css";

const Home = props => (
    <div>
        <Navbar />
        <div className="container">
            <div className="row">
                {/* <div className="col s6 m6"> */}
                    <Tweets />
                {/* </div> */}
                {/* <div className="col s6 m6"> */}
                <CommandsList />
                {/* </div> */}
                
            </div>
        </div>
    </div>
)


export default Home;