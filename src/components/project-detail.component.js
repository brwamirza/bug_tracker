import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/project-detail.css';
import "@material/drawer";
import "@material/list";
import AuthService from "../services/auth.service";
import ProjectService from "../services/project.service";

const User = props => (
  <tr>
    <td className="pl-0">{props.user.username}</td>
    <td className="pl-0 ">{props.user.email}</td>
    <td className="pl-0">{props.user.role}</td>
  </tr>
)

const Ticket = props => (
  <tr>
    <td className="pl-0">{props.ticket.title}</td>
    <td className="pl-0">{props.ticket.submitter}</td>
    <td className="pl-0">{props.ticket.developer}</td>
    <td className="pl-0">{props.ticket.status}</td>
    <td className="td-3 pl-0">
      <Link to={"/TicketDetails/"+props.ticket.id}>More Details</Link>
    </td>
  </tr>
)

export default class ProjectDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      project: [],
      users: [],
      tickets: []
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
   });

   ProjectService.getUsers(this.props.match.params.id).then(
    response => {
      this.setState({
        users: response.data
      });
    }
  ).catch((error) => {
    console.log(error);
 });

 ProjectService.getTickets(this.props.match.params.id).then(
  response => {
    this.setState({
      tickets: response.data
    });
    }
  ).catch((error) => {
    console.log(error);
  });
}

  userList() {
    return this.state.users.map(currentUser => {
      return <User user={currentUser} key={currentUser.id}/>;
    })
  }

  ticketList() {
    return this.state.tickets.map(currentTicket => {
      return <Ticket ticket={currentTicket} key={currentTicket.id}/>;
    })
  }

  render() {
    return (
     <div id="project-detail">
       <div className="row">
          <div className="col-12 col-lg-5">
              <div className="header-1 pt-4">
                <h5 className=" header-1-text ">Project Details</h5>
                <p className=" header-1-p ">
                  <Link className="pr-1" style={{color:"#000"}} to="/MyProjects">Back to List</Link>
                  |
                  <Link className="pl-1" style={{color:"#000"}} to={"/EditProject/"+this.props.match.params.id}>Edit</Link>
                </p>            
            </div>
            <div className="box-1" style={{zIndex: "8!important"}}>
              <div className="box-inner">
                <div className="pb-4 pt-5">
                  <div className=" row pt-5">
                    <div className="col-5 col-sm-5" style={{padding:"0"}}>
                      <p style={{color: "#9e9e9e"}}>Project Name</p>
                      <h6 className="pl-2">{this.state.project.name}</h6>
                    </div>
                    <div className="col-7 col-sm-7" style={{padding:"0"}}>
                      <p style={{color: "#9e9e9e"}}>Project Description</p>
                      <h6 className="pl-2">{this.state.project.description}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         </div>
         <div className="col-12 col-lg-7">
            <div>
              <div className="header-1 ">
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
                      {this.userList()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
       </div>
      <div> 

      <div className="ticket-section">
        <div className="header-1 ">
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
                  <th className="th-header-5"></th>
                </tr>
              </thead>
              <tbody className="table-items">
                {this.ticketList()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      </div>
     </div>     
    );
  }
}