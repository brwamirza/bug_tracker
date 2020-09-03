import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/manage-project-users.css';
import "@material/drawer";
import "@material/list";
import Drawer from "./drawer.component"
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProjectService from "../services/project.service";

const Project = props => (
  <tr>
    <td>{props.project.name}</td>
    <td>{props.project.description}</td>
    <td>{props.project.description}</td>
    <td>{props.project.description}</td>
    <td className="td-3">
      <Link to="/admin/ProjectDetail">Details</Link> | <a href="#" >Edit</a>
    </td>
  </tr>
)

export default class ManageProjectUsers extends Component {
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
      return <Project project={currentproject} key={currentproject.id}/>;
    })
  }

  render() {
    return (
     <div id="manage-project-users">
      <div className="header-1 ">
          <h5 className=" header-1-text ">Project Users</h5>
          <p className=" header-1-p ">All the projects you have in the database</p>            
      </div>
      <div className="box-1" style={{zIndex: "8!important"}}>
        <div className="box-inner">
            <table className="table">
            <thead>
              <tr>
                <th className="th-header-1">Project Name</th>
                <th className="th-header-2">Project Manager</th>
                <th className="th-header-3">Developer</th>
                <th className="th-header-4">Submitter</th>
                <th className="th-header-5"></th>
              </tr>
            </thead>
            <tbody className="table-items">
              { this.projectList() }
            </tbody>
          </table>
        </div>
      </div>
     </div>     
    );
  }
}