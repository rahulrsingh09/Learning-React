
import React, { useState, useEffect, useReducer } from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios.instance';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/';


const BurgerBuilder = props => {

    //const [purchasing, setPurchasing] = useState(false);
    // alternative to useState useReducer
    const purchaseReducer = (state, action) => {
        switch(action.type) {
            case 'SET' :{
                return action.payload;
            }
            default :{
                return state;
            }
        }
    }
    const [purchasing, dispatch] = useReducer(purchaseReducer, false);

    useEffect(() => {
        props.onInitIngredients();
     return () => {
         // component did unmount clean up stuff goes here
         // empty array to only use as component did mount
     }

    }, []);

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            dispatch({type: 'SET', payload: true});
            //setPurchasing(true);
            props.onPurchaseInit();
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const closeModalHandler = () => {
       // this.setState({ purchasing: false });
       dispatch({type: 'SET', payload: false});
    }

    const continuePurchaseHandler = () => {
        props.history.push('/checkout');
    }

    const cancelPurchaseHandler = () => {
        console.log('canceled');
    }


    const disabledInfo = {
        ...props.ingredients
    }
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
    }

    let burger = props.error ? <p>Error Loading Ingredients</p> : null,
        orderSummary = null

    if (props.ingredients) {
        burger = <Aux>
            <Burger ingredients={props.ingredients} />
            <BuildControls addIngredients={props.onIngredientAdded}
                removeIngredients={props.onIngredientRemoved}
                totalPrice={props.totalPrice}
                disabled={disabledInfo}
                purchasing={purchaseHandler}
                isAuth={props.isAuthenticated} />
        </Aux>

        orderSummary = <OrderSummary ingredients={props.ingredients}
            total={props.totalPrice}
            success={continuePurchaseHandler}
            cancel={cancelPurchaseHandler} />
    }

    return (
        <Aux>
            {burger}
            <Modal show={purchasing} close={closeModalHandler}>
                {orderSummary}
            </Modal>
        </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.idToken != null

    }
}

const mapDispatchToToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => { dispatch(burgerBuilderActions.addIngredient(ingredientName)) },
        onIngredientRemoved: (ingredientName) => { dispatch(burgerBuilderActions.removeIngredient(ingredientName)) },
        onInitIngredients: () => { dispatch(burgerBuilderActions.initIngredients()) },
        onPurchaseInit: () => { dispatch(burgerBuilderActions.purchaseInit()) },
        onSetAuthRedirectPath: (path) => { dispatch(burgerBuilderActions.setAuthRedirectPath(path)) }
    }
}

export default connect(mapStateToProps, mapDispatchToToProps)(withErrorHandler(BurgerBuilder, axios));