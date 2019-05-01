
import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component{
    
    state = {
        ingredients : {
            Cheese: 1,
            Meat: 2,
            Salad: 2,
            Bacon: 1
        },
        totalPrice:0
    }

    render(){
        return(
            <Aux>
                <Burger ingredients = {this.state.ingredients} />
                <div>Build Controls</div>
            </Aux>
        )
    }
}

export default BurgerBuilder;