import React, {
    Component
} from "react";
import "./CommandsList.css";
import Command from "../Command";
import API from "../../utils/API";

class CommandsList extends Component {

    state = {
        commands: []
    };

    componentDidMount = () => {
        if (!localStorage.getItem("id")) {
            window.location.reload();
        }
        console.log(localStorage.getItem("id"));
        API.getCommands({
                id: localStorage.getItem("id")
            })
            .then(commands => {
                console.log(commands);
                let command = commands.data;
                this.setState({
                    commands: command
                });
            })
            .catch(err => console.log(err));
    }

    deleteCommandHandler(e) {
        e.preventDefault();
        console.log(e.target);
    }


    render = () => {
        let panel = [];
        for (let i = 0; i < this.state.commands.length; i++) {
            let target = this.state.commands[i];
            console.log("typeof" + typeof target.id);
            let text = target.data.method;
            panel.push( <li className="collection-item">
            <div>{text}<a href="" className="secondary-content"><i
                onClick={this.deleteCommandHandler} className="material-icons">send</i></a></div>
            </li>);
        }
        return (
            <div id="commands-list" className="col s12 m5">
                <ul className="collection with-header">
                    <li className="collection-header"><h5>Current Commands <a className="btn btn-floating btn-large pulse">{this.state.commands.length}</a></h5></li>
                   {panel}
                </ul>
            </div>
        );
        // let panel = [];
        // for (let i = 0; i < this.state.commands.length; i++) {
        //     let target = this.state.commands[i];
        //     console.log(target);
        //     panel.push( < Command cmdID = {target.id} userID={target.user_id} />)
        //     };
        //     return panel
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