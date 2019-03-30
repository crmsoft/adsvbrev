import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { load_profile, reduce_followers, n_viewed, increment_notification } from './events';
import {connect} from 'react-redux';
import axios from 'axios';
import Followers from './Followers';
import Notification from './Notification';
import { acceptToFriends, declineFriendship } from '../friedship/event';

class HeaderComponent extends Component{

    state = {
        menu: false
    }

    componentDidMount()
    {
        this.props.load();
    }

    toggleMenu()
    {
        this.setState(() => {
            return {
                menu: !this.state.menu
            }
        });
    }

    onProfileOptionsClick( e )
    {
        const clicked = e.target;
       if (clicked.tagName.toLowerCase())
       {
            this.setState(() => {
                return {
                    menu: false
                }
            })
       } // end if
    }

    render()
    {
        
        const user = this.props.data;
        const {followers, notifications} = this.props;
        
        return (
            <header>

                <nav className="navbar navbar-light navbar-expand-md bg-faded justify-content-center">
                    <a href="/" className="navbar-brand d-flex w-50 mr-auto">
                        <img src="/img/logo/logo-h.png" alt="Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse w-100" id="collapsingNavbar3">
                        <div className="navbar-nav w-100 justify-content-center nav-search">
                            <form className="form-inline my-2 my-lg-0 w-100" action="/search">
                                <span className="icon-search"></span>
                                <input className="form-control mr-sm-2 w-100" name="q" type="search" placeholder="Search" aria-label="Search" />
                            </form>
                        </div>
                        <div className="ml-auto w-100">
                            <ul className="nav navbar-nav justify-content-end"> 
                                <li className="nav-item">
                                    <span className={`nav-item-count ` + (followers === 0 ? `d-none`:``)}>{followers}</span>
                                    <Followers 
                                        onDecline={u => {this.props.decline(u);this.props.reduce_followers();}}
                                        onAccept={u => {this.props.accept(u);this.props.reduce_followers();}}
                                        trigger={
                                            <a href="javascript:void(0)" className="nav-link icon-friend"></a>
                                        }
                                    />
                                </li>
                                <li className="nav-item">
                                    <span className={ notifications === 0 ? 'd-none' : 'nav-item-count' }>
                                        {notifications}
                                    </span>
                                    <Notification 
                                        onNotificatoinRecieved={() => {
                                            this.props.in_not()
                                        }}
                                        clear={this.props.notifications_viewed.bind(this)}
                                        trigger={
                                            <a href="javascript:void(0)" className="nav-link icon-notification"></a>
                                        }
                                    />
                                </li>
                                <li className="nav-item">

                                    <a 
                                        className="nav-link dropdown-toggle" 
                                        onClick={this.toggleMenu.bind(this)}
                                        href="javascript:void(0)"
                                    >
                                        <div className="d-flex">
                                            <div className="header-ava">
                                                <img src={user.ava} alt="" />
                                            </div>
                                            <div className="header-ava-text">
                                                {`${user.username} `}
                                            </div>
                                        </div>
                                    </a>
                                    <div 
                                        onClick={this.onProfileOptionsClick.bind(this)}
                                        className={!this.state.menu ? 'dropdown-menu' : 'dropdown-menu show'}
                                    >
                                        <Link to="/settings" className="dropdown-item" >
                                            Settings
                                        </Link>  
                                        <a 
                                            onClick={e => { axios.post('/logout').catch(r => window.location.reload()) }}
                                            className="dropdown-item" 
                                            href="javascript:void(0)"
                                        >Logout</a>                      
                                    </div>

                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </header>
        )
    }
}

const Header = connect(
    state => {
        return {
            ...state
        }
    },
    dispatch => {
        return {
            load: () => dispatch(load_profile()),
            reduce_followers: () => dispatch(reduce_followers()),
            notifications_viewed: () => dispatch(n_viewed()),
            accept: username => dispatch(acceptToFriends(username)),
            decline: username => dispatch(declineFriendship(username)),
            in_not: () => dispatch(increment_notification())
        }
    }
)(HeaderComponent);

export default Header;