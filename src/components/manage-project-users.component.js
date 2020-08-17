import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/manage-project-users.css';
import "@material/drawer";
import "@material/list";
import Drawer from "./drawer.component"
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';


export default class ManageProjectUsers extends Component {

  render() {
    return (
     <div id="manage-project-users">
      <h1>Manage Project Users</h1>
    </div>
    );
  }
}