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
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
      message: ""
    };
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

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.email, this.state.password).then(
        () => {
          this.props.history.push("/Dashboard");
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
        <img className="home__shape" src={require("../circle_transparent.svg")}/>
        <div className="home__left">
            <div className="home__text">
                <h1 className="text--light">Track</h1>
                <h1 className="text--light">Manage</h1>
                <h1 className="text--light">& Kill Bugs</h1>
                <h1 className="text--bold">Effectively</h1>
            </div>
        </div>

        <div className="home__right">
            <div className="signin_wrapper">
                <div className="form">
                    <h1 className="text--bold">Login</h1>
                    <h2 className="text--bold">Welcome back!</h2>
                    <Form
                    onSubmit={this.handleLogin}
                    ref={c => {
                      this.form = c;
                    }}
                    >
                      <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <Input 
                          type="email" 
                          className="form-control" 
                          name="email" 
                          aria-describedby="emailHelp" 
                          placeholder="email"
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                          validations={[required]}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input 
                          type="password" 
                          className="form-control"  
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