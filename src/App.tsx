import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import _ from "lodash";
import "./App.css";

import ProtectedRoute from "../src/Components/ProtectedRoute";

import Login from "../src/Pages/Login";
import Dashboard from "../src/Pages/Dashboard";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Login />} />
      <ProtectedRoute exact path="/dashboard" render={() => <Dashboard />} />
    </Switch>
  </BrowserRouter>
);

export default App;
