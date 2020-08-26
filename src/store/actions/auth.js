import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        eroor: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeout = () => {
    const expTime = new Date(localStorage.getItem('expirationDate')) - new Date().getTime();
    if (expTime < 0) return dispatch => dispatch(logout())
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expTime)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAAevFgyC4jHvh2ztp2bDTt_WR8LJ6Pnic';
        if (isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAAevFgyC4jHvh2ztp2bDTt_WR8LJ6Pnic'
        }
        axios.post(url, authData)
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.idToken);
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId))
                dispatch(checkAuthTimeout())
                return res.text();
            })
            .then(contents => console.log(contents))
            .catch(err => {
                console.log(err.message);
                dispatch(authFail(err));
            });
    }
}