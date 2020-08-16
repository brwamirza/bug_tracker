import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/admin.css';
import "@material/drawer";
import "@material/list";
import {MDCList} from "@material/list";
import Drawer from "./drawer.component"
import AuthService from "../services/auth.service";


export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    return (
     <div id="admin">
      <Drawer username={this.state.currentUser.username}/>
    </div>
    );
  }
}