import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/my-projects.css';
import "@material/drawer";
import "@material/list";
import Drawer from "./drawer.component"
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';


export default class MyProjects extends Component {

  render() {
    return (
     <div id="my-projects">
      <h1>My Projects</h1>
    </div>
    );
  }
}