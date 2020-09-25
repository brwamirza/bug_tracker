import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/ticket-details.css';
import "@material/drawer";
import "@material/list";
import Drawer from "./drawer.component"
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TicketService from "../services/ticket.service";
import ProjectService from "../services/project.service";

// const Message = props => (
//   <tr>
//     <td className="pl-0">{props.message.commenter}</td>
//     <td className="pl-0 ">{props.message.message}</td>
//   </tr>
// )

// const Ticket = props => (
//   <tr>
//     <td className="pl-0">{props.ticket.title}</td>
//     <td className="pl-0">{props.ticket.submitter}</td>
//     <td className="pl-0">{props.ticket.developer}</td>
//     <td className="pl-0">{props.ticket.status}</td>
//     <td className="td-3 pl-0">
//       <Link to="#">More Details</Link>
//     </td>
//   </tr>
// )

export default class TicketDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
    //   messages: [],
    //   users: [],
      ticket: []
    };
  }

  componentDidMount(){
    TicketService.getOneTicket(this.props.match.params.id).then(
      response => {
        this.setState({
          ticket: response.data
        });
      }
    ).catch((error) => {
      console.log(error);
   });

//    ProjectService.getUsers(this.props.match.params.id).then(
//     response => {
//       this.setState({
//         users: response.data
//       });
//     }
//   ).catch((error) => {
//     console.log(error);
//  });

//  ProjectService.getTickets(this.props.match.params.id).then(
//   response => {
//     this.setState({
//       tickets: response.data
//     });
//     }
//   ).catch((error) => {
//     console.log(error);
//   });
}

//   messageList() {
//     return this.state.users.map(currentUser => {
//       return <User user={currentUser} key={currentUser.id}/>;
//     })
//   }

//   ticketList() {
//     return this.state.tickets.map(currentTicket => {
//       return <Ticket ticket={currentTicket} key={currentTicket.id}/>;
//     })
//   }

  render() {
    return (
     <div id="ticket-detail">
       <div className="row">
          <div className="col-md-6">
            <div className="header-1 pt-4">
                <h5 className=" header-1-text ">Project Details</h5>
                <p className=" header-1-p ">
                    <Link className="pr-1" style={{color:"#000"}} to="/MyTickets">Back to List</Link>
                    |
                    <Link className="pl-1" style={{color:"#000"}} to="#">Edit</Link>
                </p>            
            </div>
            <div className="box-1" style={{zIndex: "8!important"}}>
              <div className="box-inner">
                <div className="pb-4 pt-5">
                  <div className=" row">
                    <div className="col-sm-5">
                      <p  className="pt-4" style={{color: "#9e9e9e"}}>Ticket Title</p>
                      <h6 className="pl-2">{this.state.ticket.title}</h6>

                      <p className="pt-4" style={{color: "#9e9e9e"}}>Assigned Developer</p>
                      <h6 className="pl-2">{this.state.ticket.developer}</h6>

                      <p className="pt-4" style={{color: "#9e9e9e"}}>Project</p>
                      <h6 className="pl-2">{this.state.ticket.project}</h6>

                      <p  className="pt-4" style={{color: "#9e9e9e"}}>Ticket Status</p>
                      <h6 className="pl-2">{this.state.ticket.status}</h6>
                    </div>

                    <div className="col-sm-7">
                      <p className="pt-4" style={{color: "#9e9e9e"}}>Ticket Description</p>
                      <h6 className="pl-2">{this.state.ticket.description}</h6>

                      <p className="pt-4" style={{color: "#9e9e9e"}}>Submitter</p>
                      <h6 className="pl-2">{this.state.ticket.submitter}</h6>

                      <p className="pt-4" style={{color: "#9e9e9e"}}>Ticket Priority</p>
                      <h6 className="pl-2">{this.state.ticket.priority}</h6>

                      <p className="pt-4" style={{color: "#9e9e9e"}}>Ticket Type</p>
                      <h6 className="pl-2">{this.state.ticket.type}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         </div>
         <div className="col-md-6">
            <div>
              <div>

              </div>
              <div className="header-1 ">
                  <h5 className=" header-1-text ">Ticket Comments</h5>
              </div>
              <div className="box-1" style={{zIndex: "8!important"}}>
                <div>
                    <table className="table">
                    <thead>
                      <tr>
                        <th className="th-header-1">Commenter</th>
                        <th className="th-header-2">Message</th>
                      </tr>
                    </thead>
                    <tbody className="table-items">
                      {/* {this.messageList()} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
       </div>
      <div> 

      <div>
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
                {/* {this.ticketList()} */}
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