import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Navbar3 from "../Navbar3";
import API from "../../utils/API"

class Register extends Component {

    // state = {
    //     username: "",
    //     password: "",
    //     passwordReEnter: ""
    // };

    // handleInputChange = event => {
    //     const { name, value } = event.target;
    //     this.setState({
    //         [name]: value
    //     });
    // };

    render() {
        return (
            <div>
                <Navbar3/>
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
                                                value={this.props.username}
                                                name="username"
                                                onChange={this.props.handleInputChange} />
                                        </div>
                                        </div>
                                        <div className="row">
                                        <div className="input-field col s12">
                                            <input 
                                                placeholder="password"
                                                id="password"
                                                type="password"
                                                className="validate"
                                                value={this.props.password}
                                                name="password"
                                                onChange={this.props.handleInputChange} />
                                        </div>
                                        </div>
                                        <div className="row">
                                        <div className="input-field col s12">
                                            <input
                                                placeholder="Re-enter password"
                                                id="reEnterPwd"
                                                type="password"
                                                className="validate"
                                                name="passwordReEnter"
                                                value={this.props.passwordReEnter}
                                                onChange={this.props.handleInputChange} />
                                        </div>
                                        </div>
                                    </form>
                                    <div className="row">
                                        <button 
                                            className="btn waves-effect waves-light"
                                            id="registerBtn"
                                            type="submit"
                                            name="action"
                                            onClick={this.props.registerSubmit}>Submit
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