import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/edit-assigned-users.css';
import "@material/drawer";
import "@material/list";
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProjectService from "../services/project.service";
import Select from 'react-select'

export default class EditAssignedUsers extends Component {
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
     <div id="edit-assigned-users">
         <div className="box">
            <div className="header-1 ">
            <h5 className=" header-1-text ">Edit Assigned Users</h5>
            <p className=" header-1-p ">
                <Link className="pr-1" style={{color:"#fff"}} to="/admin/ManageProjectUsers">Back to List</Link>
            </p>            
            </div>
            <div className="box-1" style={{zIndex: "8!important"}}>
            <div className="box-inner">
            <div className="pb-4">
            <form onSubmit={this.handleSubmit}>

                <div className="row horizantal-line pb-4">
                <div className="col-sm-5 pr-5">
                  <p>Project Name</p>
                   <h6>{this.state.project.name}</h6>

                     <p className="pt-4">Project Manager</p>
 
                      <Select
                      // options={newMembersList}
                      // onChange={(newValue) => this.onChangeNewMemberList(newValue.value)}
                      onSubmit={() => console.log('onSubmit')}
                      />

                      <p className="pt-4">Developer</p>
 
                        <Select
                        options={[
                            { value: null, label: 'Select a Role or None' },
                            { value: 'submitter', label: 'Submitter' },
                            { value: 'developer', label: 'Developer' },
                            { value: 'project-manager', label: 'Project Manager' },
                            { value: 'admin', label: 'Admin' },
                        ]}
                        
                        // onChange={(newValue) => this.onChangeSelectedRole(newValue.value)}
                        onSubmit={() => console.log('onSubmit')}
                        />


                </div>
                <div className=" pl-5 col-sm-5">
                    <p>Project Description</p>
                    <h6>{this.state.project.description}</h6>

                    <p className="pt-4">Developer</p>
 
                    <Select
                    options={[
                        { value: null, label: 'Select a Role or None' },
                        { value: 'submitter', label: 'Submitter' },
                        { value: 'developer', label: 'Developer' },
                        { value: 'project-manager', label: 'Project Manager' },
                        { value: 'admin', label: 'Admin' },
                    ]}
                    
                    // onChange={(newValue) => this.onChangeSelectedRole(newValue.value)}
                    onSubmit={() => console.log('onSubmit')}
                    />


                </div>
              </div>
              <div className="input-right">
                <input type="submit" className="btn btn-primary mt-4" value="UPDATE PROJECT" onClick={this.refreshPage}/>
              </div>

              </form>
            </div>
           <div>
          </div>
        </div>
      </div>
     </div>     
     </div>     
    );
  }
}