import React, { Component } from "react";


class Navbar2 extends Component {

    logOut = () => {
        localStorage.clear();
    }

    homeHandler =() => {
        window.location = "/home"
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="/register" className="brand-logo"><i className="material-icons">cloud</i>BumbleBot</a>
                    <a href="" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="/home" onClick={this.homeHandler}>Home</a></li>
                        <li><a href="/" onClick={this.logOut}>Log Out</a></li>
                    </ul>

                    <ul className="right side-nav" id="mobile">
                        <li><a href="/home"onClick={this.homeHandler}>Home</a></li>
                        <li><a href="/" onClick={this.logOut}>Log Out</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
};

export default Navbar2;