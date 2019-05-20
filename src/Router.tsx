import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Dashboard from "dashboard/Dashboard";
import { Heapsort } from "algorithms";

const AppRouter = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/algorithms/heapsort" component={Heapsort} />
  </Switch>
);

export default withRouter(AppRouter);
