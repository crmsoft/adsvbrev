import React from 'react';
import GroupList from './groups-list';
import { Provider } from 'react-redux';
import store from '../redux/store';

export default function({
    user,
    isGuest
}){
    return (
        <div className="content">
            <Provider store={store}>
                <GroupList 
                    isGuest={isGuest}
                    user={user ? user.username:null}
                />
            </Provider>
        </div>
    )
}