import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/edit-assigned-users.css';
import "@material/drawer";
import "@material/list";
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProjectService from "../services/project.service";
import UserService from "../services/user.service";
import Select from 'react-select'


const submitterList = [];
const developerList = [];
const managerList = [];

export default class EditAssignedUsers extends Component {
  constructor(props) {
    super(props);
    this.onChangeSelectedSubmitter = this.onChangeSelectedSubmitter.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.onChangeSelectedDeveloper = this.onChangeSelectedDeveloper.bind(this);
    this.onChangeSelectedManager = this.onChangeSelectedManager.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      project: [],
      submitter:"",
      developer:"",
      manager:"",
      members: [],
      submitterList: [],
      developerList: [],
      managerList: [],
      selectedSubmitter:"",
      selectedDeveloper:"",
      selectedManager:""
    };
  }

  componentDidMount(){
    ProjectService.getOneProject(this.props.match.params.id).then(
      response => {
        this.setState({
          project: response.data
        });

        submitterList.length = 0;
        developerList.length = 0;
        managerList.length = 0;

        var i = 0;
        var size = Object.keys(this.state.project.users).length;
        for( i=0;i<size;i++){
          if(this.state.project.users[i].role === "submitter"){
            this.setState({
              submitter: this.state.project.users[i],
              selectedSubmitter: this.state.project.users[i]
            })
          }
          if(this.state.project.users[i].role === "developer"){
            this.setState({
              developer: this.state.project.users[i],
              selectedDeveloper: this.state.project.users[i]
            })
          }
          if(this.state.project.users[i].role === "project-manager"){
            this.setState({
              manager: this.state.project.users[i],
              selectedManager: this.state.project.users[i]
            })
          }
        }

        const user = AuthService.getCurrentUser();

        if(user.roles === "ADMIN"){
          UserService.getAllMembers(user.email).then(
            response => {
              this.setState({
                members: response.data
              });
                Object.keys(this.state.members).forEach(key => {
                  if (this.state.members[key].isMember === "true"){
                     if(this.state.members[key].role === "submitter"){
                       submitterList.push({
                         value: this.state.members[key].id, label: this.state.members[key].username
                       })
                     }  
                     if(this.state.members[key].role === "developer"){
                      developerList.push({
                        value: this.state.members[key].id, label: this.state.members[key].username
                      })
                    } 
                    if(this.state.members[key].role === "project-manager"){
                      managerList.push({
                        value: this.state.members[key].id, label: this.state.members[key].username
                      })
                    }
                  }
                });
                this.setState({
                  submitterList: submitterList,
                  developerList: developerList,
                  managerList: managerList
                });
            }
          ).catch((error) => {
            console.log(error);
          });
         }
      
         else {
          UserService.getAllMembersAsManager(user.email).then(
            response => {
              this.setState({
                members: response.data
              });
            
                Object.keys(this.state.members).forEach(key => {
                  if (this.state.members[key].isMember === "true"){
                    if(this.state.members[key].role === "submitter"){
                      submitterList.push({
                        value: this.state.members[key].id, label: this.state.members[key].username
                      })
                    }
                    if(this.state.members[key].role === "developer"){
                     developerList.push({
                       value: this.state.members[key].id, label: this.state.members[key].username
                     })
                   } 
                   if(this.state.members[key].role === "project-manager"){
                     managerList.push({
                       value: this.state.members[key].id, label: this.state.members[key].username
                     })
                   }
                  }
                });
                this.setState({
                  submitterList: submitterList,
                  developerList: developerList,
                  managerList: managerList
                });
            }
          ).catch((error) => {
            console.log(error);
          });
         }
      }
    ).catch((error) => {
      console.log(error);
   });
  }

  onChangeSelectedSubmitter(submitter) {
    this.setState({
      selectedSubmitter: submitter
    });
    console.log(this.state.selectedSubmitter);
  }
  
  onChangeSelectedDeveloper(developer) {
    this.setState({
      selectedDeveloper: developer
    });
    console.log(this.state.selectedDeveloper);
  }
  
  onChangeSelectedManager(manager) {
    this.setState({
      selectedManager: manager
    });
    console.log(this.state.selectedManager);
  }

  // this will refresh the component
  refreshPage() {
   window.location.reload(false);
  }

  handleSubmit(e) {
    e.preventDefault();
    ProjectService.assignUsers(
      this.props.match.params.id,
      [this.state.selectedSubmitter.value,this.state.selectedDeveloper.value,this.state.selectedManager.value],
      [this.state.submitter,this.state.developer,this.state.manager]
    );
    ProjectService.updateProject(
      this.props.match.params.id,
      this.state.selectedSubmitter.label,
      this.state.selectedDeveloper.label,
      this.state.selectedManager.label
    );
  }

  renderValue = (value) => {
    return value;
}


  render() {
    return (
     <div id="edit-assigned-users">
         <div className="box">
            <div className="header-1 ">
            <h5 className=" header-1-text">Edit Assigned Users</h5>          
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
                    options={this.state.managerList}
                    // renderValue={() => this.renderValue(this.state.selectedSubmitter)}
                    // defaultValue={this.state.manager.username}
                    // value={{label: this.state.selectedManager.username , value: this.state.selectedManager.id}}
                    onChange={(newValue) => this.onChangeSelectedManager(newValue)}
                    onSubmit={() => console.log('onSubmit')}
                    />

                    <p className="pt-4">Submitter</p>
                    <Select
                    options={this.state.submitterList}
                    // renderValue={() => this.renderValue(this.state.selectedSubmitter)}
                    // defaultValue={{ label:`${this.state.selectedSubmitter.username}`}}
                    // value={{label: this.state.selectedSubmitter.username , value: this.state.selectedSubmitter.id}}
                    onChange={(newValue) => this.onChangeSelectedSubmitter(newValue)}
                    onSubmit={() => console.log('onSubmit')}
                    />
                </div>

                <div className=" pl-5 col-sm-5">
                    <p>Project Description</p>
                    <h6>{this.state.project.description}</h6>

                    <p className="pt-4">Developer</p>
                    <Select
                    // value={{label: this.state.selectedDeveloper.username , value: this.state.selectedDeveloper.id }}
                    options={this.state.developerList}
                    // renderValue={() => this.renderValue(this.state.selectedDeveloper)}
                    // defaultValue={{ label: this.state.selectedDeveloper.username , value: this.state.selectedDeveloper.id }}
                    onChange={(newValue) => this.onChangeSelectedDeveloper(newValue)}
                    onSubmit={() => console.log('onSubmit')}
                    />

                </div>
              </div>
              
              <div className="input-right" >
                <div className=" align-left mt-4">
                <Link className="pr-1 header-1-p" style={{color:"#fff"}} to="/admin/ManageProjectUsers">Back to List</Link>

                </div>
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