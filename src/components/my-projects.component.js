import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/my-projects.css';
import "@material/drawer";
import "@material/list";
import AuthService from "../services/auth.service";
import ProjectService from "../services/project.service";

const user = AuthService.getCurrentUser();

var isProjectManager = false;
var isAdmin = false;

if(user !== null) {
  isProjectManager = user.roles.includes("PROJECT-MANAGER");
  isAdmin = user.roles.includes("ADMIN");
}


const Project = props => (
  <tr>
    <td>{props.project.name}</td>
    <td>{props.project.description}</td>
    <td className="td-3">
      <Link to={"/EditProject/"+props.id}>Manage Users</Link> | <Link to={"/ProjectDetail/"+props.id}>Details</Link>
    </td>
  </tr>
)

export default class MyProjects extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.refreshPage = this.refreshPage.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      projects: [],
      projectName: "",
      description: ""
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
   })}

  projectList() {
    return this.state.projects.map(currentproject => {
      return <Project project={currentproject} id={currentproject.id} key={currentproject.id} deleteProject={ProjectService.deleteProject} refresh={this.refreshPage}/>;
    })
  }

  onChangeProjectName(e) {
    this.setState({
      projectName: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    ProjectService.addProject(
      this.state.projectName,
      this.state.description,
      this.state.currentUser.email
    )
  }

    // this will refresh the component
   refreshPage() {
    window.location.reload(false);
  }

  render() {
    return (
         <div id="my-projects">
           {(isAdmin || isProjectManager)  && (

            <button 
              type="button" 
              className="btn btn-primary" 
              data-toggle="modal"  
              data-target="#exampleModal"> 
              CREATE NEW PROJECT
            </button>) }

            {/* start of modal  */}
            <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered " >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add New Project</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={this.handleSubmit} ref={c => {
                      this.form = c;
                    }}>
                      <div className="form-group">
                        <label htmlFor="project-name" className="col-form-label">Project Name:</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="project-name" 
                          name="project-name" 
                          value={this.state.projectName}
                          onChange={this.onChangeProjectName} 
                          required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="description" className="col-form-label">Description:</label>
                        <textarea 
                          className="form-control" 
                          id="description" 
                          name ="description"
                          value={this.state.description}
                          onChange={this.onChangeDescription} 
                          required></textarea>
                      </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                          <input type="submit" className="btn btn-primary" value="Add Project" onClick={this.refreshPage}/>
                        </div>
                    </form>
                  </div>
                  
                </div>
              </div>
            </div>
            {/* end of modal */}

            <div className="header-1 ">
                <h5 className=" header-1-text ">My Projects</h5>
            </div>
            <div className="box-1 box-shadow" style={{zIndex: "8!important"}}>
              <div className="box-inner">
                  <table className="table">
                  <thead>
                    <tr>
                      <th className="th-header-1">Project Name</th>
                      <th className="th-header-2">Description</th>
                      <th className="th-header-3"></th>
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