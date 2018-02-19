import Navbar from "../Navbar/Navbar";
import Tweets from "../Tweets/Tweets";
// import Tests from "../Test";
import CommandsList from "../CommandsList/CommandsList";
import CreateCommand from "../CreateCommands";
import "./Home.css";
import React, { Component } from "react";
import API from "../../utils/API";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apiRes: "No Data",
            method: "",
            input: "",
            interval: ""
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
        localStorage.setItem(name, value);
        // console.log(this.state);
    };

    componentDidMount() {
        console.log(document.cookie, typeof document.cookie);
        const cookiesParsed = decodeURIComponent(document.cookie);
        const user = cookiesParsed.slice(5);
        console.log(user);
        const final = JSON.parse(user);
        console.log(final.twitter);
        // console.log(user, typeof user);
        localStorage.setItem("id", final.twitter.id);
        localStorage.setItem("token", final.twitter.token);
        localStorage.setItem("tokenSecret", final.twitter.tokenSecret);
        localStorage.setItem("username", final.twitter.username);
        return user;
    }

    test = () => {
        let data = {
            id: localStorage.getItem("id"),
            method: this.state.method,
            input: this.state.input,
            interval: this.state.interval * 1000
        };

        API.get(data).then(res => {
            console.log(res);
            this.setState({
            apiRes: res.data.message
            })
        });
        // console.log(test);
    }
    
    render() {

        // console.log(decodeURIComponent(document.cookie));
    console.log(this.state);
    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <Tweets />
                    <CommandsList />
                    <CreateCommand handleInputChange={this.props.handleInputChange} input={this.props.input} method={this.props.method} />
                    <button onClick={this.test}>test</button>
                    {/* <input type="text" value={this.state.tweet} /> */}
                    <input type="text" name="method" value={this.state.method} onChange={this.handleInputChange} />
                    <input type="text" name="input" value={this.state.input} onChange={this.handleInputChange} />
                    <input type="text" name="interval" value={this.state.interval} onChange={this.handleInputChange} />
                    <h1>{this.state.apiRes}</h1>
                </div>
            </div>
        </div>
    )
  }
}

export default Home;