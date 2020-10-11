import axios from 'axios';
import { API_HOST } from "./constants";

const API_URL = `https://issuetracker3.herokuapp.com:${API_HOST}/api/`;

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

}

export default new UserService();