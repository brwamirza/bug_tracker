import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/create-ticket.css';
import "@material/drawer";
import "@material/list";
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProjectService from "../services/project.service";
import UserService from "../services/user.service";
import Select from 'react-select'


const projectsList = [];
const developerList = [];
const managerList = [];

export default class CreateTicket extends Component {
  constructor(props) {
    super(props);
    this.onChangeSelectedSubmitter = this.onChangeSelectedSubmitter.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.onChangeSelectedDeveloper = this.onChangeSelectedDeveloper.bind(this);
    this.onChangeSelectedManager = this.onChangeSelectedManager.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      projects: [],
      developer:"",
      members: [],
      developerList: [],
      selectedDeveloper:""
    };
  }

  componentDidMount(){
    const user = AuthService.getCurrentUser();

    ProjectService.getAllProjects(user.email).then(
      response => {
        projectsList.length = 0;
        developerList.length = 0;

        response.data.map(project => {

          projectsList.push({
            value: project.id, label: project.name
          });
        });
        if(user.roles === "ADMIN"){
          UserService.getAllMembers(user.email).then(
            response => {
              this.setState({
                members: response.data
              });
                Object.keys(this.state.members).forEach(key => {
                  if (this.state.members[key].isMember === "true"){
                     if(this.state.members[key].role === "developer"){
                      developerList.push({
                        value: this.state.members[key].id, label: this.state.members[key].username
                      })
                    } 
                  }
                });
                this.setState({
                  developerList: developerList
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
                    if(this.state.members[key].role === "developer"){
                     developerList.push({
                       value: this.state.members[key].id, label: this.state.members[key].username
                     })
                   }
                  }
                });
                this.setState({
                  developerList: developerList
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
     <div id="create-ticket">
         <div className="box">
            <div className="header-1 ">
            <h5 className=" header-1-text ">Create Ticket</h5>
            </div>
            <div className="box-1" style={{zIndex: "8!important"}}>
            <div className="box-inner">
            <div className="pb-4">
            <form onSubmit={this.handleSubmit}>

                <div className="row horizantal-line pb-4">
                <div className="col-sm-5 pr-5">
                  <div className="form-group">
                    <label htmlFor="project-name" className="col-form-label">Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="project-name" 
                      name="project-name" 
                      // value={this.state.projectName}
                      // onChange={this.onChangeProjectName} 
                      required />
                  </div>

                    <p className="pt-4">Project</p>
                    <Select
                    options={projectsList}
                    // renderValue={() => this.renderValue(this.state.selectedSubmitter)}
                    // defaultValue={this.state.manager.username}
                    // value={{label: this.state.selectedManager.username , value: this.state.selectedManager.id}}
                    onChange={(newValue) => this.onChangeSelectedManager(newValue)}
                    onSubmit={() => console.log('onSubmit')}
                    />

                    <p className="pt-4">Ticket Priority</p>
                    <Select
                    options={[
                      { value: null, label: 'None' },
                      { value: 'low', label: 'Low' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High' }
                    ]}
                    // renderValue={() => this.renderValue(this.state.selectedSubmitter)}
                    // defaultValue={{ label:`${this.state.selectedSubmitter.username}`}}
                    // value={{label: this.state.selectedSubmitter.username , value: this.state.selectedSubmitter.id}}
                    onChange={(newValue) => this.onChangeSelectedSubmitter(newValue)}
                    onSubmit={() => console.log('onSubmit')}
                    />

                    <p className="pt-4">Ticket Type</p>
                    <Select
                    options={[
                      { value: null, label: 'None' },
                      { value: 'bugs/errors', label: 'Bugs/Errors' },
                      { value: 'future-requests', label: 'Future Requests' },
                      { value: 'training/document-requests', label: 'Training/Document Requests' },
                      { value: 'other-comments', label: 'Other Comments' }
                    ]}
                    // renderValue={() => this.renderValue(this.state.selectedSubmitter)}
                    // defaultValue={{ label:`${this.state.selectedSubmitter.username}`}}
                    // value={{label: this.state.selectedSubmitter.username , value: this.state.selectedSubmitter.id}}
                    onChange={(newValue) => this.onChangeSelectedSubmitter(newValue)}
                    onSubmit={() => console.log('onSubmit')}
                    />
                </div>

                <div className=" pl-5 col-sm-5">
                   <div className="form-group">
                      <label htmlFor="description" className="col-form-label">Description</label>
                      <textarea 
                        className="form-control" 
                        id="description" 
                        name ="description"
                        // value={this.state.description}
                        // onChange={this.onChangeDescription} 
                        required></textarea>
                    </div>

                    <p className="pt-4">Assigned Developer</p>
                    <Select
                    // value={{label: this.state.selectedDeveloper.username , value: this.state.selectedDeveloper.id }}
                    options={this.state.developerList}
                    // renderValue={() => this.renderValue(this.state.selectedDeveloper)}
                    // defaultValue={{ label: this.state.selectedDeveloper.username , value: this.state.selectedDeveloper.id }}
                    onChange={(newValue) => this.onChangeSelectedDeveloper(newValue)}
                    onSubmit={() => console.log('onSubmit')}
                    />

                    <p className="pt-4">Ticket Status</p>
                    <Select
                    options={[
                      { value: 'open', label: 'Open' },
                      { value: 'in-progress', label: 'In progress' },
                      { value: 'additional-info-required', label: 'Additional Info Required' },
                      { value: 'closed', label: 'Closed' }
                    ]}
                    // renderValue={() => this.renderValue(this.state.selectedSubmitter)}
                    // defaultValue={{ label:`${this.state.selectedSubmitter.username}`}}
                    // value={{label: this.state.selectedSubmitter.username , value: this.state.selectedSubmitter.id}}
                    onChange={(newValue) => this.onChangeSelectedSubmitter(newValue)}
                    onSubmit={() => console.log('onSubmit')}
                    />

                </div>
              </div>

              <div className="input-right">
              <div className=" align-left mt-4">
                <Link className="pr-1 header-1-p" style={{color:"#fff"}} to="/admin/MyTickets">Back to List</Link>
              </div>
            
                <input type="submit" className="btn btn-primary mt-4" value="CREATE TICKET" onClick={this.refreshPage}/>
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