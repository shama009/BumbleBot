import React, { Component } from "react";
import "./Navbar3.css";

class Navbar3 extends Component {


    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="/home" className="brand-logo"><i className="material-icons">cloud</i>BumbleBot</a>
                    <a href="" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                   
                    </ul>
                </div>
            </nav>
        )
    }
};

export default Navbar3;