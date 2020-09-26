import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signin from './components/signin.component';
import Signup from './components/signup.component';
import Home from './components/home.component';


function App() {
  return (
    <Router>
    <Switch>
        <Route exact path="/signin" component={Signin}/>
        <Route exact path="/signup" component={Signup}/>
        <Route path="/" component={Home}/>
    </Switch>
    </Router>
  );
}

export default App;