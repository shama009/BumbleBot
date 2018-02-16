import "./Login.css";
import React, { Component } from 'react';
import API from "../../utils/API";

class Login extends Component {
    state = {
        username: "",
        password: "",
        input: ""
    };
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        console.log(this.state);
    };
    handleFormSubmit = event => {
        event.preventDefault();
        API.getUser({
            username: this.state.username
        })
        .then(data => {
            console.log(data);
            if (!data.data) {
                alert("no username exists, click link to register below");
            }
            else if (this.state.password === data.data.password) {
                localStorage.setItem("username", this.state.username);
                window.location = "/home";
            }
            else {
                alert("Password or Username is incorrect");
            }
        })
        
    };

    loginHandler(e) {
        e.preventDefault();
        console.log("clicked");
    }

    test(event) {
        event.preventDefault();
        // API.get();
        API.get().then(response => console.log(response));
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
                                    <div className="row">
                                        <div className="col s12">
                                            TEST? <a href={'/auth/twitter'}>TEST</a>
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