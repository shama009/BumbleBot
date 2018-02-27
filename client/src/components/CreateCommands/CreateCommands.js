import React, { Component } from "react";
import Navbar2 from "../Navbar2";
import "./CreateCommands.css";
import API from "../../utils/API"


class CreateCommands extends Component {

    // postTweetHandler(e) {
    //     e.preventDefault();
    //     console.log("post tweet")
    //     // API.postTweet
    // }

    
    // followTweetHandler(e) {
    //     e.preventDefault();
    //     console.log("follow tweet")
    //     // API.followTweet
    // }

    // faveTweetHandler = (e) => {
    //     e.preventDefault();
    //     let data = {
    //         method: "fav",
    //         input: localStorage.getItem("input"),
    //         id: localStorage.getItem("id")
    //     };
    //     console.log(data);
    //     API.get(data).then(res => {
    //         console.log(res);
    //         this.setState({
    //         apiResponse: res.data.text
    //     });
        
    // });
        
    // }

    // reTweetHandler(e) {
    //     e.preventDefault();
    //     console.log(this.props);
    // }

    render() {
        return (
            
            <div>
                <Navbar2 />
                <div className="container">

                    <div id="create-command" className="row">
                        <div className="col s12 m6">
                            <div id="follow-tweet" className="card blue-grey darken-1">
                                <div className="card-content">
                                    <span className="card-title">Follow Tweet</span>
                                    <br />
                                    <p>Click button below to follow back any accounts that follow you.</p>
                                    <br />
                                    <br />
                                </div>
                                <div className="card-action">
                                    <a onClick={this.props.followTweetHandler} href="">Send Command</a>
                                    {/* <a href="">This is a link</a> */}
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m6">
                            <div id="post-tweet" className="card blue-grey darken-1">
                                <div className="card-content">
                                    <span className="card-title">Post Tweet</span>
                                    <p>What you would you like to post?</p>
                                    <input 
                                        placeholder="Tweet Here"
                                        id="first_name"
                                        type="text"
                                        className="validate"
                                        value={this.props.postInput}
                                        name="postInput"
                                        onChange={this.props.handleInputChange} />
                                    <label htmlFor="post-tweet"></label>
                                </div>
                                <div className="card-action">
                                <a onClick={this.props.postTweetHandler} href="">Send Command</a>
                                    {/* <a href="">This is a link</a> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="create-command2" className="row">
                        <div className="col s12 m6">
                            <div id="re-tweet" className="card blue-grey darken-1">
                                <div className="card-content">
                                    <span className="card-title">ReTweet</span>
                                    <p>Enter what you would like to retweet and at which interval?</p>
                                    <input
                                        placeholder="ReTweet"
                                        type="text"
                                        className="validate"
                                        id="retweet"
                                        value={this.props.rtInput}
                                        name="rtInput"
                                        onChange={this.props.handleInputChange} />
                                    <input
                                        placeholder="Interval"
                                        type="text"
                                        className="validate"
                                        id="rt-interval"
                                        value={this.props.rtInterval}
                                        name="rtInterval"
                                        onChange={this.props.handleInputChange} />
                                </div>
                                <div className="card-action">
                                <a onClick={this.props.reTweetHandler} href="">Send Command</a>
                                    {/* <a href="">This is a link</a> */}
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m6">
                            <div id="fave-tweet" className="card blue-grey darken-1">
                                <div className="card-content">
                                    <span className="card-title">Fav Tweet</span>
                                    <p>Enter what you would like to fav and at which interval</p>
                                    <input
                                    placeholder="Fav Tweet"
                                    type="text"
                                    className="validate"
                                    id="favTweet"
                                    value={this.props.favInput}
                                    name="favInput"
                                    onChange={this.props.handleInputChange} />
                                <input
                                    placeholder="Interval"
                                    type="text"
                                    className="validate"
                                    id="ft-interval"
                                    value={this.props.favInterval}
                                    name="favInterval"
                                    onChange={this.props.handleInputChange} />
                                </div>
                                <div className="card-action">
                                <a onClick={this.props.favTweetHandler}>Send Command</a>
                                    {/* <a href="">This is a link</a> */}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        )
    }







}






export default CreateCommands;
