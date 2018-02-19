import React, { Component } from "react";
import "./SignUpTwitter.css";
import API from "../../utils/API";

class SignUpTwitter extends Component {

  test() {
    API.test();
  }

  render() {
  console.log(this.props);
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
                  href="/auth/twitter"
                  target="_blank">
                  <i className="fab fa-twitter"></i> Sign up with Twitter</a>
                  <a
                  className="waves-effect waves-light btn"
                  id="twitterBtn"
                  onClick={this.test}>
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