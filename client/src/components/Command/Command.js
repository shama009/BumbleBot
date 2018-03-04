
import React, { Component } from "react";
import API from "../../utils/API";

class Command extends Component {

    // componentDidMount = () => {

    // }

    commandHandler = e => {
        e.preventDefault();
        console.log(this.props.id);
        let data = {
            id: this.props.userID,
            method: "stop",
            input: this.props.cmdID
        };
        API.commandToggle(data);
    }


    render = () => {
        return (
            <div onClick={this.commandHandler}>command</div>
        )
    }
}
export default Command;

//<div id="commands-list" className="col s12 m5">
            //     <ul className="collection with-header">
            //         <li className="collection-header"><h5>Current Commands <a className="btn btn-floating btn-large pulse">4</a></h5></li>
            //         <li className="collection-item"><div>{this.state.reTweet}}<a href="" className="secondary-content"><i 
            //         onClick={this.deleteCommandHandler}   className="material-icons">send</i></a></div></li>
            //         <li className="collection-item"><div>Fav "dogs" - 2 hrs<a href="#!" className="secondary-content"><i 
            //         onClick={this.deleteCommandHandler}   className="material-icons">send</i></a></div></li>
            //         <li className="collection-item"><div>Follow back with message<a href="#!" className="secondary-content"><i 
            //         onClick={this.deleteCommandHandler}   className="material-icons">send</i></a></div></li>
            //         <li className="collection-item"><div>Post scheduled 5:38 pm<a href="#!" className="secondary-content"><i 
            //         onClick={this.deleteCommandHandler}   className="material-icons">send</i></a></div></li>
            //     </ul>
            // </div>