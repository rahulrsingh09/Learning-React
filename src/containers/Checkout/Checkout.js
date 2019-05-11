import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import classes from './Checkout.module.scss';
import { connect } from 'react-redux';

class Checkout extends Component {
    
    cancelOrderHandler = () => {
        this.props.history.goBack();
    }

    proceedOrderHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        let checkout = <Redirect to= '/'/>;
        if(this.props.ingredients){
            const purchasedRedirect = this.props.purchased ? <Redirect to = '/'/> : null
            checkout = (
                <div className = {classes.Checkout}>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients = {this.props.ingredients}
                        cancel = {this.cancelOrderHandler}
                        success = {this.proceedOrderHandler}/>
                    <Route path= {this.props.match.path +'/contact-data'}
                           component = {ContactData} />                
                </div>
            )
        }

        return checkout;
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        purchased : state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);