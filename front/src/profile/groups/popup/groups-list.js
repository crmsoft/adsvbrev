import React, { Component } from 'react';
import { connect } from 'react-redux';
import { intialFetch, moreFetch } from '../redux/actions';
import GroupListItem from './group-list-item';


class GroupListComponent extends Component {

    componentDidMount(){
        this.props.init(this.props.user);
    }

    render(){
        return (
            <div onClick={ () => { this.props.more();  } }>
                {
                    this.props.items.map( item => {
                        return <GroupListItem key={item.name} user={item} />
                    })
                }
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
            init: user => { dispatch(intialFetch( user )); },
            more: () => { dispatch(moreFetch()); }
        }
    }
)(
    GroupListComponent
);

export default GroupList;