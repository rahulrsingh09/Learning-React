
import React from 'react';
import BurgerIngredients from './BurgerIngridents/BurgerIngredients';

import classes from './Burger.module.scss';

const Burger = (props) => {

    const transformedIngredients = Object.keys(props.ingredients).map(ingredient => {
        return [...Array(props.ingredients[ingredient])].map( (_,index) => {
            return (
                <BurgerIngredients key = {ingredient+index} type = {ingredient}/>
            )
        })
    }).reduce((array, value) => {
        return array.concat(value);
    }, []);

    return (
        <div className = {classes.Burger}>
            <BurgerIngredients type = "BreadTop"/>
                {transformedIngredients}
            <BurgerIngredients type = "BreadBottom"/>
        </div>
    );
}

export default Burger;