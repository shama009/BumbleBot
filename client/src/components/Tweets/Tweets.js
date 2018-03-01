import React, { Component } from "react";
import API from "../../utils/API";
import "./Tweets.css";
import { locale } from "moment";

class Tweets extends Component {

    state = {
        tweets: []
    };
    
    componentDidMount() {
        if (!localStorage.getItem("id")) {
            window.location.reload();
        }
        let data = {
            id: localStorage.getItem("id")
        };
        API.getTweets(data).then(res => {
            const text = [];
            const tweets = res.data.tweets.map((tweet) => {
                text.push(
                    <div className="card blue-grey darken-1 hoverable">
                        <div className="card-content">
                            <span className="card-title">{localStorage.getItem("username")}</span>
                            <blockquote>{tweet.text}</blockquote>
                        </div>
                    </div>
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