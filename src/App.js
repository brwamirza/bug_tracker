import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signin from './components/signin.component';
import Signup from './components/signup.component';


function App() {
  return (
    <div>
      <Signin />
      <Signup />
    </div>
  );
}

export default App;
