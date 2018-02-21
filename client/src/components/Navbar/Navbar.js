import React, { Component } from "react";
import "./Navbar.css";
// import API from "../../utils/API";
import logo from "../../images/logo.svg";
// import { NavItem, Navbar } from 'react-materialize'

class Navbar extends Component {

    logOut = () => {
        localStorage.clear();
    }
    render() {
        return (
            // <div>
                
            //     <Navbar brand='logo' right> <img alt="logo" src={logo} />
            //         <NavItem href='get-started.html'>Getting started</NavItem>
            //         <NavItem href='components.html'>Components</NavItem>
            //     </Navbar>
            
                
            // </div>




            <nav>
                <div className="nav-wrapper">
                    <a href="/home"  className="brand-logo">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BumbleBot</a>
                    <img alt="logo" src={logo} />
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