import axios from 'axios';

const API_URL = "http://localhost:8080/api/project";

//project service
class ProjectService {
  getAllProjects(email) {
    return axios.post(API_URL + "/all", { 
        email
     });
  }

  getAllProjectsWithUsers(email) {
    return axios.post(API_URL + "/allUsers", { 
        email
     });
  }

  addProject(name,description,email){
    return axios.post(API_URL + "/add", {
      name,
      description,
      email
    });
  }

  getOneProject(id) {
    return axios.get(API_URL + `/${id}`);
  }

  getTickets(id) {
    return axios.post(API_URL + '/Tickets', {
      id
    })
  }

  getUsers(id) {
    return axios.post(API_URL + `/getUsers`, {
      id
    });
  }

  assignUsers(projectId,newUsers,oldUsers) {
    return axios.post(API_URL + "/assignUsers", {
      projectId,
      newUsers,
      oldUsers
    })
  }
  
  updateProject(id,submitter,developer,manager,name,description) {
    return axios.put(API_URL + "/"+id, {
      submitter,
      developer,
      manager,
      name,
      description
    })
  }
  // for deleting a single project
  deleteProject(id) {
    axios.delete(API_URL+'/'+id);
  }
}

export default new ProjectService();