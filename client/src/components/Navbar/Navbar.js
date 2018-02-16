import React, { Component } from "react";
import "./Navbar.css";
import API from "../../utils/API";

class Navbar extends Component {

    logOut = () => {
        localStorage.clear();
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="/home" className="brand-logo"><i className="material-icons">cloud</i>BumbleBot</a>
                    <a href="" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="/create">Create Command</a></li>
                        <li><a href="/"
                        onClick={this.logOut}>Log Out</a></li>
                    </ul>

                    <ul className="right side-nav" id="mobile">
                        <li><a href="/create">Create Command</a></li>
                        <li><a href="/" onClick={this.logOut}>Log Out</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
};

export default Navbar;