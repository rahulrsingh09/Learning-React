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
            {controls.map(data => {
                return <BuildControl key = {data.label} 
                                     label = {data.label}
                                     add = {() => props.addIngredients(data.type)}/>
            })}
        </div>
    );
}

export default BuildControls;