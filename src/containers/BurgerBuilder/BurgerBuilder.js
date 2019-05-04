
import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';


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
        totalPrice:4,
        purchasing : false
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

        if(this.state.ingredients[type] <= 0){
            return;
        }
        const ingredient = this.state.ingredients[type] - 1;
        const updatedIngredients = {
            ...this.state.ingredients,
            [type]:ingredient
        }
        

        this.setState((prevState, props) => { 
            return { 
                ingredients: updatedIngredients , 
                totalPrice :  prevState.totalPrice - IngredientsPrice[type]
            }
        });
    }

    purchaseHandler = () => {
        this.setState({purchasing : true});
    }

    closeModalHandler = () => {
        this.setState({purchasing : false});
    }

    continuePurchaseHandler = () => {
        alert('Continue');
    }

    cancelPurchaseHandler = () => {
        console.log('canceled');
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
        }

        return(
            <Aux>
                <Burger ingredients = {this.state.ingredients} />
                <BuildControls addIngredients = {this.addIngredientsHandler}
                               removeIngredients = {this.removeIngredientsHandler}
                               totalPrice = {this.state.totalPrice}
                               disabled = {disabledInfo}
                               purchasing = {this.purchaseHandler}/>
                <Modal show = {this.state.purchasing} close = {this.closeModalHandler}>
                    <OrderSummary ingredients = {this.state.ingredients}
                                  total = {this.state.totalPrice}
                                  success = {this.continuePurchaseHandler}
                                  cancel = {this.cancelPurchaseHandler}/>
                </Modal>
            </Aux>
        )
    }
}

export default BurgerBuilder;