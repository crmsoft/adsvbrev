import React from 'react';
import SettingsContnet from './tabs';
import Menu from '../menu/index';
import { fetchProfile } from '../profile/fetch/events';
import { connect } from 'react-redux'; 

const SettingsComponent = (props) => {
    return (
        <div className="d-flex">

            <Menu />
            
            <div className="user-middle">
                
                <div className="user-settings">
                    
                    <div className="header">
                        <h1>Settings</h1>
                        <img src="/img/settings-decor.png" alt="" />
                    </div>

                    <div id="settings-content">
                        <SettingsContnet data={{...props}}/>
                    </div>

                </div>

            </div>

        </div>
    )
}

const Settings = connect(
    state => {
        return state;
    },
    dispatch => {
        return {
            init: () => {
                dispatch(fetchProfile());
            }
        }
    }
)(SettingsComponent);

export default Settings;