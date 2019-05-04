import React from 'react';

import Burger_Logo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.scss';

const Logo = () => {
    return (
        <div className = {classes.Logo}>
          <img src = {Burger_Logo} alt ='My Burger'/>  
        </div>

    );
};

export default Logo; 