import React from 'react';

import Styles from './Cockpit.module.scss';


const cockpit = (props) => {
    
    let buttonCss = '';
    if(props.showPerson) {
      buttonCss = Styles.Red;
    }
    return (
    <div className = {Styles.Cockpit}>
        <h1>Hi I am a React Component</h1>
        <button className= {buttonCss} onClick = {() => props.togglePerson()}>Toggle Persons</button>
    </div>
    );
}

export default cockpit;