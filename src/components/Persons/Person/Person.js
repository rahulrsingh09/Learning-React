import React from 'react';
import Styles from './Person.module.scss';

const person = (props) => {
    return (
        <div className= {Styles.Person}>
            <p>I am {props.name} and I am {props.age} years old</p>
            <p onClick = {props.click}>{props.children}</p>
            <input type="text" onChange = {props.changed} value = {props.name} />
        </div>
    )
}

export default person;