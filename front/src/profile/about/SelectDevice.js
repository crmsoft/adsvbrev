import React, {Component, Fragment} from 'react';
import DevicePopup from './DevicePopup';

export default class SelectDevice extends Component {
    
    state = {
        popup: false
    }

    open()
    {
        this.setState(() => {
            return {
                popup: true
            }
        })
    }

    close()
    {
        this.setState(() => {
            return {
                popup: false
            }
        })
    }

    render()
    {
        const {devices} = this.props.profile;
        return (
            <div className="profile-devices device-advice">
                <DevicePopup 
                    isOpen={this.state.popup}
                    close={this.close.bind(this)}
                    devices={devices}
                    selected={[]}
                />
                <button
                    onClick={this.open.bind(this)} 
                    className="btn dd-btn"
                >
                    {`Click to add gaming devices that your are using!`}
                </button>
            </div>
        )
    }
}