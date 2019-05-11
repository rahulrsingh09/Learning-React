import React, { Component } from 'react';
import Order from '../../components/Order/Order'
import * as orderActions from '../../store/actions/';
import {connect} from 'react-redux';

class Orders extends Component {

    componentDidMount(){
        this.props.onOrdersInit();
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
        orders : state.order.orders
    }
}

const mapDispatchToToProps = (dispatch) => {
    return {
        onOrdersInit : (ingredientName) => {dispatch(orderActions.fetchOrder())}
    }
}

export default connect(mapStateToProps,mapDispatchToToProps)(Orders);