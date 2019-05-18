
import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios.instance';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/';


class BurgerBuilder extends Component{
    
    state = { 
        purchasing : false
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing : true});
            this.props.onPurchaseInit();    
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    closeModalHandler = () => {
        this.setState({purchasing : false});
    }

    continuePurchaseHandler = () => {
         this.props.history.push('/checkout');
    }

    cancelPurchaseHandler = () => {
        console.log('canceled');
    }

    render(){
        
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
        }

        let burger = this.props.error ? <p>Error Loading Ingredients</p> : null,
            orderSummary = null

        if(this.props.ingredients){
            burger =<Aux>
                        <Burger ingredients = {this.props.ingredients} />
                        <BuildControls addIngredients = {this.props.onIngredientAdded}
                                    removeIngredients = {this.props.onIngredientRemoved}
                                    totalPrice = {this.props.totalPrice}
                                    disabled = {disabledInfo}
                                    purchasing = {this.purchaseHandler}
                                    isAuth = {this.props.isAuthenticated}/>
                    </Aux>
            
            orderSummary = <OrderSummary ingredients = {this.props.ingredients}
                            total = {this.props.totalPrice}
                            success = {this.continuePurchaseHandler}
                            cancel = {this.cancelPurchaseHandler}/>
        }

        return(
            <Aux>
                {burger}
                <Modal show = {this.state.purchasing} close = {this.closeModalHandler}>
                    {orderSummary}
                </Modal>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuthenticated : state.auth.idToken != null
        
    }
}

const mapDispatchToToProps = (dispatch) => {
    return {
        onIngredientAdded : (ingredientName) => {dispatch(burgerBuilderActions.addIngredient(ingredientName))},
        onIngredientRemoved : (ingredientName) => {dispatch(burgerBuilderActions.removeIngredient(ingredientName))},
        onInitIngredients : () => {dispatch(burgerBuilderActions.initIngredients())},
        onPurchaseInit : () => {dispatch(burgerBuilderActions.purchaseInit())},
        onSetAuthRedirectPath : (path) => {dispatch(burgerBuilderActions.setAuthRedirectPath(path))}
    }
}

export default connect(mapStateToProps,mapDispatchToToProps)(withErrorHandler(BurgerBuilder,axios));