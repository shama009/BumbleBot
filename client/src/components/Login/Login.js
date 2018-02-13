import "./Login.css";
import React, { Component } from 'react';
import API from "../../utils/API";

class Login extends Component {
    state = {
        username: "",
        password: ""
    };
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    handleFormSubmit = event => {
        event.preventDefault();
        localStorage.setItem("username", this.state.username);
        localStorage.setItem("password", this.state.password);
        API.getUsers()
        .then(data => {
            console.log(data);
        })
        this.setState({ username: "", password: "" });
        window.location = "/home";
    };

    loginHandler(e) {
        e.preventDefault();
        console.log("clicked");
    }
    render() {
        return (<div className="container">
            <div className="row">
                <div className="col s12 m8 offset-m2">
                    <div className="card blue-grey darken-1" id="login-card">
                        <div className="card-content white-text">
                            <span className="card-title">BumbleBot</span>
                            <div className="row">
                                <form className="col s12">
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input
                                                placeholder="username"
                                                id="log-in" type="text"
                                                value={this.state.username}
                                                className="validate"
                                                name="username"
                                                onChange={this.handleInputChange} />
                                            <label htmlFor="log-in">Username</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input
                                                placeholder="password"
                                                id="password"
                                                type="password"
                                                className="validate"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.handleInputChange} />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button onClick={this.handleFormSubmit} className="btn waves-effect waves-light" type="submit" name="action">Submit
                                    <i className="material-icons right"></i>
                                        </button>
                                    </div>
                                    <div className="row">
                                        <div className="col s12">
                                            Not a Member? Register <a href="/register">HERE</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
export default Login;