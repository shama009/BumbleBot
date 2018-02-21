import React, { Component } from "react";
import API from "../../utils/API";
import "./Tweets.css";

class Tweets extends Component {

    state = {
        tweets: []
    };
    
    componentDidMount() {
        let data = {
            id: localStorage.getItem("id")
        };
        API.getTweets(data).then(res => {
            const text = [];
            const tweets = res.data.tweets.map((tweet) => {
                text.push(
                    // <div id="tweets" className="col s12 m7">
                        <div className="card blue-grey darken-1 hoverable">
                            <div className="card-content white-text">
                                <span className="card-title">{localStorage.getItem("username")}</span>
                                <blockquote>{tweet.text}</blockquote>
                            </div>
                        </div>
                    // </div>
                );
                console.log(tweets);
                return tweet
            });
            this.setState({
                tweets: text
            })
        })
    }

    render() {
        return this.state.tweets;
    }
}

export default Tweets;