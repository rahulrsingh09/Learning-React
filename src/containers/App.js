import React, { Component } from 'react';

import Layout from '../components/Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Loading from '../components/UI/Loading/Loading';

class App extends Component {

  state = {
    showLoading : false
  }

  setLoadingHandler = (toggle) => {
      this.setState({showLoading : toggle});
  }

  render() {
    return (
          <Layout>
             <Loading show = {this.state.showLoading}/>
            <BurgerBuilder loading = {this.setLoadingHandler}/>
          </Layout>
    );
  }
}

export default App;
