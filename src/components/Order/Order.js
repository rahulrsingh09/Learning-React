import React from 'react';
import classes from './Order.module.scss'

const Order = (props) => {

    const myIngredients = [];
    for(let ingredientName in props.ingredients){
        myIngredients.push({name : ingredientName , quantity : props.ingredients[ingredientName]});
    }
    const ingredientOutput = myIngredients.map(ig => {
        return <span key = {ig.name} className = {classes.MyIg}>{ig.name} ({ig.quantity})</span>
    })
    return (
        <div className = {classes.Order}>
           {ingredientOutput}
           <p>Price: <strong>Rs {props.totalPrice}</strong></p> 
        </div>
    );
};

export default Order;