
import React from 'react';
import BurgerIngredients from './BurgerIngridents/BurgerIngredients';
import { withRouter  } from 'react-router';

import classes from './Burger.module.scss';

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(ingredient => {
        return [...Array(props.ingredients[ingredient])].map( (_,index) => {
            return (
                <BurgerIngredients key = {ingredient+index} type = {ingredient}/>
            )
        })
    }).reduce((array, value) => {
        return array.concat(value);
    }, []);

    if(transformedIngredients.length <= 0){
        transformedIngredients = <strong>Please Add Some Ingredients</strong>  
    }
    return (
        <div className = {classes.Burger}>
            <BurgerIngredients type = "BreadTop"/>
                {transformedIngredients}
            <BurgerIngredients type = "BreadBottom"/>
        </div>
    );
}

export default withRouter(Burger); // just to get route methods