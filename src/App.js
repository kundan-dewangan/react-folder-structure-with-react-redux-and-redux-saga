import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

const ViewMain = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views')
);
const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app')
);
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/user')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);

const AuthRoute = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/user/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function App({ user }) {

  return (
    <React.Fragment>
      <Suspense fallback={<div className="loading" />}>
        <Router>
          <Switch>
            <AuthRoute
              path="/app"
              authUser={user}
              component={ViewApp}
            />
            <Route
              path="/user"
              render={props => <ViewUser {...props} />}
            />
            <Route
              path="/error"
              exact
              render={props => <ViewError {...props} />}
            />
            <Route
              path="/"
              exact
              render={props => <ViewMain {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Router>
      </Suspense>
    </React.Fragment>


  );
}

const mapStateToProps = ({ authUser }) => {
  const { user } = authUser;
  return { user };
};

export default connect(
  mapStateToProps,
  null
)(App);

