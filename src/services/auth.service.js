import axios from "axios";

const API_URL = "https://issuetracker3.herokuapp.com/:8080/api/auth/";

class AuthService {
  //login user and save user token to local storage
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  //remove token from local storage
  logout() {
    localStorage.removeItem("user");
  }

  //register user
  register(username, email, password, role, verified) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      role,
      verified
    }).then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  verifyEmail(token) {
    return axios.put(API_URL + `verify/${token}`);
  }


  //get user data from local storage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();