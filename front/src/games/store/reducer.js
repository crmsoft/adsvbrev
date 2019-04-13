import {INIT} from './action';

const initialState = {
    data: {
        name: ``,
        participants: [],
        random: [],
        feed: [],
        participant: false
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
    } // end switch

    return initialState;
}

export default reducer;



// https://images.cf-rabota.com.ua/spa/img/skeletons/vac-list-item.svg