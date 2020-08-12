import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/signup.css';


export default class Signup extends Component {
  constructor(props) {
    super(props);
   }

  render() {
    return (
      <div id="signup">
        <img class="home__shape" src={require("../circle_transparent.svg")}/>
        <div className="home__left">
            <div class="home__text">
                <h1 class="text--light">Track</h1>
                <h1 class="text--light">Manage</h1>
                <h1 class="text--light">& Kill Bugs</h1>
                <h1 class="text--bold">Effectively</h1>
            </div>
        </div>

        <div className="home__right">
            <div className="signin_wrapper">
                <div className="form">
                    <h1 class="text--bold">Signup</h1>
                    <form>
                      <div class="form-group">
                        <label for="signup_username">Username</label>
                        <input type="text" class="form-control" id="signup_username" placeholder="Username"/>
                      </div>
                      <div class="form-group">
                        <label for="signup_email">Email address</label>
                        <input type="email" class="form-control" id="signup_email" aria-describedby="emailHelp" placeholder="Enter email"/>
                      </div>
                      <div class="form-group">
                        <label for="signup_password">Password</label>
                        <input type="password" class="form-control" id="signup_password" placeholder="Password"/>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary">Signup</button>
                      </div>
                    </form>
                    <Link to="/signin">Already have an account?</Link>

                </div>

            </div>

        </div>

    </div>
    );
  }
}