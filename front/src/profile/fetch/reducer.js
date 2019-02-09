import {
    PROFILE_FETCH_DONE,
    PROFILE_FETCH_START,
    PROFILE_FETCH_ERROR,
    PROFILE_REFRESH,
    POST_ADDED,
    POST_LIKED,
    APPEND_COMMENT,
    COMMENT_LIKED
} from './actions';

const initialState = {
    data : {
        friends: [],
        groups:[],
        feed:[],
        profile: { ava : '', user:{} },
        totals: {
            friends: 0,
            groups: 0
        }
    },
    guest: true
};

const profileReducer = (state = initialState, action) => {   
     
    switch(action.type){
        case COMMENT_LIKED : {
            return {
                ...state,
                data:{
                    feed : state.data.feed.map(post => {
                        if(post.id === action.data.post)
                        {
                            post.comment.map(comment => {
                                if(comment.id === action.data.comment)
                                {
                                    if(!comment.likes)
                                    {
                                        comment.like_count++;
                                    } else { comment.like_count--; }
                                    comment.likes = !comment.likes;
                                }
                            })
                        }
                        return post;
                    }),
                    ...state.data
                }
            }
        }
        case APPEND_COMMENT : {
            return {
                ...state,
                data:{
                    feed : state.data.feed.map(post => {
                        if(post.id === action.data.post)
                        {
                            post.comment.push(action.data.comment);
                        }
                        return post;
                    }),
                    ...state.data
                }
            }
        }
        case POST_LIKED : {
            return {
                ...state,
                data:{
                    feed : state.data.feed.map(post => {
                        
                        if(post.id === action.data)
                        {
                            if(post.likes)
                            {
                                post.like_count--;
                                post.likes = false;
                            }else{
                                post.like_count++;
                                post.likes = true;
                            }
                        }

                        return post;
                    }),
                    ...state.data
                }
            }
        }
        case POST_ADDED : {
            return {
                ...state,
                data: {
                    ...state.data,
                    feed: [
                        action.data,
                        ...state.data.feed
                    ]
                }
            }
        }
        case PROFILE_REFRESH : {
            const a = Object.assign({}, state);
            a.info.profile.main_photo = action.data;
            return {
                ...a,
                poof: Math.random()  
            };
        }
        case PROFILE_FETCH_DONE: {
            return {
                ...action.data,
                fetching: false
            }
        }
        case PROFILE_FETCH_ERROR : {
            return {
                ...state,
                error: action.error
            }
        }
        case PROFILE_FETCH_START : {
            return {
                ...state,
                fetching: true,
            }
        }
        default: {
            return state;
        }
    }
}

export default profileReducer;