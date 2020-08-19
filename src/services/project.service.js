import axios from 'axios';

const API_URL = "http://localhost:8080/api/project";

//project service
class ProjectService {
  getAllProjects(email) {
    return axios.post(API_URL + "/all", { 
        email
     });
  }

  getOneProject() {
    return axios.get(API_URL + '/:id');
  }
}

export default new ProjectService();