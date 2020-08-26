import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientFailed  = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED,
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(res => dispatch(setIngredients(res.data)))
            .catch(err => dispatch(fetchIngredientFailed()))
    }
}

export const  setIngsData = () => {
    return {
        type :actionTypes.SET_INGS_DATA
    }
}