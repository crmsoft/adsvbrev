import React, {Component} from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import {NavLink} from 'react-router-dom';

export default class Menu extends Component {
    render()
    {
        return(
            <StickyContainer className="menu" style={this.props.style}>
                
                <Sticky topOffset={55}>
                    {
                        ({style}) => {
                            
                            var _style = style.position ? {
                                ...style,
                                top: 15
                            } : style;

                            return (
                                <ul style={_style}>
                                    <li>
                                        <NavLink 
                                            exact 
                                            activeClassName="active" 
                                            to="/"
                                            isActive={(match, location) => {
                                                return match || location.pathname === '/schedule' || location.pathname === '/settings';
                                            }}
                                        >
                                            <span className="icon-profile icon-info"></span> {` my profile`}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink activeClassName="active" to="/feed">
                                            <span className="icon-profile icon-schedule"></span> {` feed`}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink activeClassName="active" to="/dudes">
                                            <span className="icon-profile"></span> {` Find Dudes`}
                                        </NavLink>
                                    </li>
                                </ul>
                            )
                        }
                    }
                </Sticky>
                
            </StickyContainer>
        )
    }
}