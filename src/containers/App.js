import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';
import Orders from './Orders/Orders';

class App extends Component {

/*   state = {
    showLoading : false
  }

  setLoadingHandler = (toggle) => {
      this.setState({showLoading : toggle});
  } */

  render() {
    return (
          <Layout>
            {/* <Loading show = {this.state.showLoading}/> */}
            <Switch>
              <Route path= '/checkout' component = {Checkout} />
              <Route path= '/orders' component = {Orders}/>
              <Route path= '/' exact component = {BurgerBuilder}/>
            </Switch>
          </Layout>
    );
  }
}

export default App;
