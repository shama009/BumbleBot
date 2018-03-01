
import React, { Component } from "react";
import "./CommandsList.css";
import API from "../../utils/API";

class CommandsList extends Component {

    state = {
        commands: []
    };

    componentDidMount = () => {
        if (!localStorage.getItem("id")) {
            window.location.reload();
        }
        console.log(this.props);
        API.getCommands(this.props.id)
        .then(commands => {
            console.log(commands);
            let command = commands.
            this.setState({
                commands: command
            });
        })
        .catch(err => console.log(err));
    }

    deleteCommandHandler(e) {
        e.preventDefault();
        console.log("delete command");
    }


    render = () => {
        let panel = "";
        
        for (let i = 0; i <this.state.commands.length; i++) {
            let target = this.state.commands[i];
            panel += <div>{target}</div>
        }
        return panel;
    }
}
export default CommandsList;

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