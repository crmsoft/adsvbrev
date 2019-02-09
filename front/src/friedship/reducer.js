import {
    FRIENDSHIP_NONE,
    FRIENDSHIP_SUBSCRIBED,
    FRIENDSHIP_FOLLOWING,
    FRIENDSHIP_FRIENDS
} from "./actions";

const initalState = {
    relationship: 'none',
    user: 'self'
};

const reducer = (state = initalState, action) => {    
    switch(action.type){
        case FRIENDSHIP_NONE : {
            return {
                user: action.data.user,
                relationship: FRIENDSHIP_NONE
            }
        }
        case FRIENDSHIP_SUBSCRIBED : {
            return {
                user: action.data.user,
                relationship: FRIENDSHIP_SUBSCRIBED
            }
        }
        case FRIENDSHIP_FOLLOWING : {
            return {
                user: action.data.user,
                relationship: FRIENDSHIP_FOLLOWING
            }
        }
        case FRIENDSHIP_FRIENDS : {
            return {
                user: action.data.user,
                relationship: FRIENDSHIP_FRIENDS
            }
        }   
        default : return { ...state }
    }
}

export default reducer;