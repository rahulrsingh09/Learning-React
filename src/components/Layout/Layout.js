import React, { Component } from 'react';

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
                <Navbar openSide = {this.sideDrawerOpenHandler}/>
                <SideDrawer open = {this.state.showSideDrawer} closed = {this.sideDrawerClosedHandler}/>
                <main className = {classes.Content }>
                    {this.props.children}
                </main>
            </Aux>
        );            
    }
}

export default Layout;