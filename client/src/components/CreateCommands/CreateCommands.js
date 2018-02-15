import React, { Component } from "react";
import Navbar2 from "../Navbar2";
import "./CreateCommands.css"


class CreateCommands extends Component {






    render() {

        return (

            <div>
                <Navbar2 />
                <div className="container">

                    <div id="create-command" className="row">
                        <div className="col s12 m6">
                            <div id="follow-tweet" className="card blue-grey darken-1">
                                <div className="card-content white-text">
                                    <span className="card-title">Follow Tweet</span>
                                    <p>Put Instructions here on how to use command</p>
                                    <input placeholder="Follow Tweet" type="text" className="validate" />
                                    <label htmlFor="follow-tweet"></label>
                                </div>
                                <div className="card-action">
                                    <a href="">This is a link</a>
                                    <a href="">This is a link</a>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m6">
                            <div id="post-tweet" className="card blue-grey darken-1">
                                <div className="card-content white-text">
                                    <span className="card-title">Post Tweet</span>
                                    <p>Put Instructions here on how to use command</p>
                                    <input placeholder="Tweet Here" id="first_name" type="text" className="validate" />
                                    <label htmlFor="post-tweet"></label>

                                </div>
                                <div className="card-action">
                                    <a href="">This is a link</a>
                                    <a href="">This is a link</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="create-command2" className="row">
                        <div className="col s12 m6">
                            <div id="re-tweet" className="card blue-grey darken-1">
                                <div className="card-content white-text">
                                    <span className="card-title">ReTweet</span>
                                    <p>Put Instructions here on how to use command</p>
                                    <input placeholder="ReTweet" type="text" className="validate" />
                                    <label htmlFor="re-tweet"></label>
                                </div>
                                <div className="card-action">
                                    <a href="">This is a link</a>
                                    <a href="">This is a link</a>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m6">
                            <div id="fave-tweet" className="card blue-grey darken-1">
                                <div className="card-content white-text">
                                    <span className="card-title">Fave Tweet</span>
                                    <p>Put Instructions here on how to use command</p>
                                    <input placeholder="Fave Tweet" type="text" className="validate" />
                                    <label htmlFor="fave-tweet"></label>

                                </div>
                                <div className="card-action">
                                    <a href="">This is a link</a>
                                    <a href="">This is a link</a>
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
