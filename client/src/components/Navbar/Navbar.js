import React from "react";
import "./Navbar.css";

const Navbar = props => (
    <nav>
        <div className="nav-wrapper">
            <a href="/register" className="brand-logo"><i className="material-icons">cloud</i>BumbleBot</a>
            <a href="" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
                <li><a href="create-command.html">Create Command</a></li>
                <li><a href="badges.html">Log Out</a></li>
            </ul>

            <ul className="right side-nav" id="mobile">
                <li><a href="create-command.html">Create Command</a></li>
                <li><a href="badges.html">Log Out</a></li>
            </ul>
        </div>
    </nav>
);

export default Navbar;