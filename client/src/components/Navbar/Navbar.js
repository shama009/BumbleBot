import React, { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {

    logOut = () => {
        localStorage.clear();
    }

    createCommandHandler =() => {
        window.location = "/create"
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="/register" className="brand-logo"><i className="material-icons">cloud</i>BumbleBot</a>
                    <a href="" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><a
                            className="waves-effect waves-light btn"
                            href="/auth/twitter">
                            <i className="fab fa-twitter"></i> Sign up with Twitter</a></li>
                        <li><a href="create-command.html">Create Command</a></li>
                        <li><a href="/"
                        onClick={this.logOut}>Log Out</a></li>
                    </ul>

                    <ul className="right side-nav" id="mobile">
                        <li><a href="/create"onClick={this.createCommandHandler}>Create Command</a></li>
                        <li><a href="/" onClick={this.logOut}>Log Out</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
};

export default Navbar;