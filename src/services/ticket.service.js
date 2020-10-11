import axios from 'axios';

const API_URL = `https://issuetracker3.herokuapp.com:${process.env.PORT}/api/ticket`;

//project service
class TicketService {
  getAllTickets(email) {
    return axios.post(API_URL + "/all", { 
        email
     });
  }

  addTicket(title,description,project,developer,priority,status,type,submitter){
    return axios.post(API_URL + "/add", {
        title,
        description,
        project,
        developer,
        priority,
        status,
        type,
        submitter,
    });
  }

  getOneTicket(id) {
    return axios.get(API_URL + `/${id}`);
  }

  getAllMessages(id) {
    return axios.post(API_URL + `/messages` , {
      id
    });
  }

  addMessage(id, commenter, message) {
    return axios.post(API_URL + `/addMessage`, {
      id,
      commenter,
      message
    });
  }

  assignDeveloper(ticketId,newDeveloper,oldDeveloper) {
    return axios.post(API_URL + "/assignDeveloper", {
        ticketId,
        newDeveloper,
        oldDeveloper
    })
  }

  updateTicket(id,title,description,project,developer,priority,status,type) {
    return axios.put(API_URL + "/"+id, {
        title,
        description,
        project,
        developer,
        priority,
        status,
        type
    })
  }

  // for deleting a single ticket
  deleteTicket(id) {
    axios.delete(API_URL+'/'+id);
  }
}

export default new TicketService();