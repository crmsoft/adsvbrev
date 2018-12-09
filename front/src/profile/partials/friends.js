import React, {Component} from 'react';
import ListHOC from '../lists/List.hoc';
import {
    FriendListItem, 
    store,
    initialFetch
} from '../lists/firned-list';

import { connect, Provider } from 'react-redux';


const HeaderContent = () => {
    return (
        <a href="javascript:void(0);">
            <span className="icon-friends"></span>
            <h3>friends</h3>
            <span className="items-count"> 1</span>
        </a>
    )
}

const BoxFriendView = ( props ) => {
    return (
        <a href="/gg/the-rock" className="friend">
            <img src="../img/sample-friend.jpg" alt="body" />
            <h2>{props.name}</h2>
        </a>
    )
}

const ListHoc = connect(
    state => {
        return {
            items: state.items
        }
    },
    dispatch => { 
        return { 
            init: () => {
                dispatch(initialFetch())
            } 
        } 
    }
)(ListHOC(FriendListItem, HeaderContent()));

export default class Friends extends Component{
    constructor(props){
        super(props)

        this.state = {
            frineds: [
                {
                    name: 'Someone'
                }
            ]
        }
    }

    componentDidMount(){

    }

    render(){
        return (
            <div>
                <div className="header">
                    <Provider store={store}>
                        <ListHoc />
                    </Provider>
                </div>

                <div className="block-content">

                    <div className="friends">

                        {
                            this.state.frineds.map( (item, index) => {
                               return <BoxFriendView key={index} name={item.name} />
                            })
                        }
                        
                        <a href="#fr" className="friend">
                            <img src="../img/add-friends.jpg" alt="body" />
                        </a>

                    </div>

                </div>
            </div>
        )
    }
}