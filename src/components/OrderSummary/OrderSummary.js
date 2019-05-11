import React from 'react';
import Aux from '../../hoc/Auxillary';
import MyButton from '../UI/Button/Button';

const OrderSummary = (props) => {

    const summary = Object.keys(props.ingredients).map((ingredient) => {
        return <li key = {ingredient}><span style = {{textTransform : 'capitalize'}}>{ingredient} : {props.ingredients[ingredient]}</span></li>
    })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Your Delicious Burger with the Following Ingredients and quantity</p>
            <ul>
                {summary}
            </ul>
            <strong>Total Price : Rs {props.total}</strong>
            <p>Continue to checkout ?</p>
            <MyButton type = 'Danger' clicked = {props.cancel}>CANCEL</MyButton>
            <MyButton type = 'Success' clicked = {props.success}>CONTINUE</MyButton>

        </Aux>
    );
};

export default OrderSummary;