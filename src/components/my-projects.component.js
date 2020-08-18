import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/my-projects.css';
import "@material/drawer";
import "@material/list";
import Drawer from "./drawer.component"
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';


const Project = props => (
  <tr>
    <td>{props.project.name}</td>
    <td>{props.project.description}</td>
    <td>
      <Link>Manage Users</Link> | <a href="#">Details</a>
    </td>
  </tr>
)

export default class MyProjects extends Component {
  constructor(props) {
    super(props);

    this.state = {projects: []};
  }

  projectList() {
    return this.state.projects.map(currentproject => {
      return <Project project={currentproject} />;
    })
  }


  render() {
    return (
      <div id="my-projects-body">
         <div id="my-projects">
            <button type="button" class="btn btn-primary">CREATE NEW PROJECT</button>
            <div className="header-1 ">
                <h5 className=" header-1-text ">Your Projects</h5>
                <p className=" header-1-p ">All the projects you have in the database</p>            
            </div>
            <div className="box-1">
              <div className="box-inner">
                  <table className="table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Description</th>
                      <th>Duration</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.projectList() }
                  </tbody>
                </table>
              </div>
            </div>
         </div>
      </div>
     
    );
  }
}