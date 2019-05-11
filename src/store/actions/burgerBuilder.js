import * as actionTypes from './actionTypes';
import axios from '../../axios.instance';

export const addIngredient = (ingredientName) => {
    return {
        type : actionTypes.ADD_INGREDIENT,
        ingredientName : ingredientName
    }
}

export const removeIngredient = (ingredientName) => {
    return {
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientName : ingredientName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type : actionTypes.SET_INGREDIENTS,
        ingredients : ingredients
    }
}

export const errorLoadingIngredients = () => {
    return {
        type : actionTypes.ERROR_LOADING_INGREDIENTS
    }
}

export const initIngredients = () => {
    return dispatch  => {
         axios.get('ingredients.json').then(ingredients => {
            console.log(ingredients.data)
            dispatch(setIngredients(ingredients.data));
        }).catch( error => {
            dispatch(errorLoadingIngredients());    
        })

    }; 
}