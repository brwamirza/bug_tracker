import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/dashboard-home.css';
import "@material/drawer";
import "@material/list";
import Drawer from "./drawer.component"
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';


export default class DashboardHome extends Component {

  render() {
    return (
     <div id="dashboard-home">
      <h1>Dashboard home</h1>
    </div>
    );
  }
}