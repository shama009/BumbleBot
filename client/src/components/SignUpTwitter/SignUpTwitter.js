import React, { Component } from "react";
import "./SignUpTwitter.css";

class SignUpTwitter extends Component {
  render() {
  console.log(/*"Props from register: " + */ this.props);
    return (
      <div className="container">
        <div class="row">
          <div class="col s12 m12">
            <div class="card blue-grey darken-1" id="twitterCard">
              <div class="card-content white-text">
                <span class="card-title">Please sign up with twitter</span>
              </div>
              <div class="card-action" id="twitterBtnDiv">
              <a
                  className="waves-effect waves-light btn"
                  id="twitterBtn"
                  href="/auth/twitter">
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