import React from 'react';
import classes from './order.css';

const Order = (props) => {

    const ingredients = [];
    for (let ing in props.ingredients) {
        ingredients.push({
            name: ing,
            amount: props.ingredients[ing]
        })
    }

    const IngredientOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>{ig.name} ({ig.amount}) </span>;
    })

    return (
        <div className={classes.order}>
            <p>Ingredients : {IngredientOutput}</p>
            <p>Price : <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default Order;