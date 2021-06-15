import React from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {Layout} from 'antd';
import './index.css';

import Pokemon from './routes/Pokemon';
import Detail from './routes/Detail';

const {Content} = Layout;

const App = ({match}) => {
  return (
    <div id={'components-layout-demo-custom-trigger'}>
      <Layout>
        <Layout className="site-layout" style={{height: '100vh', overflow: 'auto'}}>
          <Content style={{margin: '24px 16px', minHeight: 280}}>
            <Switch>
              <Redirect exact from={`${match.url}/`} to={`${match.url}/pokemon`}/>
              <Route path={`${match.url}/pokemon/:pokemon`} component={Detail}/>
              <Route path={`${match.url}/pokemon`} component={Pokemon}/>
              <Redirect to="/404"/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default withRouter(App);