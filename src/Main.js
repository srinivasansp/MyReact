import React, { Component } from "react";
import {Route, NavLink, HashRouter } from "react-router-dom";
import Home from "./Home";
import Archestrator from "./Archestrator";
import Contact from "./Contact";
import Login from "./Login";
import Connectors from "./Connectors";
import Processors from "./Processors";
import Target from "./Target";


class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>BA Manage</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/archestrator">Archestrator</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/connectors">Connectors</NavLink></li>
            <li><NavLink to="/processors">Processors</NavLink></li>
            <li><NavLink to="/target">Target</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/archestrator" component={Archestrator}/>
            <Route path="/login" component={Login}/>
            <Route path="/connectors" component={Connectors}/>
            <Route path="/processors" component={Processors}/>
            <Route path="/target" component={Target}/>
            <Route path="/contact" component={Contact}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
