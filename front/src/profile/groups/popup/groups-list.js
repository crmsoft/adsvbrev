import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialFetch, moreFetch } from '../redux/actions';
import GroupListItem from './group-list-item';


class GroupListComponent extends Component {

    componentDidMount(){
        this.props.init(this.props.user);
    }

    render(){
        const {items, isGuest} = this.props;

        return (
            <div style={{maxHeight: '70vh', overflowY: 'auto'}}>
                {items.map( item => <GroupListItem isGuest={isGuest} key={item.username} group={item} />)}
            </div>
        )
    }
}

const GroupList = connect(
    state => {
        return {
            ...state
        }
    },
    dispatch => {
        return {
            init: user => { dispatch(initialFetch( user )); },
            more: () => { dispatch(moreFetch()); }
        }
    }
)(
    GroupListComponent
);

export default GroupList;