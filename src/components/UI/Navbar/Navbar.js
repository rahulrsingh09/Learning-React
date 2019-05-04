import React from 'react';
import classes from './Navbar.module.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from './NavigationItems/NavigationItems';
import DrawerOpen from './SideDrawer/DrawerOpen/DrawerOpen';

const Navbar = (props) => {
    return (
        <header className = {classes.Navbar}>
            <DrawerOpen open = {props.openSide}/>
            <div className = {classes.Logo}><Logo/></div>
            <nav className = {classes.DesktopOnly}>
               <NavigationItems/>
            </nav>
        </header>
    );
};

export default Navbar;