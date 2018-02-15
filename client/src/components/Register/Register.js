import React, { Component } from "react";
import API from "../../utils/API";
import "./Register.css";
import Navbar3 from "../Navbar3";

class Register extends Component {

    state = {
        username: "",
        password: "",
        passwordReEnter: ""
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.password === this.state.passwordReEnter) {
            localStorage.setItem("username", this.state.username);
            localStorage.setItem("password", this.state.password);
            API.saveUser({
                username: this.state.username,
                password: this.state.password
            })
                .then(res => window.location = "/home")
                .catch(err => console.log(err));
            this.setState({
                username: "",
                password: "",
                passwordReEnter: ""
            });
            window.location = "/home";
        }
        else {
            alert("Password's don't match!");
        }

    }

    render() {
        return (
            <div>
                <Navbar3 />
                <div className="container">
                    <div className="row">
                        <div className="col s12 m12">
                            <div className="card blue-grey darken-1" id="register-card">
                                <div className="card-content white-text">
                                    <span className="card-title">Register</span>
                                    <div className="row">
                                        <form className="col s12">
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input
                                                        placeholder="username"
                                                        id="username"
                                                        type="text"
                                                        className="validate"
                                                        value={this.state.username}
                                                        name="username"
                                                        onChange={this.handleInputChange} />
                                                    <label htmlFor="username">Username</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input
                                                        placeholder="password"
                                                        id="password"
                                                        type="password"
                                                        className="validate"
                                                        value={this.state.password}
                                                        name="password"
                                                        onChange={this.handleInputChange} />
                                                    <label htmlFor="password">Password</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input
                                                        placeholder="-"
                                                        id="reEnterPwd"
                                                        type="password"
                                                        className="validate"
                                                        name="passwordReEnter"
                                                        value={this.state.passwordReEnter}
                                                        onChange={this.handleInputChange} />
                                                    <label htmlFor="reEnterPwd">Re-Enter Password</label>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="row">
                                            <button
                                                className="btn waves-effect waves-light"
                                                type="submit"
                                                name="action"
                                                onClick={this.handleFormSubmit}>Submit
                                            <i className="material-icons right">send</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;