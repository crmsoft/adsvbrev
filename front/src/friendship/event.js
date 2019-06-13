import {
    FRIENDSHIP_NONE,
    FRIENDSHIP_SUBSCRIBED,
    FRIENDSHIP_FOLLOWING,
    FRIENDSHIP_FRIENDS,
    FRIENDSHIP_DECLINE,
} from './actions';
import axios from 'axios';

const declineFriendship = username => {  
    return dispatch => {
        axios.post(`/friends/decline/${username}`)
        .then(response => dispatch({type: FRIENDSHIP_DECLINE, data: { user:username }}))
        .catch(err => console.log(err))
    }
}

const addToFriends = username => {  
    return dispatch => {
        axios.post(`/friends/add/${username}`)
        .then(response => dispatch({type: FRIENDSHIP_FOLLOWING, data: { user:username }}))
        .catch(err => console.log(err))
    }
}

const unsubscribe = username => {
    return dispatch => {
        axios.post(`/friends/unsubscribe/${username}`)
        .then(response => dispatch({type: FRIENDSHIP_NONE, data: { user:username }}))
        .catch(err => console.log(err))
    }
}

const acceptToFriends = username => {
    return dispatch => {
        axios.post(`/friends/accept/${username}`)
        .then(response => dispatch({type: FRIENDSHIP_FRIENDS, data: { user:username }}))
        .catch(err => console.log(err))   
    }
}

const unfriend = username => {
    return dispatch => {
        axios.post(`/friends/unfriend/${username}`)
        .then(response => dispatch({type: FRIENDSHIP_SUBSCRIBED, data: { user:username }}))
        .catch(err => console.log(err))
    }
}

export {
    addToFriends,
    unfriend,
    acceptToFriends,
    unsubscribe,
    declineFriendship
}