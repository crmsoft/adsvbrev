import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class Menu extends Component {
    render()
    {
        return(
            <nav className="menu">
                <ul>
                    <li>
                        <NavLink activeClassName="active" to="/">
                            <span className="icon-profile"> my profile</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/feed">
                            <span className="icon-profile"> feed</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/dudes">
                            <span className="icon-profile"> Find Dudes</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}