import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/signin.css';


export default class Signin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
     <div id="signin">
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
                    <h1 class="text--bold">Login</h1>
                    <h2 class="text--bold">Welcome back!</h2>
                    <form action="">
                        
                    </form>

                </div>

            </div>

        </div>

    </div>
    );
  }
}