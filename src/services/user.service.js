import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

//data service
class UserService {
  getSubmitterBoard() {
    return axios.get(API_URL + 'submitter', { headers: authHeader() });
  }

  getDeveloperBoard() {
    return axios.get(API_URL + 'developer', { headers: authHeader() });
  }

  getProjectManagerBoard() {
    return axios.get(API_URL + 'projectManager', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();