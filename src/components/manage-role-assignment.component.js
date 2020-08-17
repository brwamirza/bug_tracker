import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/manage-role-assignment.css';
import "@material/drawer";
import "@material/list";
import Drawer from "./drawer.component"
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';


export default class ManageRoleAssignment extends Component {

  render() {
    return (
     <div id="manage-role-assignment">
      <h1>Manage Role Assignment</h1>
    </div>
    );
  }
}