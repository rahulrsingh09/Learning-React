import * as actionTypes from './actionTypes';
import axios from '../../axios.instance';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerInit = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_INIT
    }
}


export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerInit());
        axios.post('/order.json', orderData).then(res => {
           dispatch(purchaseBurgerSuccess(res.data.name, orderData))
        }).catch(error => {
            dispatch(purchaseBurgerFail(error))
        })
    }
}

export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type : actionTypes.FETCH_ORDER_SUCCESS,
        orders : orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type : actionTypes.FETCH_ORDER_FAIL,
        error : error
    }
}

export const fetchOrderInit = () => {
    return {
        type : actionTypes.FETCH_ORDER_INIT
    }
}



export const fetchOrder = () => {
    return dispatch => {
        dispatch(fetchOrderInit());
        axios.get('/order.json').then(res => {
            const fetchedOrders = [];
            for(let id in res.data){
                fetchedOrders.push({
                    ...res.data[id],
                    id : id,
                    totalPrice : res.data[id].totalPrice
                })
            }
            dispatch(fetchOrderSuccess(fetchedOrders));

        }).catch(error => {
            dispatch(fetchOrderFail())
        });

    }
}