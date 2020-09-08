import {_} from 'lodash';
import {zip} from 'lodash';
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
    <td>{props.projectManager}</td>
    <td>{props.developer}</td>
    <td>{props.submitter}</td>
    <td className="td-3">
      <Link to={"/admin/ProjectDetail/"+props.id}>Details</Link> | <Link to={"/admin/EditAssignedUsers/"+props.id}>Edit</Link>
    </td>
  </tr>
)

export default class ManageProjectUsers extends Component {
  constructor(props) {
    super(props);


    this.state = {
      currentUser: AuthService.getCurrentUser(),
      projects: [],
      submitter:"",
      developer:"",
      projectManager:""
    };
  }

  componentDidMount(){
   ProjectService.getAllProjectsWithUsers(this.state.currentUser.email).then(
    response => {
      this.setState({
        projects: response.data
      });

      this.state.projects.map((value,index) => {
        var i = 0;
        var size = Object.keys(value.users).length;
        for( i=0;i<size;i++){
        if(value.users[i].role === "submitter"){
          this.setState({
            submitter: value.users[i].username
          })
        }
        if(value.users[i].role === "developer"){
          this.setState({
            developer: value.users[i].username
          })
        }
        if(value.users[i].role === "project-manager"){
          this.setState({
            projectManager: value.users[i].username
          })
        }
      }
    })
    }
  ).catch((error) => {
    console.log(error);
   });
  }

  projectList() {
    return this.state.projects.map((value,index) => {
        return <Project   
                project={value} 
                id={value.id} 
                key={value.id} 
                submitter={this.state.submitter} 
                developer={this.state.developer}
                projectManager={this.state.projectManager}/>
    })
  }

  render() {
    return (
     <div id="manage-project-users">
      <div className="header-1 ">
          <h5 className=" header-1-text ">Assigned Personnel</h5>
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