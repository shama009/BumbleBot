import React from "react";
import "./Tweets.css";

const Tweets = props => (
    <div className="col s12 m7">
        <div className="card blue-grey darken-1 hoverable">
        <div className="card-content white-text">
            <span className="card-title">username</span>
            <blockquote>I am a pretty tweet!</blockquote>
        </div>
        </div>
    </div>
);

export default Tweets;