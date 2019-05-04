import React from 'react';
import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {
    return (
        <ul className = {classes.NavigationItems}>
            <NavigationItem link = '/' active>Burger Builder</NavigationItem>
            <NavigationItem link = '/' active>Checkout</NavigationItem>
        </ul>
    );
};

export default NavigationItems;