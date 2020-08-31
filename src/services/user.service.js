import axios from 'axios';
import authHeader from './auth-header';

const API_URL2 = 'http://localhost:8080/api/test/';
const API_URL = 'http://localhost:8080/api/';

//data service
class UserService {
  joinUser(id,adminEmail) {
    return axios.post(API_URL + 'joinUser', { 
      id,
      adminEmail
     });
  }

  getAllMembers(id) {
    return axios.post(API_URL + 'getAllMembers', { 
      id
     });
  }

  updateUser(id,role,isMember) {
    return axios.put(API_URL + 'updateUser', { 
      id,
      role,
      isMember
     });
  }

  getSubmitterBoard() {
    return axios.get(API_URL2 + 'submitter', { headers: authHeader() });
  }

  getDeveloperBoard() {
    return axios.get(API_URL2 + 'developer', { headers: authHeader() });
  }

  getProjectManagerBoard() {
    return axios.get(API_URL2 + 'projectManager', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL2 + 'admin', { headers: authHeader() });
  }
}

export default new UserService();