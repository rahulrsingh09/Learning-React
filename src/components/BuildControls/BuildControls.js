import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.scss'

const controls = [
    {label: 'Salad',type: 'Salad'},
    {label: 'Bacon',type: 'Bacon'},
    {label: 'Meat',type: 'Meat'},
    {label: 'Cheese',type: 'Cheese'}
]

const BuildControls = (props) => {
    return (
        <div className = {classes.BuildControls}>
            <strong>Total Price : Rs {props.totalPrice}</strong>
            {controls.map(data => {
                return <BuildControl key = {data.label} 
                                     label = {data.label}
                                     add = {() => props.addIngredients(data.type)}
                                     remove = {() => props.removeIngredients(data.type)}
                                     disabled = {props.disabled[data.type]}/>
            })}
            <button className = {classes.OrderButton} 
                    disabled = {props.totalPrice <= 4 ? true : false}
                    onClick = {props.purchasing}
                    >{props.isAuth ? 'Order Now': 'SIGN UP TO CONTINUE'}</button>
        </div>
    );
}

export default BuildControls;