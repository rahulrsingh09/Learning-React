import React, { Component } from 'react';
import {Route} from 'react-router-dom';

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
        console.log(this.state);
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div className = {classes.Checkout}>
                <CheckoutSummary ingredients = {this.state.ingredients}
                    cancel = {this.cancelOrderHandler}
                    success = {this.proceedOrderHandler}/>
                <Route path= {this.props.match.path +'/contact-data'}
                       render = {(props) => <ContactData {...props} ingredients = {this.state.ingredients} totalPrice = {this.state.price}/>} />
            </div>
        );
    }
}

export default Checkout;