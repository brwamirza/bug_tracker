import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/manage-project-users.css';
import "@material/drawer";
import "@material/list";
import AuthService from "../services/auth.service";
import ProjectService from "../services/project.service";

const Project = props => (
  <tr>
    <td>{props.project.name}</td>
    <td>{props.project.manager}</td>
    <td>{props.project.developer}</td>
    <td>{props.project.submitter}</td>
    <td className="td-3">
      <Link to={"/ProjectDetail/"+props.id}>Details</Link> | <Link to={"/EditProject/"+props.id}>Edit</Link>
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
   });
  }

  projectList() {
    return this.state.projects.map((currentProject,index) => {
        return <Project   
                project={currentProject} 
                id={currentProject.id} 
                key={currentProject.id} 
                />
    })
  }

  render() {
    return (
     <div id="manage-project-users">
      <div className="header-1 ">
          <h5 className=" header-1-text ">Assigned Personnel</h5>
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