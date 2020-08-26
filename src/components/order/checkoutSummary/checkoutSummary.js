import React from 'react';
import Burger from '../../burger/burger';
import classes from './checkoutSummary.css';

const CheckoutSummay = (props) => {
    return (
        <div className={classes.checkoutSummary}>
            <h1>We hope iy tatstes well!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
           { /*<Button
                btnType='Danger'
                clicked={props.checkoutCancelled}
            >CANCEL</Button>
            <Button
                btnType='Success'
                clicked={props.checkoutContinued}
            >CONTINUE</Button>*/}
        </div>
    );
}

export default CheckoutSummay;