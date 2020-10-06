import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/ticket-details.css';
import "@material/drawer";
import "@material/list";
import AuthService from "../services/auth.service";
import TicketService from "../services/ticket.service";

const Message = props => (
  <tr>
    <td className="pl-0 td-header-1">{props.message.commenter}</td>
    <td className="pl-0 td-header-2">{props.message.message}</td>
  </tr>
)

export default class TicketDetails extends Component {
  constructor(props) {
    super(props);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      message: "",
      messageList:[],
      ticket: []
    };
  }

  componentDidMount(){
    TicketService.getOneTicket(this.props.match.params.id).then(
      response => {
        this.setState({
          ticket: response.data
        });
      }
    ).catch((error) => {
      console.log(error);
   });

   TicketService.getAllMessages(this.props.match.params.id).then(
    response => {
      this.setState({
        messageList: response.data
      });
    }
  ).catch((error) => {
    console.log(error);
 });
}


onChangeMessage(e) {
  this.setState({
    message: e.target.value
  });
}

handleSubmit(e) {
  e.preventDefault();
  TicketService.addMessage(
    this.state.ticket.id,
    this.state.currentUser.username,
    this.state.message
  ).then(() => {
    window.location.reload();
  })
 
}

  messageList() {
    return this.state.messageList.map(currentMessage => {
      return <Message message={currentMessage} key={currentMessage.id}/>;
    })
  }

  render() {
    return (
     <div id="ticket-detail">
       <div className="row">
          <div className="col-12 col-lg-6">
            <div className="header-1 pt-4">
                <h5 className=" header-1-text ">Ticket Details</h5>
                <p className=" header-1-p ">
                    <Link className="pr-1" style={{color:"#000"}} to="/MyTickets">Back to List</Link>
                    |
                    <Link className="pl-1" style={{color:"#000"}} to={"/EditTicket/"+this.props.match.params.id}>Edit</Link>
                </p>            
            </div>
            <div className="box-1" style={{zIndex: "8!important"}}>
              <div className="box-inner">
                <div className="pb-4 pt-5">
                  <div className=" row">
                    <div className="col-sm-6">
                      <p  className="pt-4" style={{color: "#9e9e9e"}}>Ticket Title</p>
                      <h6 className="pl-2">{this.state.ticket.title}</h6>

                      <p className="pt-4" style={{color: "#9e9e9e"}}>Assigned Developer</p>
                      <h6 className="pl-2">{this.state.ticket.developer}</h6>

                      <p className="pt-4" style={{color: "#9e9e9e"}}>Project</p>
                      <h6 className="pl-2">{this.state.ticket.project}</h6>

                      <p  className="pt-4" style={{color: "#9e9e9e"}}>Ticket Status</p>
                      <h6 className="pl-2">{this.state.ticket.status}</h6>
                    </div>

                    <div className="col-sm-6">
                      <p className="pt-4" style={{color: "#9e9e9e"}}>Ticket Description</p>
                      <h6 className="pl-2">{this.state.ticket.description}</h6>

                      <p className="pt-4" style={{color: "#9e9e9e"}}>Submitter</p>
                      <h6 className="pl-2">{this.state.ticket.submitter}</h6>

                      <p className="pt-4" style={{color: "#9e9e9e"}}>Ticket Priority</p>
                      <h6 className="pl-2">{this.state.ticket.priority}</h6>

                      <p className="pt-4" style={{color: "#9e9e9e"}}>Ticket Type</p>
                      <h6 className="pl-2">{this.state.ticket.type}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         </div>
         <div className="col-12 col-lg-6 pt-2" id="comment-section">
            <div>
             <form onSubmit={this.handleSubmit}>
               <div className="form-group">
                  <label htmlFor="message" className="col-form-label">Add a Comment?</label>
                  <div className="d-flex">
                    <input 
                      type="text" 
                      className="form-control mr-2 ml-5" 
                      id="message" 
                      name="message" 
                      value={this.state.message}
                      onChange={this.onChangeMessage} 
                      required />
                      <button type="submit" className="btn btn-primary">Add</button>
                  </div>
                </div>
              </form>
              <div className="header-1 ">
                  <h5 className=" header-1-text ">Ticket Comments</h5>
              </div>
              <div className="box-1" style={{zIndex: "8!important"}}>
                <div className="">
                    <table className="table tableBodyScroll">
                    <thead>
                      <tr>
                        <th className="th-header-1">Commenter</th>
                        <th className="th-header-2">Message</th>
                      </tr>
                    </thead>
                    <tbody className="table-items ">
                      {this.messageList()}
                    </tbody>                   
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
       <div> 
      </div>
     </div>     
    );
  }
}