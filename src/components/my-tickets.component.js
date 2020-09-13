import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/my-tickets.css';
import "@material/drawer";
import "@material/list";
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProjectService from "../services/project.service";


// const Project = props => (
//   <tr>
//     <td>{props.project.name}</td>
//     <td>{props.project.description}</td>
//     <td className="td-3">
//       <Link to="#">Edit/Assign</Link> | <Link to={"/admin/ProjectDetail/"+props.id}>Details</Link>
//     </td>
//   </tr>
// )

export default class MyTickets extends Component {
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

  // projectList() {
  //   return this.state.projects.map(currentproject => {
  //     return <Project project={currentproject} id={currentproject.id} key={currentproject.id} refresh={this.refreshPage}/>;
  //   })
  // }

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
         <div id="my-tickets">

           {/* toggle modal button */}
            <button 
              type="button" 
              className="btn btn-primary"> 
              CREATE NEW TICKET
            </button>

            <div className="header-1 ">
                <h5 className=" header-1-text ">Your Tickets</h5>
                <p className=" header-1-p ">All the tickets you have in the database</p>            
            </div>
            <div className="box-1" style={{zIndex: "8!important"}}>
              <div className="box-inner">
                  <table className="table">
                  <thead>
                    <tr>
                      <th className="th-header-1">Title</th>
                      <th className="">Project Name</th>
                      <th className="">Developer Assigned</th>
                      <th className="">Ticket Priority</th>
                      <th className="">Ticket Status</th>
                      <th className="">Ticket Type</th>
                      <th className="">Created</th>
                      <th className=""></th>
                    </tr>
                  </thead>
                  <tbody className="table-items">
                    {/* { this.projectList() } */}
                  </tbody>
                </table>
              </div>
            </div>
         </div>     
    );
  }
}