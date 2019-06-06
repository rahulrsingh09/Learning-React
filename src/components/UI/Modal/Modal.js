import React from 'react';
import classes from './Modal.module.scss';

import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary'; 


const Modal = (props) => {

    const cssclasses = [
        classes.Modal,
        props.show === 'entering' ? classes.ModalOpen : 
        props.show ==='exiting' ? classes.ModalClosed : null
    ]

    return (
        <Aux>
            <Backdrop show = {props.show === 'entered' || props.show ==='exiting'} close = {props.close}/>
            <div className = {cssclasses.join(' ')} /* style = {props.style} */>
                {props.children}
            </div>
        </Aux>
    );
};

export default Modal;