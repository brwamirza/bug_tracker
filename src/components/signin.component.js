import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/signin.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
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
                    <Form
                    onSubmit={this.handleLogin}
                    ref={c => {
                      this.form = c;
                    }}
                    >
                      <div class="form-group">
                        <label htmlFor="username">Username</label>
                        <Input 
                          type="username" 
                          class="form-control" 
                          name="username" 
                          aria-describedby="usernameHelp" 
                          placeholder="username"
                          value={this.state.username}
                          onChange={this.onChangeUsername}
                          validations={[required]}
                        />
                      </div>
                      
                      <div class="form-group">
                        <label htmlFor="password">Password</label>
                        <Input 
                          type="password" 
                          class="form-control"  
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          validations={[required]}
                        />
                      </div>
                      <div className="form-group d-flex justify-content-center">
                        <button
                          className="btn btn-primary btn-block"
                          disabled={this.state.loading}
                        >
                          {this.state.loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )}
                          <span>Login</span>
                        </button>
                      </div>

                      {this.state.message && (
                        <div className="form-group">
                          <div className="alert alert-danger" role="alert">
                            {this.state.message}
                          </div>
                        </div>
                      )}
                      <CheckButton
                        style={{ display: "none" }}
                        ref={c => {
                          this.checkBtn = c;
                        }}
                      />
                    </Form>
                    <Link to="/signup">Don't have an account?</Link>

                </div>

            </div>

        </div>

    </div>
    );
  }
}