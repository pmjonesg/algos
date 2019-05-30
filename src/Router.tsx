import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';

import Dashboard from 'dashboard/Dashboard';
// import Summary from 'dashboard/Summary';
import Heapsort from 'algorithms/Heapsort';

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 200, beforeChildren: true },
  exit: { opacity: 0 },
});

const AppRouter = () => (
  <Route
    render={({ location }) => (
      <PoseGroup>
        <RouteContainer key={location.pathname}>
          <Switch location={location}>
            <Route exact path="/" component={Dashboard} key="home" />
            <Route path="/algorithms/heapsort" component={Heapsort} key="heapsort" />
            <Route render={() => <div>Not Found</div>} key="notFound" />
          </Switch>
        </RouteContainer>
      </PoseGroup>
    )}
  />
);

export default withRouter(AppRouter);
