import React, { Component } from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios.instance';

class Orders extends Component {
    
    state = {
        orders:[]
    }

    componentDidMount(){
        axios.get('/order.json').then(res => {
            const fetchedOrders = [];
            for(let id in res.data){
                fetchedOrders.push({
                    ...res.data[id],
                    id : id,
                    totalPrice : res.data[id].totalPrice
                })
            }
            this.setState({orders : fetchedOrders});

        }).catch(error => {

        });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => {
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

export default Orders;