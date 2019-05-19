import * as actionTypes from './actionTypes';
import axios from '../../axios.instance';
import * as burgerActions from '../actions';

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

export const resetOrders = () => {
    return {
        type : actionTypes.RESET_ORDERS
    }
}


export const purchaseBurger = (orderData, authToken) => {
    return dispatch => {
        dispatch(purchaseBurgerInit());
        axios.post('/order.json?auth='+ authToken, orderData).then(res => {
           dispatch(purchaseBurgerSuccess(res.data.name, orderData));
           dispatch(burgerActions.resetIngredients())
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



export const fetchOrder = (authToken, userId) => {
    return dispatch => {
        dispatch(fetchOrderInit());
        const queryParams = authToken + '&orderBy="userId"&equalTo="'+ userId + '"';
        axios.get('/order.json?auth='+ queryParams).then(res => {
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