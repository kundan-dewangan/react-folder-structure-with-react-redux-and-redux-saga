import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const DashboardMainComponent = React.lazy(() =>
  import(/* webpackChunkName: "product-data-list" */ './dashboard')
);

const DashboardProduct = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard-list`} />
      <Route
        path={`${match.url}/dashboard-list`}
        render={props => <DashboardMainComponent {...props} />}
      />          
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default DashboardProduct;
