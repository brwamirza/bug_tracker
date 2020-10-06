import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/create-ticket.css';
import "@material/drawer";
import "@material/list";
import TicketService from "../services/ticket.service";
import AuthService from "../services/auth.service";
import ProjectService from "../services/project.service";
import UserService from "../services/user.service";
import Select from 'react-select'


const projectsList = [];
const developerList = [];

export default class CreateTicket extends Component {
  constructor(props) {
    super(props);
    this.refreshPage = this.refreshPage.bind(this);
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
      developer:"",
      members: [],
      developerList: [],
      selectedDeveloper:"",
      title: "",
      description: "",
      project: "",
      priority: "",
      status: "",
      type: ""
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

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
    console.log(this.state.title);
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
    console.log(this.state.description);
  }

  onChangeProject(project) {
    this.setState({
      project: project
    });
    console.log(this.state.project);
  }

  onChangeStatus(status) {
    this.setState({
      status:status
    });
    console.log(this.state.status);
  }

  onChangeType(type) {
    this.setState({
      type: type
    });
    console.log(this.state.type);
  }

  onChangePriority(priority) {
    this.setState({
      priority: priority
    });
    console.log(this.state.priority);
  }

  // this will refresh the component
  refreshPage() {
   window.location.reload(false);
  }

  handleSubmit(e) {
    e.preventDefault();
    TicketService.addTicket(
      this.state.title,
      this.state.description,
      this.state.project.label,
      this.state.selectedDeveloper.label,
      this.state.priority.label,
      this.state.status.label,
      this.state.type.label,
      this.state.currentUser.email,
    ).then(() => {
      this.props.history.push("/myTickets");
      window.location.reload();
    })
   
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
                    <label htmlFor="title" className="col-form-label">Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="title" 
                      name="title" 
                      value={this.state.title}
                      onChange={this.onChangeTitle} 
                      required />
                  </div>

                    <p className="pt-4">Project</p>
                    <Select
                    options={projectsList}
                    onChange={(newValue) => this.onChangeProject(newValue)}
                    onSubmit={() => console.log('onSubmit')}
                    />

                    <p className="pt-4">Ticket Priority</p>
                    <Select
                    options={[
                      { value: 'None', label: 'None' },
                      { value: 'Low', label: 'Low' },
                      { value: 'Medium', label: 'Medium' },
                      { value: 'High', label: 'High' }
                    ]}
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
                    onChange={(newValue) => this.onChangeType(newValue)}
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
                        value={this.state.description}
                        onChange={this.onChangeDescription} 
                        required></textarea>
                    </div>

                    <p className="pt-4">Assigned Developer</p>
                    <Select
                    options={this.state.developerList}
                    onChange={(newValue) => this.onChangeSelectedDeveloper(newValue)}
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
                    onChange={(newValue) => this.onChangeStatus(newValue)}
                    onSubmit={() => console.log('onSubmit')}
                    />

                </div>
              </div>

              <div className="input-right">
              <div className=" align-left mt-4">
                <Link className="pr-1 header-1-p" style={{color:"#fff"}} to="/MyTickets">Back to List</Link>
              </div>
            
                <input type="submit" className="btn btn-primary mt-4" value="CREATE TICKET" />
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