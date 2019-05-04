import React from 'react';

import classes from './DrawerOpen.module.scss';

const DrawerOpen = (props) => {
    return (
        <div className={classes.DrawerOpen} onClick = {props.open}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default DrawerOpen;
