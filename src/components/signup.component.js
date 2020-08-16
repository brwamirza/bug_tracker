import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/signup.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

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

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "",
      roles: ["admin"]
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.roles
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
          this.props.history.push("/admin");
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
            successful: false,
            message: resMessage
          });
        }
      );
    }
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
                    <Form
                      onSubmit={this.handleRegister}
                      ref={c => {
                        this.form = c;
                      }} >
                      <div class="form-group">
                        <label htmlFor="username">Username</label>
                        <Input 
                          type="text" 
                          class="form-control" 
                          placeholder="Username" 
                          name="username" 
                          value={this.state.username}
                          onChange={this.onChangeUsername} 
                          validations={[required, vusername]}
                        />
                      </div>
                      <div class="form-group">
                        <label htmlFor="email">Email address</label>
                        <Input 
                          type="email" 
                          class="form-control" 
                          aria-describedby="emailHelp" 
                          placeholder="Enter email" 
                          name="email"
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                          validations={[required, email]}
                        />
                      </div>
                      <div class="form-group">
                        <label htmlFor="password">Password</label>
                        <Input 
                          type="password" 
                          class="form-control" 
                          placeholder="Password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          validations={[required, vpassword]}
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary">Signup</button>
                      </div>

                      {this.state.message && (
                        <div className="form-group">
                          <div
                            className={
                              this.state.successful
                                ? "alert alert-success"
                                : "alert alert-danger"
                            }
                            role="alert"
                          >
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
                    <Link to="/signin">Already have an account?</Link>

                </div>

            </div>

        </div>

    </div>
    );
  }
}