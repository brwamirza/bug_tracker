import axios from 'axios';

const API_URL = "http://localhost:8080/api/ticket";

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

  assignDeveloper(ticketId,newDeveloper,oldDeveloper) {
    return axios.post(API_URL + "/assignUsers", {
        ticketId,
        newDeveloper,
        oldDeveloper
    })
  }

  updateTicket(id,title,description,projectId,developerId,priority,status,type) {
    return axios.put(API_URL + "/"+id, {
        title,
        description,
        projectId,
        developerId,
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