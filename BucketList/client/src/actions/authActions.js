import {GET_ERRORS, SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from './../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


// CREATE LIST
export const  createList = (userId, name) => {
    const newList = {
        userId: userId,
        title: name + ' List',
        items: []
    }
    axios.post('/api/lists', newList)
        .then(res => console.log('Yay!'))
        .catch(err => console.log(err));
}


// REGISTER USER

export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => 
            axios.post('/api/lists', {
                userId: res.data._id,
                title: res.data.name + ' List'
            })
                .then(console.log('success'))
                .catch(err => console.log(err))
        )
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

// LOGIN - GET USER TOKEN
export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // SAVE TO LOCAL STORAGE
            const {token} = res.data;
            // SET TOKEN TO LOCAL STORAGE
            localStorage.setItem('jwtToken', token);
            // SET TOKEN TO AUTH HEADER
            setAuthToken(token);
            // DECODE TOKEN TO GET USER DATA
            const decoded = jwt_decode(token);
            // SET CURRENT USER
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

// SET LOGGED IN USER
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// LOG USER OUT
export const logoutUser = () => dispatch => {
    // REMOVE TOKEN FROM LOCAL STORAGE
    localStorage.removeItem('jwtToken');
    // REMOVE AUTH HEADER FOR FUTURE REQUESTS
    setAuthToken(false);
    // SET CURRENT USER TO {} WHICH WILL SET ISAUTHENTICATED TO FALSE
    dispatch(setCurrentUser({}))
}