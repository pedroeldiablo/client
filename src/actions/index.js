import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

//redux-thunk allows total control of dispatch process
//allows dispatch on multiple actions 
//which can can be dispatched at any time that we wish
//alternative approach to asynch action creators to redux-promise 
//which is limited to returning one  action creator 
//or action that has to have a promise on the payload property
export const signup = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3090/signup', formProps);
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: ' Email in use' });
    }
};

export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3090/signin', formProps);
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
};



export const signout = () => {
    localStorage.removeItem('token');

    return {
        type: AUTH_USER,
        payload: ''
    }
};
