import React, {Component} from 'react';
import {Provider} from 'react-redux';
import { StickyContainer, Sticky } from 'react-sticky';
import {NavLink} from 'react-router-dom';
import ProfileSchedule from '../profile/schedule';
import scheduleStore from '../profile/schedule/store';


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
                                <div style={_style}>
                                    <ul>
                                        <li>
                                            <NavLink 
                                                exact 
                                                activeClassName="active" 
                                                to="/"
                                                isActive={(match, location) => {
                                                    return match || location.pathname === '/schedule' || location.pathname === '/settings';
                                                }}
                                            >
                                                <span className="icon icon-info"></span> {` my profile`}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeClassName="active" to="/feed">
                                                <span className="icon icon-schedule"></span> {` my feed`}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeClassName="active" to="/dudes">
                                                <span className="icon icon-binocolo"></span> {` Find Your Dudes`}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)">
                                                <span className="icon icon-group"></span> {` Groups`}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)">
                                                <span className="icon icon-basket"></span> {` Trade`}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)">
                                                <span className="icon icon-fist"></span> {` Clans`}
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="p-2">
                                        <Provider store={scheduleStore}>
                                            <ProfileSchedule 
                                                isGuest={false}
                                                list={[]}
                                                total={0}
                                            />                    
                                        </Provider>
                                    </div>
                                </div>
                            )
                        }
                    }
                </Sticky>
                
            </StickyContainer>
        )
    }
}