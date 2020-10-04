import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/edit-project.css';
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
var defaultManager =[];
var defaultSubmitter =[];
var defaultDeveloper =[];

export default class EditProject extends Component {
  constructor(props) {
    super(props);
    this.onChangeSelectedSubmitter = this.onChangeSelectedSubmitter.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.onChangeSelectedDeveloper = this.onChangeSelectedDeveloper.bind(this);
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSelectedManager = this.onChangeSelectedManager.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      project: [],
      members: [],
      submitterList: [],
      developerList: [],
      managerList: [],
      selectedSubmitter:"",
      selectedDeveloper:"",
      selectedManager:"",
      description: "",
      projectName: ""
    };
  }

  componentDidMount(){
    ProjectService.getOneProject(this.props.match.params.id).then(
      response => {
        this.setState({
          project: response.data,
          description: response.data.description,
          projectName: response.data.name
        });

        submitterList.length = 0;
        developerList.length = 0;
        managerList.length = 0;
        defaultManager.length = 0;
        defaultSubmitter.length = 0;
        defaultDeveloper.length = 0;

        var i = 0;
        var size = Object.keys(this.state.project.users).length;
        for( i=0;i<size;i++){
          if(this.state.project.users[i].role === "submitter"){
            defaultSubmitter.push({
              value: this.state.project.users[i].id, label: this.state.project.users[i].username
            })
            this.setState({
              selectedSubmitter: defaultSubmitter
            })
          }
          if(this.state.project.users[i].role === "developer"){
            defaultDeveloper.push({
              value: this.state.project.users[i].id, label: this.state.project.users[i].username
            });
            this.setState({
              selectedDeveloper: defaultDeveloper
            })
          }
          if(this.state.project.users[i].role === "project-manager"){
            defaultManager.push({
              value: this.state.project.users[i].id, label: this.state.project.users[i].username
            });
            this.setState({
              selectedManager: defaultManager
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

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeProjectName(e) {
    this.setState({
      projectName: e.target.value
    });
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
      [defaultSubmitter.value,defaultDeveloper.value,defaultManager.value]
    );
    ProjectService.updateProject(
      this.props.match.params.id,
      this.state.selectedSubmitter.label,
      this.state.selectedDeveloper.label,
      this.state.selectedManager.label,
      this.state.projectName,
      this.state.description
    ).then(() => {
      this.props.history.push("/MyProjects");
      window.location.reload();
    });
  }

  render() {
    return (
     <div id="edit-project">
         <div className="box">
            <div className="header-1 ">
            <h5 className=" header-1-text">Edit Project</h5>          
            </div>
            <div className="box-1" style={{zIndex: "8!important"}}>
            <div className="box-inner">
            <div className="pb-4">
            <form onSubmit={this.handleSubmit}>

                <div className="row horizantal-line pb-4">
                <div className="col-12 col-md-5 pr-5 left-part">
                  <p>Project Name</p>
                   <input 
                       type="text" 
                       className="form-control" 
                       id="name" 
                       name="name" 
                       value={this.state.projectName}
                       onChange={this.onChangeProjectName} 
                       required />

                    <p className="pt-4">Project Manager</p>
                    <Select
                    options={this.state.managerList}
                    defaultValue={defaultManager}
                    getOptionLabel={(option) => option.label}
                    onChange={(newValue) => this.onChangeSelectedManager(newValue)}
                    onSubmit={() => console.log('onSubmit')}
                    />

                    <p className="pt-4">Submitter</p>
                    <Select
                    options={this.state.submitterList}
                    defaultValue={defaultSubmitter}
                    getOptionLabel={(option) => option.label}
                    onChange={(newValue) => this.onChangeSelectedSubmitter(newValue)}
                    onSubmit={() => console.log('onSubmit')}
                    />
                </div>

                <div className="pl-5 col-12 col-md-5 right-part">
                    <p>Project Description</p>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        name ="description"
                        value={this.state.description}
                        onChange={this.onChangeDescription} 
                        required>
                    </textarea>

                    <p className="pt-4">Developer</p>
                    <Select
                    options={this.state.developerList}
                    defaultValue={defaultDeveloper}
                    getOptionLabel={(option) => option.label}
                    onChange={(newValue) => this.onChangeSelectedDeveloper(newValue)}
                    onSubmit={() => console.log('onSubmit')}
                    />

                </div>
              </div>
              
              <div className="input-right" >
                <div className=" align-left mt-4">
                <Link className="pr-1 header-1-p" style={{color:"#fff"}} to="/ManageProjectUsers">Back to List</Link>

                </div>
                <input type="submit" className="btn btn-primary mt-4" value="UPDATE PROJECT"/>
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