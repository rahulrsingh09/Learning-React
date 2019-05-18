import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxillary';
import classes from './Layout.module.scss';
import Navbar from '../UI/Navbar/Navbar';
import SideDrawer from '../UI/Navbar/SideDrawer/SideDrawer';


class Layout extends Component {

    state = {
        showSideDrawer : false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer : false});
    }

    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer : true});
    }

    render() {
        return (
            <Aux>
                <Navbar openSide = {this.sideDrawerOpenHandler} isAuth = {this.props.isAuthenticated}/>
                <SideDrawer open = {this.state.showSideDrawer} closed = {this.sideDrawerClosedHandler} isAuth = {this.props.isAuthenticated}/>
                <main className = {classes.Content }>
                    {this.props.children}
                </main>
            </Aux>
        );            
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.idToken != null
    }
  }


export default connect(mapStateToProps)(Layout);