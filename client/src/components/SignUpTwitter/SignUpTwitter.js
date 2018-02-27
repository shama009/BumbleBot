import React, { Component } from "react";
import "./SignUpTwitter.css";
// import API from "../../utils/API";

class SignUpTwitter extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12">
            <div className="card blue-grey darken-1" id="twitterCard">
              <div className="card-content white-text">
                <span className="card-title">Please sign up with twitter</span>
              </div>
              <div className="card-action" id="twitterBtnDiv">
              <a
                  className="waves-effect waves-light btn"
                  id="twitterBtn"
                  href="http://localhost:3001/auth/twitter"
                  // onClick={this.test()}
                  target="_blank">
                  <i className="fab fa-twitter"></i> Sign up with Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUpTwitter;