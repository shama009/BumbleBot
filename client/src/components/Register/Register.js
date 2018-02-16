import React, { Component } from "react";
import "./Register.css";
import "../../utils/API"

class Register extends Component {

    state = {
        username: "",
        password: "",
        passwordReEnter: ""
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]:value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log("Username: " + this.state.username + "\nPassword: " + this.state.password);
        this.setState({
            username:"",
            password:"",
            passwordReEnter:""
        })
    }

    render() {
        return (
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
                                            <label htmlFor="username">Username</label>
                                            <input 
                                                placeholder="username" 
                                                id="username" 
                                                type="text" 
                                                className="validate"
                                                value={this.state.username}
                                                name="username"
                                                onChange={this.handleInputChange} />
                                        </div>
                                        </div>
                                        <div className="row">
                                        <div className="input-field col s12">
                                            <label htmlFor="password">Password</label>
                                            <input 
                                                placeholder="password"
                                                id="password"
                                                type="password"
                                                className="validate"
                                                value={this.state.password}
                                                name="password"
                                                onChange={this.handleInputChange} />
                                        </div>
                                        </div>
                                        <div className="row">
                                        <div className="input-field col s12">
                                            <label htmlFor="reEnterPwd">Re-Enter Password</label>
                                            <input
                                                placeholder="-"
                                                id="reEnterPwd"
                                                type="password"
                                                className="validate"
                                                name="passwordReEnter"
                                                value={this.state.passwordReEnter}
                                                onChange={this.handleInputChange} />
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
        )
    }
}

export default Register;