import axios from 'axios';

const PROFILE_LOADED = 'PROFILE_LOADED';


const load_profile = () => {
    return dispatch => {
        axios.post('/profile')
        .then(response => dispatch({type: PROFILE_LOADED, data: response.data.data}));
    }    
}

export {
    load_profile,
    PROFILE_LOADED
};