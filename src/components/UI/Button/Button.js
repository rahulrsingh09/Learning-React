import React from 'react';
import classes from './Button.module.scss';

const MyButton = (props) => {
    return (
        <button onClick = {props.clicked} className = {[classes.Button, classes[props.type]].join(' ')}>
            {props.children}
        </button>
    );
};


export default MyButton;