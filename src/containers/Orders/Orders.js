import React, { Component } from 'react';
import Order from '../../components/Order/Order'
import * as orderActions from '../../store/actions/';
import {connect} from 'react-redux';

class Orders extends Component {

    componentDidMount(){
        this.props.onOrdersInit(this.props.authToken);
    }

    render() {
        return (
            <div>
                {this.props.orders.map(order => {
                return (
                    <Order key = {order.id} 
                           ingredients = {order.ingredients}
                           totalPrice = {order.totalPrice} />
                )
            })}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        orders : state.order.orders,
        authToken : state.auth.idToken
    }
}

const mapDispatchToToProps = (dispatch) => {
    return {
        onOrdersInit : (authToken) => {dispatch(orderActions.fetchOrder(authToken))}
    }
}

export default connect(mapStateToProps,mapDispatchToToProps)(Orders);