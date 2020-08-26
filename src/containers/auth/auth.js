import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/ui/input/input';
import Button from '../../components/ui/button/button';
import classes from './auth.css';
import { connect } from 'react-redux';
import { checkValidity } from '../../shared/validation'

import * as actions from '../../store/actions/index';
import Spinner from '../../components/ui/spinner/spinner';

const Auth = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [formData, setFormData] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Your Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
    });

    const [isSignUp, setIsSignUp] = useState(false);

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...formData
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setFormData(updatedOrderForm);
        setFormIsValid(formIsValid);
    }


    const onSubmitHandler = event => {
        event.preventDefault();
        console.log(formData.email.value);
        console.log(formData.password.value);
        props.onAuth(formData.email.value, formData.password.value, isSignUp);
    }

    const formElementsArray = [];
    for (let key in formData) {
        formElementsArray.push({
            id: key,
            config: formData[key]
        });
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)}
        />

    ))
    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>
                {props.error.message}
            </p>
        )
    }
    if (props.isAuthenticated) return props.building ?
        <Redirect to='/checkout' />
        : <Redirect to='/' />
    return (
        <div className={classes.auth}>
            <h1>AUTHENTICATE</h1>
            {errorMessage}
            <form onSubmit={onSubmitHandler}>
                {form}
                <Button btnType='Success'>SUBMIT</Button>
            </form>
            <Button
                btnType='Danger'
                clicked={switchAuthModeHandler}
            >
                SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}
            </Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);