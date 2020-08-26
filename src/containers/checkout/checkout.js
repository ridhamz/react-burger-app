import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import CheckoutSummay from '../../components/order/checkoutSummary/checkoutSummary';
import ContactData from './contactData/contactData';



const Checkout = (props) => {




    const checkoutCancelled = () => {
        props.history.goBack();
    }

    const checkoutContinued = () => {
        props.history.replace('/checkout/conact-data');
    }
    if (!props.building) return <Redirect to='/' />
    let summary = <Redirect to="/" />
    if (props.ings) {
        //  const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
        summary = (
            <div>
                {/*purchasedRedirect*/}
                <CheckoutSummay
                    ingredients={props.ings}
                    checkoutCancelled={checkoutCancelled}
                    checkoutContinued={checkoutContinued}
                />
                <ContactData
                    ingredients={props.ings}
                    totalPrice={props.totalPrice} />
            </div>
        )
    }

    return summary;
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        purchased: state.order.purchase,
        building: state.burgerBuilder.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Checkout);