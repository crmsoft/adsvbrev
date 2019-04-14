import {
    INIT,
    USER_JOINED,
    USER_LEAVED
} from './action';

const initialState = {
    data: {
        name: ``,
        participants: [],
        random: [],
        feed: [],
        media: [],
        participant: false,
        options: {}
    }
};

const reducer = (state, action) => {
    switch(action.type)
    {
        case INIT : {
            return {
                ...action.data
            }
        }
        case USER_JOINED : {
            return {
                data : {
                    ...state.data,
                    participant: true
                }
            }
        }
        case USER_LEAVED : {
            return {
                data : {
                    ...state.data,
                    participant: false
                }
            }
        }
    } // end switch

    return initialState;
}

export default reducer;



// https://images.cf-rabota.com.ua/spa/img/skeletons/vac-list-item.svg