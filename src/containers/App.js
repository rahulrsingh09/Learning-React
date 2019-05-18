import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from '../components/Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';
import Orders from './Orders/Orders';
import Auth from './Auth/Auth';
import Logout from './Auth/Logout/Logout';
import * as authActions from '../store/actions';

class App extends Component {

/*   state = {
    showLoading : false
  }

  setLoadingHandler = (toggle) => {
      this.setState({showLoading : toggle});
  } */

  componentDidMount(){
    this.props.autoAuthCheck();
  }

  render() {
    return (
          <Layout>
            {/* <Loading show = {this.state.showLoading}/> */}
            <Switch>
              <Route path= '/checkout' component = {Checkout} />
              <Route path= '/orders' component = {Orders}/>
              <Route path= '/auth' exact component = {Auth}/>
              <Route path= '/logout' exact component = {Logout}/>
              <Route path= '/' exact component = {BurgerBuilder}/>
            </Switch>
          </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {

      
  }
}

const mapDispatchToToProps = (dispatch) => {
  return {
      autoAuthCheck : () => {dispatch(authActions.autoAuthCheck())}
  }
}

export default connect(mapStateToProps, mapDispatchToToProps)(App);
