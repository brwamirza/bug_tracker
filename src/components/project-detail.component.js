import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/project-detail.css';
import "@material/drawer";
import "@material/list";
import Drawer from "./drawer.component"
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProjectService from "../services/project.service";

// const Project = props => (
//   <tr>
//     <td>{props.project.name}</td>
//     <td>{props.project.description}</td>
//     <td>{props.project.description}</td>
//     <td>{props.project.description}</td>
//     <td className="td-3">
//       <Link to="#">Details</Link> | <a href="#" >Edit</a>
//     </td>
//   </tr>
// )

export default class ProjectDetail extends Component {
  constructor(props) {
    super(props);


    this.state = {
      currentUser: AuthService.getCurrentUser(),
      project: []
    };
  }

  componentDidMount(){
    ProjectService.getOneProject(this.props.match.params.id).then(
      response => {
        this.setState({
          project: response.data
        });
      }
    ).catch((error) => {
      console.log(error);
   })
  }

  // projectList() {
  //   return this.state.project.map(currentproject => {
  //     return <Project project={currentproject} key={currentproject.id}/>;
  //   })
  // }

  render() {
    return (
     <div id="project-detail">
      <div className="header-1 ">
          <h5 className=" header-1-text ">Project Details</h5>
          <p className=" header-1-p ">
            <Link className="pr-1" style={{color:"#000"}} to="/admin/MyProjects">Back to List</Link>
            |
            <Link className="pl-1" style={{color:"#000"}} to="#">Edit</Link>
          </p>            
      </div>
      <div className="box-1" style={{zIndex: "8!important"}}>
        <div className="box-inner">
          <div className="horizantal-line pb-4">
            <div className="pl-4 row">
              <div className="col-sm-6">
                <p>Project Name</p>
                <h6 className="pl-2">{this.state.project.name}</h6>
              </div>
              <div className="col-sm-6">
                <p>Project Description</p>
                <h6 className="pl-2">{this.state.project.description}</h6>
              </div>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-sm-5">
                <div>
                  <div className="header-2 ">
                      <h5 className=" header-1-text ">Assigned Personnel</h5>
                  </div>
                  <div className="box-1" style={{zIndex: "8!important"}}>
                    <div>
                        <table className="table">
                        <thead>
                          <tr>
                            <th className="th-header-1">User Name</th>
                            <th className="th-header-2">Email</th>
                            <th className="th-header-3">Role</th>
                          </tr>
                        </thead>
                        <tbody className="table-items">
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-7">
                <div>
                  <div className="header-2 ">
                      <h5 className=" header-1-text ">Tickets for this Project</h5>
                  </div>
                  <div className="box-1" style={{zIndex: "8!important"}}>
                    <div >
                        <table className="table">
                        <thead>
                          <tr>
                            <th className="th-header-1">Title</th>
                            <th className="th-header-2">Submitter</th>
                            <th className="th-header-3">Developer</th>
                            <th className="th-header-4">Status</th>
                            <th className="th-header-5">Created</th>
                            <th className="th-header-6"></th>
                          </tr>
                        </thead>
                        <tbody className="table-items">
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>     
    );
  }
}