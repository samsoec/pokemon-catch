import React from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';

import MainApp from 'app/index';

import Error404 from "components/Error404";
import Error403 from "components/Error403";

const App = ({match, location}) => {

  if (location.pathname === '/')
    return <Redirect to={'/app'}/>;

  return (
    <div className="app-main">
      <Switch>
        <Route path={`${match.url}app`} component={MainApp}/>
        <Route path='/404' component={Error404}/>
        <Route path='/403' component={Error403}/>
      </Switch>
    </div>
  );
};


export default withRouter(App);