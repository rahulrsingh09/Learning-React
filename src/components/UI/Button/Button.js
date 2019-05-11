import React from 'react';
import classes from './Button.module.scss';

const MyButton = (props) => {
    return (
        <button onClick = {props.clicked}
                disabled = {props.disabled} 
                className = {[classes.Button, classes[props.type]].join(' ')}>
            {props.children}
        </button>
    );
};


export default MyButton;