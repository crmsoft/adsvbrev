import React, {Component, Fragment} from 'react';
import SelectDevice from './SelectDevice';
import DeviceList from './DeviceList';

export default class MyDevice extends Component
{
    

    render()
    {
        const {profile, guest} = this.props;
        
        return (
                guest ? (
                    <Fragment>
                        {profile.user_devices.length ? <DeviceList guest={guest} devices={profile.devices} list={profile.user_devices} /> : (
                            <div className="d-flex justify-content-center p-3">
                                <h5 className="main-color">No devices added yet</h5>
                            </div>
                        )}
                    </Fragment>
                ) : (
                    profile.user_devices.length ? 
                    <DeviceList guest={guest} devices={profile.devices} list={profile.user_devices} />
                    :
                    <SelectDevice profile={profile} />
                )
        )
    }
}