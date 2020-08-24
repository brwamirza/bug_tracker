import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/my-tickets.css';
import "@material/drawer";
import "@material/list";
import Drawer from "./drawer.component"
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Route } from 'react-router-dom';


export default class MyTickets extends Component {

  render() {
    return (
     <div id="my-tickets">
      <h1>My Tickets</h1>
    </div>
    );
  }
}