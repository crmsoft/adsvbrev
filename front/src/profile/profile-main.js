import React from 'react';
import {DateTime} from 'luxon';

import Ava from './ava';
import ProfileActions from './profile-actions';

const EditableArea = ({text,icon, guest}) => {
    return (
        <div className="text">
            <span className={icon}></span>
            {
                !guest ? (
                    <span className="edit">
                        {text}
                    </span>
                ) : (
                    <span>
                        {text}
                    </span>
                )
            }
        </div>
    )
}

const UserProfile = (data) => {
    
    const {profile} = data.info;
    const {guest} = data;

    return (
        <div className="h-100">
            <div className="profile editable">
                <div className="d-flex w-100">
                    <div className="ava-wrapper">
                        <div className="ava" id="ava" style={guest ? {top:'15px'}:{}}>
                            <Ava isGuest={guest} ava={profile.main_photo}/>
                        </div>
                    </div>
                    <div className="w-25 d-flex flex-column-reverse">
                        <div className="user">
                            <h4>
                                {profile.user.full_name !== ' ' ? profile.user.full_name : profile.user.username}
                            </h4>
                            <div className="user-level"><div className="user-level-progress" style={{width: '80%'}}>72%</div></div>
                            <div>
                                <p className="user-level-value">Level 2</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-25 user-about-wrapper">
                        <div className="user-about">
                            <EditableArea guest={guest} text={DateTime.fromISO(profile.dob).toLocaleString(DateTime.DATE_MED)} icon="icon-cake" />
                        </div>
                    </div>
                    <div className="w-25 user-pc">
                        <div className="d-inline-block mb-1">
                            <EditableArea guest={guest} text={profile.timezone} icon="icon-location" />
                        </div>
                    </div>
                    <div className="right-block-wrapper">
                        {
                            guest ? <ProfileActions /> : null
                        }
                        <ul className="social-list">
                            <li>
                                <a href="#" className="icon-twitch"></a>
                            </li>
                            <li><a href="#" className="icon-youtube"></a></li>
                            <li>
                                <a href="#" className="icon-steam"></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;