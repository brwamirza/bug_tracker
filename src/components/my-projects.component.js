import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/my-projects.css';
import "@material/drawer";
import "@material/list";
import Drawer from "./drawer.component"
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProjectService from "../services/project.service";
import { findAllByTestId } from '@testing-library/react';


const Project = props => (
  <tr>
    <td>{props.project.name}</td>
    <td>{props.project.description}</td>
    <td className="td-3">
      <Link>Manage Users</Link> | <a href="#">Details</a>
    </td>
  </tr>
)

export default class MyProjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      projects: []
    };
  }

  componentDidMount(){
    ProjectService.getAllProjects(this.state.currentUser.email).then(
      response => {
        this.setState({
          projects: response.data
        });
      }
    ).catch((error) => {
      console.log(error);
   })
  
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
            <button type="button" className="btn btn-primary">CREATE NEW PROJECT</button>
            <div className="header-1 ">
                <h5 className=" header-1-text ">Your Projects</h5>
                <p className=" header-1-p ">All the projects you have in the database</p>            
            </div>
            <div className="box-1">
              <div className="box-inner">
                  <table className="table">
                  <thead>
                    <tr>
                      <th className="th-header-1">Project Name</th>
                      <th className="th-header-2">Description</th>
                      <th className="th-header-3"></th>
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