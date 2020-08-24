import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/manage-role-assignment.css';
import "@material/drawer";
import "@material/list";
import Drawer from "./drawer.component"
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Select, CaretIcon, MultiSelectOptionMarkup, ModalCloseButton } from 'react-responsive-select';
import 'react-responsive-select/dist/react-responsive-select.css';


export default class ManageRoleAssignment extends Component {
  constructor(props) {
    super(props);
    this.onChangeSelectedRole = this.onChangeSelectedRole.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      selectedRole: ""
    };
  }

  onChangeSelectedRole(e) {
    this.setState({
      selectedRole: e.target.value
    });
  }

  addRole(){

  }

  render() {
    return (
     <div id="manage-role-assignment">
       <h2 className="text--light">Manage User Roles</h2>

       <div className="row pt-4">
         <div className="col-xs-12 col-xl-4">
           <p style={{marginBottom: "6px"}}>Select 1 or more Users</p>
                  <form>
                    <Select
                      multiselect={true}
                      name="make6"
                      selectedValues={['fiat']}
                      modalCloseButton={<ModalCloseButton />}
                      options={[
                        {
                          value: 'N/A',
                          text: 'None',
                          markup: <MultiSelectOptionMarkup text="None" />,
                        },
                        {
                          value: 'fiat',
                          text: 'Fiat',
                          markup: <MultiSelectOptionMarkup text="Fiat" />,
                        },
                        {
                          value: 'subaru',
                          text: 'Subaru',
                          markup: <MultiSelectOptionMarkup text="Subaru" />,
                        },
                        {
                          value: 'suzuki',
                          text: 'Suzuki',
                          markup: <MultiSelectOptionMarkup text="Suzuki" />,
                        },
                      ]}
                      caretIcon={<CaretIcon />}
                      onChange={(...rest) => console.log(rest)}
                      onSubmit={() => console.log('onSubmit')}
                    />
                </form>

              <div className="line"></div>

              <p className="pt-5">Select the Role to assign</p>
              <form>
                <Select
                  modalCloseButton={<ModalCloseButton />}
                  options={[
                    { value: 'N/A', text: 'Select a Role or None' },
                    { value: 'submitter', text: 'Submitter' },
                    { value: 'developer', text: 'Developer' },
                    { value: 'project-manager', text: 'Project Manager' },
                    { value: 'admin', text: 'Admin' },
                  ]}
                  caretIcon={<CaretIcon />}
                  selectedValue="subaru"
                  onChange={(newValue) => console.log('onChange', newValue)}
                  onSubmit={() => console.log('onSubmit')}
                />
              </form>
              {/* <div className="dropdown">
                <select 
                  value={this.state.selectedRole} 
                  onChange={this.onChangeSelectedRole} 
                >
                  <option value="N/A">Select a Role or None</option>
                  <option value="Submitter">Submitter</option>
                  <option value="Developer">Developer</option>
                  <option value="Project-Manager">Project Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div> */}

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
                    {/* { this.projectList() } */}
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