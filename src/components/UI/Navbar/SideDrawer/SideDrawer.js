import React from 'react';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.scss';
import Backdrop from '../../Backdrop/Backdrop';
import Aux from '../../../../hoc/Auxillary';


const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.close];
    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.open]
    }
    return (
        <Aux>
            <Backdrop show = {props.open} close = {props.closed}/>
            <div className = {attachedClasses.join(' ')}>
                <div className = {classes.Logo}><Logo/></div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
        
    );
};

export default SideDrawer;