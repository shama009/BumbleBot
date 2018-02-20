import React, { Component } from "react";
import API from "../../utils/API";
import "./Tweets.css";

class Tweets extends Component {

    state = {
        tweets: []
    }

    componentDidMount() {
        let data = {
            id: localStorage.getItem("id")
        }
        API.getTweets(data).then(res => {
            console.log(res);
            let tweets = res.data.tweets.map((tweet) => {
                let text = tweet.text;
                console.log(text);
                <li>{text}</li>
            });
            this.setState({
                tweets: tweets
            })
            console.log(this.state);
        })
    }

    render() {
        return (
            <div id="tweets" className="col s12 m7">
                <div className="card blue-grey darken-1 hoverable">
                    <div className="card-content white-text">
                        <span className="card-title">username</span>
                        <ul>{this.state.tweets}</ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tweets;