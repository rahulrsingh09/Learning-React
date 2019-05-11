import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import classes from './Checkout.module.scss';


class Checkout extends Component {
    
    state = {
        ingredients : null,
        price : 0
    }

    componentWillMount(){
        if(this.props.location.state){
            this.setState({ingredients : this.props.location.state.ingredients , 
                            price : this.props.location.state.totalPrice});
        }
    }

    cancelOrderHandler = () => {
        this.props.history.goBack();
    }

    proceedOrderHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        let checkout = <Redirect to= '/'/>;
        if(this.state.ingredients){
            checkout = (
                <div className = {classes.Checkout}>
                    <CheckoutSummary ingredients = {this.state.ingredients}
                        cancel = {this.cancelOrderHandler}
                        success = {this.proceedOrderHandler}/>
                    <Route path= {this.props.match.path +'/contact-data'}
                        render = {(props) => <ContactData {...props} ingredients = {this.state.ingredients} totalPrice = {this.state.price}/>} />                
                </div>
            )
        }

        return checkout;
    }
}

export default Checkout;