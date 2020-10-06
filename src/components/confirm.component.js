import React, { Component } from 'react';
import '../css/admin.css';
import "@material/drawer";
import "@material/list";
import AuthService from "../services/auth.service";



export default class Confirm extends Component {
  
componentDidMount(){
  AuthService.verifyEmail(this.props.match.params.token).then(() => {
    this.props.history.push("/Dashboard");
    window.location.reload();
  });
}

  render() {
    return (
      <div className="background">
          <h1>please wait</h1>
      </div>
    );
  }
}