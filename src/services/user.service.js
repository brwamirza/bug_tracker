import axios from 'axios';

const API_URL = `/api/`;

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