import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/manage-role-assignment.css';
import "@material/drawer";
import "@material/list";
import Drawer from "./drawer.component"
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Select from 'react-select'


const arr = [];

const options = [];

const MemberList = props => (
  <tr>
    <td>{props.member.username}</td>
    <td>{props.member.email}</td>
    <td>{props.member.role}</td>
  </tr>
)

export default class ManageRoleAssignment extends Component {
  
  constructor(props) {
    super(props);
    this.onChangeSelectedRole = this.onChangeSelectedRole.bind(this);
    this.refreshPage = this.refreshPage.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      selectedRole: "",
      members: [],
    };
  }

  onChangeSelectedRole(e) {
    this.setState({
      selectedRole: e.target.value
    });
  }

 componentDidMount(){
  UserService.getAllNewMembers(this.state.currentUser.id).then(
    response => {
      this.setState({
        members: response.data
      });
      Object.keys(this.state.members).forEach(key => 
        arr.push({
          value: this.state.members[key].id, label: this.state.members[key].username
        }));
      console.log(this.state.members);
    }
  ).catch((error) => {
    console.log(error);
 })
 }

 MembersList() {
  return this.state.members.map(newMembers => {
    return <MemberList member={newMembers} key={newMembers.id}/>;
  })
}

 // this will refresh the component
 refreshPage() {
  window.location.reload(false);
}

  render() {
    return (
     <div id="manage-role-assignment">
       <h2 className="text--light">Manage User Roles</h2>

       <div className="row pt-4">
         <div className="col-xs-12 col-xl-4">
           <p style={{marginBottom: "6px"}}>Select a User</p>
                  <form>
                  <Select
                  options={arr}
                  onChange={(newValue) => console.log('onChange', newValue)}
                  onSubmit={() => console.log('onSubmit')}
                />

              <div className="line mt-3"></div>

              <p className="pt-5">Select the Role to assign</p>

                <Select
                  options={[
                    { value: 'N/A', label: 'Select a Role or None' },
                    { value: 'submitter', label: 'Submitter' },
                    { value: 'developer', label: 'Developer' },
                    { value: 'project-manager', label: 'Project Manager' },
                    { value: 'admin', label: 'Admin' },
                  ]}
                 
                  onChange={(newValue) => console.log('onChange', newValue)}
                  onSubmit={() => console.log('onSubmit')}
                />

                <input type="submit" className="btn btn-primary mt-5 w-100" value="Submit" onClick={this.refreshPage}/>
              </form>

          </div>
         <div className="col-xs-12 col-xl-8">
            <div className="header-1 ">
              <h5 className=" header-1-text ">Your Personnel</h5>
              <p className=" header-1-p ">All the users in your database</p>            
            </div>
            <div className="box-1" style={{zIndex: "8!important"}}>
              <div className="box-inner">
                  <table className="table">
                  <thead>
                    <tr>
                      <th className="th-header-1">User Name</th>
                      <th className="th-header-2">Email</th>
                      <th className="th-header-3">Role</th>
                    </tr>
                  </thead>
                  <tbody className="table-items">
                    {console.log(arr)}
                    { this.MembersList() }
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