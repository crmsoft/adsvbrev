import React, { Component } from 'react';
import GroupList from './groups-list';
import { Provider } from 'react-redux';
import store from '../redux/store';

export default class GroupListContent extends Component{

    render(){
        return (
            <div className="content">
                <Provider store={store}>
                    <GroupList />
                </Provider>
            </div>
        )
    }

}