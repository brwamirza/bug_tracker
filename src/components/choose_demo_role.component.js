import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/choose-demo-role.css';
import AuthService from "../services/auth.service";
import AdminIcon from'../images/admin-icon.png';
import ManagerIcon from'../images/manager-icon.png';
import DeveloperIcon from'../images/developer-icon.png';
import SubmitterIcon from'../images/submitter-icon.png';


export default class ChooseDemoRole extends Component {
  constructor(props) {
    super(props);
    this.adminSignIn = this.adminSignIn.bind(this);
    this.managerSignIn = this.managerSignIn.bind(this);
    this.developerSignIn = this.developerSignIn.bind(this);
    this.submitterSignIn = this.submitterSignIn.bind(this);
  }

  adminSignIn() {
    AuthService.login("demo_admin@test.com", "12345678").then(
      () => {
        this.props.history.push("/Dashboard");
        window.location.reload();
      });
  }

  managerSignIn() {
    AuthService.login("demo_manager@test.com", "12345678").then(
      () => {
        this.props.history.push("/Dashboard");
        window.location.reload();
      });
  }

  developerSignIn() {
    AuthService.login("demo_developer@test.com", "12345678").then(
      () => {
        this.props.history.push("/Dashboard");
        window.location.reload();
      });
  }

  submitterSignIn() {
    AuthService.login("demo_submitter@test.com", "12345678").then(
      () => {
        this.props.history.push("/Dashboard");
        window.location.reload();
      });
  }

  render() {
    return (
      <div className="choose-demo-role">
          <div className="text-center">
            <h1>Choose your Role</h1>
          </div>
          <div className="pt-5">
            <div className="row role-box">
              
              <div className="col-4 col-md-3 text-center" >
                <a href="#" onClick={this.adminSignIn}>
                  <img  src={AdminIcon} alt="admin icon"/>
                  <h5 className="text-center">Admin</h5>
                </a>
               
              </div>
              
              <div className="col-4 col-md-3 text-center" >
                <a href="#" onClick={this.managerSignIn}>
                  <img  src={ManagerIcon} alt="admin icon"/>
                  <h5 className="text-center">Manager</h5>
                </a>
              </div>
            </div>

            <div className="row pt-5 role-box">
              <div className="col-4 col-md-3 text-center" >
                <a href="#" onClick={this.developerSignIn}>
                  <img  src={DeveloperIcon} alt="admin icon"/>
                  <h5 className="text-center">Developer</h5>
                </a>
              </div>

              <div className="col-4 col-md-3 text-center" >
                <a href="#" onClick={this.submitterSignIn}>
                  <img  src={SubmitterIcon} alt="admin icon"/>
                  <h5 className="text-center">Submitter</h5>
                </a>
              </div>
            </div>
           
          </div>

          <div className="text-center pt-5">
            <p>Have an account? <Link to="/signin" className="link-style"> Sign In</Link></p>
          </div>

      </div>
    );
  }
}