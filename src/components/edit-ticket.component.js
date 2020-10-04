import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/edit-ticket.css';
import "@material/drawer";
import "@material/list";
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProjectService from "../services/project.service";
import UserService from "../services/user.service";
import TicketService from "../services/ticket.service";
import Select from 'react-select'


const developerList = [];
var defaultDeveloper =[];
var defaultProject = [];
var defaultPriority = [];
var defaultStatus = [];
var defaultType = [];
var projectsList = [];

export default class EditTicket extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeSelectedDeveloper = this.onChangeSelectedDeveloper.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeProject = this.onChangeProject.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      projects: [],
      developer:[],
      members: [],
      developerList: [],
      projectsList: [],
      selectedDeveloper:"",
      title: "",
      description: "",
      project: [],
      priority: [],
      status: [],
      type: [],
    };
  }

  componentDidMount(){
    const user = AuthService.getCurrentUser();
  //getting ticket data
  TicketService.getOneTicket(this.props.match.params.id).then(
  response => {
    defaultDeveloper.length = 0;
    defaultPriority.length = 0;
    defaultStatus.length = 0;
    defaultType.length = 0;
    defaultProject.length = 0;

    defaultProject.push({
      value: response.data.project, label: response.data.project
    });
    defaultType.push({
      value: response.data.type, label: response.data.type
    });
    defaultPriority.push({
      value: response.data.priority, label: response.data.priority
    });
    defaultStatus.push({
      value: response.data.status, label: response.data.status
    });
    defaultDeveloper.push({
      value: response.data.developer, label: response.data.developer
    });
    this.setState({
      title: response.data.title,
      description: response.data.description,
      project: defaultProject,
      developer: defaultDeveloper, 
      priority: defaultPriority,
      status: defaultStatus,
      type: defaultType
      });
    }
  ).catch((error) => {
    console.log(error);
  });

    //getting all projects
    ProjectService.getAllProjects(user.email).then(
      response => {
        projectsList.length = 0;
        developerList.length = 0;

        response.data.map(project => {

          projectsList.push({
            value: project.id, label: project.name
          });
          this.setState({
            projectsList: projectsList
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

  
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }
  
  onChangeSelectedDeveloper(developer) {
    this.setState({
      developer: developer
    });
  }
  
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeProject(project) {
    this.setState({
      project: project
    });
  }

  onChangeStatus(status) {
    this.setState({
      status:status
    });
  }

  onChangeType(type) {
    this.setState({
      type: type
    });
  }

  onChangePriority(priority) {
    this.setState({
      priority: priority
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    TicketService.assignDeveloper(
      this.props.match.params.id,
      this.state.developer.label,
      defaultDeveloper.label
    );
    
    TicketService.updateTicket(
      this.props.match.params.id,
      this.state.title,
      this.state.description,
      this.state.project.label,
      this.state.developer.label,
      this.state.priority.label,
      this.state.status.label,
      this.state.type.label
    ).then(() => {
      this.props.history.push("/MyTickets");
      window.location.reload();
    });
  }


  render() {
    return (
     <div id="edit-ticket">
         <div className="box">
            <div className="header-1 ">
            <h5 className=" header-1-text">Edit Ticket</h5>          
            </div>
            <div className="box-1" style={{zIndex: "8!important"}}>
            <div className="box-inner">
            <div className="pb-4">
            <form onSubmit={this.handleSubmit}>

                <div className="row horizantal-line pb-4">
                <div className="col-12 col-md-5 pr-5 left-part">
                  <p>Ticket Title</p>
                  <input 
                       type="text" 
                       className="form-control" 
                       id="title" 
                       name="title" 
                       value={this.state.title}
                       onChange={this.onChangeTitle} 
                       required />

                    <p className="pt-4">Assigned Developer</p>
                    <Select
                        options={this.state.developerList}
                        defaultValue={defaultDeveloper}
                        getOptionLabel={(option) => option.label}
                        onChange={(newValue) => this.onChangeSelectedDeveloper(newValue)}
                        onSubmit={() => console.log('onSubmit')}
                    />

                    <p className="pt-4">Project</p>
                    <Select
                        options={this.state.projectsList}
                        value={this.state.project}
                        getOptionLabel={(option) => option.label}
                        onChange={(newValue) => this.onChangeProject(newValue)}
                        onSubmit={() => console.log('onSubmit')}
                    />

                    <p className="pt-4">Ticket Status</p>
                    <Select
                     options={[
                      { value: 'Open', label: 'Open' },
                      { value: 'In progress', label: 'In progress' },
                      { value: 'Additional Info Required', label: 'Additional Info Required' },
                      { value: 'Closed', label: 'Closed' }
                      ]}
                      defaultValue={defaultStatus}
                      getOptionLabel={(option) => option.label}
                      onChange={(newValue) => this.onChangeStatus(newValue)}
                      onSubmit={() => console.log('onSubmit')}
                    />
                </div>

                <div className=" pl-5 col-12 col-md-5 right-part">
                    <p>Ticket Description</p>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        name ="description"
                        value={this.state.description}
                        onChange={this.onChangeDescription} 
                        required>
                    </textarea>

                    <p className="pt-4">Ticket Priority</p>
                    <Select
                      options={[
                        { value: 'None', label: 'None' },
                        { value: 'Low', label: 'Low' },
                        { value: 'Medium', label: 'Medium' },
                        { value: 'High', label: 'High' }
                      ]}
                      defaultValue={defaultPriority}
                      getOptionLabel={(option) => option.label}
                      onChange={(newValue) => this.onChangePriority(newValue)}
                      onSubmit={() => console.log('onSubmit')}
                    />

                    <p className="pt-4">Ticket Type</p>
                    <Select
                        options={[
                          { value: 'None', label: 'None' },
                          { value: 'Bugs/Errors', label: 'Bugs/Errors' },
                          { value: 'Feature Requests', label: 'Feature Requests' },
                          { value: 'Training/Document Requests', label: 'Training/Document Requests' },
                          { value: 'Other Comments', label: 'Other Comments' }
                        ]}
                        defaultValue={defaultType}
                        getOptionLabel={(option) => option.label}
                        onChange={(newValue) => this.onChangeType(newValue)}
                        onSubmit={() => console.log('onSubmit')}
                    />

                </div>
              </div>
              
              <div className="input-right" >
                <div className=" align-left mt-4">
                <Link className="pr-1 header-1-p" style={{color:"#fff"}} to="/MyTickets">Back to List</Link>

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