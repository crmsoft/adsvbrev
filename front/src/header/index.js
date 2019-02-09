import React, {Component} from 'react';
import { load_profile } from './events';
import {connect} from 'react-redux';
import axios from 'axios';

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

    render()
    {
        const user = this.props;
        
        return (
            <ul className="nav navbar-nav justify-content-end"> 
                <li className="nav-item">
                    <span className="nav-item-count">5</span>
                    <a href="#asdc" className="nav-link icon-friend"></a>
                </li>
                <li className="nav-item">
                    <span className="nav-item-count">5</span>
                    <a href="#sacvsd" className="nav-link icon-notification"></a>
                </li>
                <li className="nav-item">
                    <span className="nav-item-count">5</span>
                    <a href="#asdc" className="nav-link icon-notification"></a>
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
                    <div className={!this.state.menu ? 'dropdown-menu' : 'dropdown-menu show'}>
                        <a 
                            onClick={e => { axios.post('/logout').catch(r => window.location.reload()) }}
                            className="dropdown-item" 
                            href="javascript:void(0)"
                        >Logout</a>
                    </div>


                </li>
            </ul>
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
            load: () => dispatch(load_profile())
        }
    }
)(HeaderComponent);

export default Header;