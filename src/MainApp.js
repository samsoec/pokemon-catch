import React from 'react';
import {ConnectedRouter} from 'connected-react-router'
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ApolloProvider} from "@apollo/client";
import './MainApp.css';

import configureStore, {history} from './store';
import App from 'containers/App';
import apolloClient from 'util/Api'

export const store = configureStore();

const MainApp = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={App}/>
          </Switch>
        </ConnectedRouter>
      </ApolloProvider>
    </Provider>
  )
};

export default MainApp;