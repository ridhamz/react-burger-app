import React from 'react';
import { BrowserRouter, Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/layout/layout';
import BurgerBuild from './containers/BurgerBuilder/burgerBuilder';
import Checkout from './containers/checkout/checkout';
import Orders from './containers/orders/orders';
import Auth from './containers/auth/auth';
import Logout from './containers/auth/logout/logout';
import { connect } from 'react-redux';

function App(props) {
  let routes = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route exact path='/' component={BurgerBuild} />
      <Redirect to='/' />
    </Switch>
  )
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/checkout' component={Checkout} />
        <Route path='/orders' component={Orders} />
        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={BurgerBuild} />
        <Redirect to='/' />
      </Switch>
    )
  }
  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

const mapSateToPtrops = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default withRouter(connect(mapSateToPtrops)(App));
