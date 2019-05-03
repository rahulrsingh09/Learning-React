
import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';

const IngredientsPrice = {
    Cheese : 4,
    Meat : 5,
    Salad: 1,
    Bacon: 20
}

class BurgerBuilder extends Component{
    
    state = {
        ingredients : {
            Cheese: 0,
            Meat: 0,
            Salad: 0,
            Bacon: 0
        },
        totalPrice:0
    }

    addIngredientsHandler = (type) => {
        const ingredient = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients,
            [type]:ingredient
        }
        

        this.setState((prevState, props) => { 
            return { 
                ingredients: updatedIngredients , 
                totalPrice : IngredientsPrice[type] + prevState.totalPrice
            }
        });


    }

    removeIngredientsHandler = (type) => {
        
    }

    render(){
        return(
            <Aux>
                <Burger ingredients = {this.state.ingredients} />
                <BuildControls addIngredients = {this.addIngredientsHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;