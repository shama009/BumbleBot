
import React, { Component } from "react";
import "./CommandsList.css";

class CommandsList extends Component {


    state = {
        commands: [
            { follow: "" },
            { post: "" },
            { reTweet: "" },
            { faveTweet: "" }
        ]

    };


    deleteCommandHandler(e) {
        e.preventDefault();
        console.log("delete command");
    }


    render() {

        return (
            <div id="commands-list" className="col s12 m5">
                <ul id="current-commands" className="collection with-header">
                    <li className="collection-header"><h5>Current Commands <a className="btn btn-floating btn-large pulse">4</a></h5></li>
                    <li className="collection-item"><div>Re-Tweet<a href="" className="secondary-content"><i 
                    onClick={this.deleteCommandHandler}   className="material-icons">send</i></a></div></li>
                    <li className="collection-item"><div>Fav "dogs" - 2 hrs<a href="#!" className="secondary-content"><i 
                    onClick={this.deleteCommandHandler}   className="material-icons">send</i></a></div></li>
                    <li className="collection-item"><div>Follow back with message<a href="#!" className="secondary-content"><i 
                    onClick={this.deleteCommandHandler}   className="material-icons">send</i></a></div></li>
                    <li className="collection-item"><div>Post scheduled 5:38 pm<a href="#!" className="secondary-content"><i 
                    onClick={this.deleteCommandHandler}   className="material-icons">send</i></a></div></li>
                </ul>
            </div>
        );
    }


}
export default CommandsList;