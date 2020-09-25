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
import EditAssignedUsers from './edit-assigned-users.component';
import CreateTicket from './create-ticket.component';
import TicketDetails from './ticket-details.component';


export default class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      userRole: AuthService.getCurrentUser().roles
    };
  }

  render() {
    return (
      <div className="background">
        <div id="admin">
           <Drawer username={this.state.currentUser.username} role={this.state.userRole} 
           urlPrefix={this.props.match.url} />
           <div >
            <Route exact path={`/Dashboard`} component={Dashboard}/>
            <Route exact path={`/ManageRoleAssignment`} component={ManageRoleAssignment}/>
            <Route exact path={`/ManageProjectUsers`} component={ManageProjectUsers}/>
            <Route exact path={`/MyProjects`} component={MyProjects}/>
            <Route exact path={`/MyTickets`} component={MyTickets}/>
            <Route exact path={`/ProjectDetail/:id`} component={ProjectDetail}/>
            <Route exact path={`/EditAssignedUsers/:id`} component={EditAssignedUsers}/>
            <Route exact path={`/CreateTicket/`} component={CreateTicket}/>
            <Route exact path={`/TicketDetails/:id`} component={TicketDetails}/>
           </div>
        </div>
      </div>
    );
  }
}