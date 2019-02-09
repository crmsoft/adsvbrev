import React,{Component} from 'react';
import { connect } from 'react-redux';
import {
    unfriend,
    addToFriends,
    unsubscribe,
    acceptToFriends
} from '../../friedship/event';
import {
    FRIENDSHIP_NONE,
    FRIENDSHIP_SUBSCRIBED,
    FRIENDSHIP_FOLLOWING,
    FRIENDSHIP_FRIENDS
} from '../../friedship/actions';
import {guest} from '../fetch/store';

let guestUnsubscribe = () => {};

class FriendShipActionComponent extends Component{

    state = {
        status: FRIENDSHIP_NONE
    }

    componentDidMount()
    {
        guestUnsubscribe = guest.subscribe(function(){
            const status = guest.getState().data.profile.user.has_status;
            this.setState({
                status: status === 'subscribed' ? FRIENDSHIP_FOLLOWING : (
                    status === 'friends' ? FRIENDSHIP_FRIENDS :  (
                        status === 'following' ? FRIENDSHIP_SUBSCRIBED : FRIENDSHIP_NONE
                    )
                )
            });
        }.bind(this));
    }

    componentWillUnmount()
    {
        guestUnsubscribe();
    }

    static getDerivedStateFromProps(nextProps, prevState)
    {
        
        if( nextProps.relationship !== 'none' && 
            nextProps.relationship !== prevState.status)
        {
            return {
                status: nextProps.relationship
            }
        }

        return null;
    }

    render(){ 
        
        const {data} = guest.getState();
        const username = data.profile.user.username;
        const status = this.state.status;
        
        
        return (
            <div>
                {
                    status === FRIENDSHIP_NONE ? 
                    (
                        <button 
                            onClick={() => this.props.addToFriends(username)}
                            className="dd-btn btn-sm btn-full"
                        >
                            <span className="icon-yt"></span>
                            Add to Friends
                        </button>
                    ) : null
                }

                {
                    status === FRIENDSHIP_FRIENDS ? 
                    (
                        <button 
                            onClick={() => this.props.unfriend(username)}
                            className="dd-btn btn-sm btn-full"
                        >
                            <span className="icon-yt"></span>
                            Unfriend
                        </button>
                    ) : null
                }

                {
                    status === FRIENDSHIP_FOLLOWING ? 
                    (
                        <button 
                            onClick={() => this.props.unsubscribe(username)}
                            className="dd-btn btn-sm btn-full"
                        >
                            <span className="icon-yt"></span>
                            Unsubscribe
                        </button>
                    ) : null
                }

                {
                    status === FRIENDSHIP_SUBSCRIBED ? 
                    (
                        <button 
                            onClick={() => this.props.accept(username)}
                            className="dd-btn btn-sm btn-full"
                        >
                            <span className="icon-yt"></span>
                            Accept
                        </button>
                    ) : null
                }
                
            </div>
        )
    }
}

const FriendShipAction = connect(
    state => {
        return {
            ...state
        }
    },

    dispatch => {
        return {
            unfriend: username => { dispatch(unfriend(username)) },
            addToFriends: username => { dispatch(addToFriends(username)) },
            unsubscribe: username => { dispatch(unsubscribe(username)) },
            accept: username => { dispatch(acceptToFriends(username)) }
        }
    }
)(FriendShipActionComponent);

export default FriendShipAction;