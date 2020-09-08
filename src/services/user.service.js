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

  getAllMembers(email) {
    return axios.post(API_URL + 'getAllMembers', { 
      email
     });
  }

  getAllMembersAsManager(email) {
    return axios.post(API_URL + 'getAllMembersAsManager', { 
      email
     });
  }

  updateUser(id,role,isMember,adminEmail) {
    return axios.put(API_URL + 'updateUser', { 
      id,
      role,
      isMember,
      adminEmail
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