import {
    INIT,
    USER_JOINED,
    USER_LEAVED,
    FORBIDDEN,
} from './action';

const initialState = {
    data: {
        participants: [],
        reviews_open: false,
        participant: false,
        options: {},
        random: [],
        media: [],
        feed: [],
        related: [],
        name: ``
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type)
    {
        case FORBIDDEN : {            
            return {
                forbidden: true,
                data: {
                    ...state.data,
                    ...action.data.data,
                }
            }
        }
        case INIT : {            
            return {
                data: {
                    ...state.data,
                    ...action.data.data,
                }
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