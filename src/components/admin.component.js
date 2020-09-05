import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/admin.css';
import "@material/drawer";
import "@material/list";
import Drawer from "./drawer.component"
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DashboardHome from './dashboard-home.component';
import ManageRoleAssignment from './manage-role-assignment.component';
import ManageProjectUsers from './manage-project-users.component';
import MyProjects from './my-projects.component';
import MyTickets from './my-tickets.component';
import ProjectDetail from './project-detail.component';
import EditAssignedUsers from './edit-assigned-users.component';


export default class Admin extends Component {
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
           urlPrefix={this.props.match.url} url={this.props.match.url}/>
           <div >
            <Route exact path={`${this.props.match.url}/DashboardHome`} component={DashboardHome}/>
            <Route exact path={`${this.props.match.url}/ManageRoleAssignment`} component={ManageRoleAssignment}/>
            <Route exact path={`${this.props.match.url}/ManageProjectUsers`} component={ManageProjectUsers}/>
            <Route exact path={`${this.props.match.url}/MyProjects`} component={MyProjects}/>
            <Route exact path={`${this.props.match.url}/MyTickets`} component={MyTickets}/>
            <Route exact path={`${this.props.match.url}/ProjectDetail/:id`} component={ProjectDetail}/>
            <Route exact path={`${this.props.match.url}/EditAssignedUsers/:id`} component={EditAssignedUsers}/>
           </div>
        </div>
      </div>
    );
  }
}