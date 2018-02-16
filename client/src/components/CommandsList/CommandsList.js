import React from "react";
import "./CommandsList.css";
import SignUpTwitter from "../SignUpTwitter/SignUpTwitter";

const CommandsList = props => {

    return (
        <div className="col s12 m5">
            <ul className="collection with-header">
                <li className="collection-header"><h5>Current Commands <a className="btn btn-floating btn-large pulse">4</a></h5></li>
                <li className="collection-item"><div>Retweet "Cats" - 30 mins<a href="#!" className="secondary-content"><i className="material-icons">send</i></a></div></li>
                <li className="collection-item"><div>Fav "dogs" - 2 hrs<a href="#!" className="secondary-content"><i className="material-icons">send</i></a></div></li>
                <li className="collection-item"><div>Follow back with message<a href="#!" className="secondary-content"><i className="material-icons">send</i></a></div></li>
                <li className="collection-item"><div>Post scheduled 5:38 pm<a href="#!" className="secondary-content"><i className="material-icons">send</i></a></div></li>
            </ul>
        </div>
    )
};

export default CommandsList;