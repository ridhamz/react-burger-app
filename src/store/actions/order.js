import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const puchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    }
}

export const puchaseBurgerFail = (err) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: err
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    purchaseBurgerStart();
    return dispatch => {
        return axios.post('/orders.json?auth' + token, orderData)
            .then(response => dispatch(puchaseBurgerSuccess(response.data.name, orderData)))
            .catch(error => dispatch(puchaseBurgerFail(error.message)));
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}


export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token ,userId) => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json?auth=' + token + '&orderBy="userId"&equalTo="' + userId+'"')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    // if (res.data.userId === localStorage.getItem('userId')) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                // }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    };
};