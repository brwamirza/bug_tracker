import axios from 'axios';

const API_URL = "http://localhost:8080/api/project";

//project service
class ProjectService {
  getAllProjects(email) {
    return axios.post(API_URL + "/all", { 
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

  // for deleting a single project
  deleteProject(id) {
    axios.delete(API_URL+'/'+id);
  }
}

export default new ProjectService();