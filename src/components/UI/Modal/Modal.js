import React from 'react';
import classes from './Modal.module.scss';

import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary'; 


const Modal = (props) => {
    return (
        <Aux>
            <Backdrop show = {props.show} close = {props.close}/>
            <div className = {classes.Modal}
             style = {{transform : props.show ? 'translateY(0)' : 'translateY(-100vh)',
                       opacity : props.show ? 1 : 0}}>
            {props.children}
            </div>
        </Aux>
    );
};

export default Modal;