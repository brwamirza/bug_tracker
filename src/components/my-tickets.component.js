import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/my-tickets.css';
import "@material/drawer";
import "@material/list";
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TicketService from "../services/ticket.service";

const tickets = [];

const Ticket = props => (
  <tr>
    <td className="pl-0">{props.ticket.title}</td>
    <td className="pl-0">{props.ticket.project}</td>
    <td className="pl-0">{props.ticket.developer}</td>
    <td className="pl-0">{props.ticket.priority}</td>
    <td className="pl-0">{props.ticket.status}</td>
    <td className="pl-0">{props.ticket.type}</td>
    <td className="td-3 pl-0">
      <Link to={"/EditTicket/"+props.id}>Edit/Assign</Link> | <Link to={"/TicketDetails/"+props.id}>Details</Link>
    </td>
  </tr>
)

export default class MyTickets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      tickets: [],
      projectName: "",
      description: ""
    };
  }

  componentDidMount(){
    TicketService.getAllTickets(this.state.currentUser.email).then(
      response => {
        this.setState({
          tickets: response.data
        });
        console.log(this.state.tickets);

      }
    ).catch((error) => {
      console.log(error);
   })}

  ticketList() {
    return this.state.tickets.map(currentTicket => {
      return <Ticket ticket={currentTicket} id={currentTicket.id} key={currentTicket.id} />;
    })
  }

  render() {
    return (
         <div id="my-tickets">

           {/* toggle modal button */}
            <Link 
              type="button" 
              to="/CreateTicket"
              className="btn btn-primary"> 
              CREATE NEW TICKET
            </Link>

            <div className="header-1 ">
                <h5 className=" header-1-text ">My Tickets</h5>
            </div>
            <div className="box-1 box-shadow" style={{zIndex: "8!important"}}>
              <div className="box-inner">
                  <table className="table">
                  <thead>
                    <tr>
                      <th className="th-header-1">Title</th>
                      <th className="th-header-2">Project Name</th>
                      <th className="th-header-3">Developer Assigned</th>
                      <th className="th-header-4">Ticket Priority</th>
                      <th className="th-header-5">Ticket Status</th>
                      <th className="th-header-6">Ticket Type</th>
                      <th className="th-header-8"></th>
                    </tr>
                  </thead>
                  <tbody className="table-items">
                    { this.ticketList() }
                  </tbody>
                </table>
              </div>
            </div>
         </div>     
    );
  }
}