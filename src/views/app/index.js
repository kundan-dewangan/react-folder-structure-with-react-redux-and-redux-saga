import React, { Component, Suspense } from 'react';
import { Route,  Switch, Redirect } from 'react-router-dom';

const Dashboard = React.lazy(() =>
    import(/* webpackChunkName: "pages" */ './dashboard')
);

class App extends Component {
    constructor(props) {
        super(props);
        this.state={}
    }
    render() {
        const { match } = this.props;

        return (
            <div className="dashboard-wrapper">
                <Suspense fallback={<div className="loading" />}>
                    <Switch>
                        <Redirect
                            exact
                            from={`${match.url}/`}
                            to={`${match.url}/dashboard`}
                        />
                        <Route
                            path={`${match.url}/dashboard`}
                            render={props => <Dashboard {...props} />}
                        />
                        <Redirect to="/error" />
                    </Switch>
                </Suspense>
            </div>
        );
    }
}
export default App;
