import React, { useEffect, useState } from 'react';
import Order from '../../components/order/order';
import axios from '../../axios-orders';
import Spinner from '../../components/ui/spinner/spinner';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

const Orders = (props) => {

    useEffect(() => {
        props.onFetchOrders(props.token, props.userId)
    }, [])

    let allOrders = <Spinner />
    if (!props.loading) {
        allOrders = props.orders.map(ord => <Order
            key={ord.key}
            ingredients={ord.ingredients}
            price={+ord.price}
        />);
    }

    return (
        <div>
            {allOrders}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);