import React from 'react';
import Ava from './ava';
import {Link} from 'react-router-dom';
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
                        <Link to="/settings" className="icon-pencil"></Link>
                        <div className="ava" id="ava">
                            <Ava isGuest={guest} ava={profile.main_photo}/>
                        </div>
                    </div>
                    <div className="w-25">
                        <div className="user">
                            <h4>
                                {profile.user.full_name}
                            </h4>
                            <div className="user-level"><div className="user-level-progress" style={{width: '80%'}}>72%</div></div>
                            <div>
                                <p className="user-level-value">Level 2</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-25 user-about-wrapper">
                        <div className="user-about">
                            <EditableArea guest={guest} text="Istanbul - Turkey" icon="icon-location" />
                            <EditableArea guest={guest} text="July 24, 1985" icon="icon-cake" />
                        </div>
                    </div>
                    <div className="w-25 user-pc">
                        <div className="d-inline-block icon-pc"></div>
                        <div className="d-inline-block mb-1">
                            <EditableArea guest={guest} text="Intel® Pentium(R) CPU P6200 @ 2.13GHz × 2; Intel® Ironlake Mobile " />
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
                            <li><a href="#" className="icon-yt"></a></li>
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