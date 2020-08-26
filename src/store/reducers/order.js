import * as ActionTypes from '../actions/actionTypes';


const initialState = {
    orders: [],
    loading: false,
    purchase: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.id
            }
            return {
                ...state,
                loading: false,
                purchase: true,
                orders: state.orders.concat(newOrder)
            };
        case ActionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        case ActionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };
        case ActionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchase: false
            }
        case ActionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }
        case ActionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case ActionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;