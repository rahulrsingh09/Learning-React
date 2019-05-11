import React from 'react';
import Burger from '../../Burger/Burger';
import MyButton from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.scss';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>This is the Burger you ordered, Hope you like it !!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <MyButton type='Danger' clicked={props.cancel}>CANCEL</MyButton>
            <MyButton type='Success' clicked={props.success}>CONTINUE</MyButton>
        </div>
    );
};

export default CheckoutSummary;