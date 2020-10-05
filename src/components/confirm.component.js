import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/admin.css';
import "@material/drawer";
import "@material/list";
import Drawer from "./drawer.component"
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './dashboard.component';
import ManageRoleAssignment from './manage-role-assignment.component';
import ManageProjectUsers from './manage-project-users.component';
import MyProjects from './my-projects.component';
import MyTickets from './my-tickets.component';
import ProjectDetail from './project-detail.component';
import EditProject from './edit-project.component';
import CreateTicket from './create-ticket.component';
import TicketDetails from './ticket-details.component';
import EditTicket from './edit-ticket.component';


export default class Confirm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      role:"",
      username:""
    };
  }
  
componentDidMount(){
  AuthService.verifyEmail(this.props.match.params.token).then(() => {
    this.props.history.push("/Dashboard");
    window.location.reload();
  });
}

  render() {
    return (
      <div className="background">
          <h1>please wait</h1>
      </div>
    );
  }
}