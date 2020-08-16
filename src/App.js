// import React from 'react';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signin from './components/signin.component';
import Signup from './components/signup.component';


// function App() {
//   return (
//     <Router>
//       <div>
//         <Route path="/signin" exact component={Signin}/>
//         <Route path="/signup" component={Signup}/>
        
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showProjectManagerBoard: false,
      showAdminBoard: false,
      showSubmitterBoard: false,
      showDeveloperBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showSubmitterBoard: user.roles.includes("ROLE_SUBMITTER"),
        showDeveloperBoard: user.roles.includes("ROLE_DEVELOPER"),
        showProjectManagerBoard: user.roles.includes("ROLE_PROJECTMANAGER"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showProjectManagerBoard, showAdminBoard, showSubmitterBoard,showDeveloperBoard } = this.state;

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              bezKoder
            </Link>
            <div className="navbar-nav mr-auto">

            {showSubmitterBoard && (
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
            )}

              {showProjectManagerBoard && (
                <li className="nav-item">
                  <Link to={"/projectmanager"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {showDeveloperBoard && (
                <li className="nav-item">
                  <Link to={"/developer"} className="nav-link">
                    developer
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Signin} />
              <Route exact path="/register" component={Signup} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/developer" component={BoardUser} />
              <Route path="/projectmanager" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
