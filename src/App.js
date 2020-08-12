import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signin from './components/signin.component';
import Signup from './components/signup.component';


function App() {
  return (
    <Router>
      <div>
        <Route path="/signin" exact component={Signin}/>
        <Route path="/signup" component={Signup}/>
        
      </div>
    </Router>
  );
}

export default App;
