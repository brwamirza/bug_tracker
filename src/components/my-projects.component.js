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
        <button type="button" class="btn btn-primary">CREATE NEW PROJECT</button>
        <div className="header-1 ">
            <h5 className=" header-1-text ">Your Projects</h5>
            <p className=" header-1-p ">All the projects you have in the database</p>            
        </div>
        <div className="box-1">

        </div>
     </div>
    );
  }
}