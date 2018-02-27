import React, { Component } from "react";
import "./Navbar.css";
// import API from "../../utils/API";
import logo from "../../images/logo.svg"

class Navbar extends Component {

    logOut = () => {
        localStorage.clear();
    }

    
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="/home" className="brand-logo">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BumbleBot</a>
                    <img alt="logo" src={logo}/>
                    <a href="" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        {/* <li><a
                            className="waves-effect waves-light btn"
                            href="/auth/twitter" >
                            <i className="fab fa-twitter"></i> Sign up with Twitter</a></li> */}
                        <li><a href="/create">Create Command</a></li>
                        <li><a href="/"
                        onClick={this.logOut}>Log Out</a></li>
                    </ul>

                    <ul className="right side-nav" id="mobile">
                        <li><a onClick={console.log("hi") } href="/create">Create Command</a></li>

                        <li><a href="/"
                        onClick={this.logOut}>Log Out</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
};

export default Navbar;