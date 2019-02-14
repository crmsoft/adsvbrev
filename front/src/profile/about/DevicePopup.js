import React,{Component, Fragment} from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';
import store from '../fetch/store';
import {
    DEVICE_SETTINGS
} from '../fetch/actions';

export default class DevicesPopup extends Component{

    constructor(...props)
    {
        super(...props);
        const pc = this.props.selected.filter(d => d.key === 'pc');
        this.state = {
            open: undefined,
            text: pc.length ? pc.pop().description : ''
        }
    }

    static getDerivedStateFromProps(props, state)
    {
        
        if(state.innerCall)
        {
            return {
                innerCall: false
            }
        } // end if


        return {
            open: props.isOpen,
            devices: [
                ...props.devices.filter(d => {
                    return props.selected.filter(dev => {
                        return dev.key !== d.key
                    }).length === props.selected.length;
                }),
                ...props.selected
            ]
        }
    }

    toggle(key)
    {
        this.setState(state => {

            return {
                innerCall: true,
                devices: state.devices.map(device => {
                    key === device.key && (device.selected = !device.selected);
                    return device;
                })
            }
        })
    }

    notePcSpecs(e)
    {
        const text = e.target.value;
        this.setState(() => {
            return {text: text}
        })
    }

    close()
    {        
        this.props.close();
    }

    onSave()
    {
        const user_devices = [];
        const frm = new FormData();
        this.state.devices.map(device => {
            if (!device.selected){ return; }
            frm.append('device[]', device.key);
            if (device.key === 'pc')
            {
                frm.append('pc_description', this.state.text);
                device.description = this.state.text;
            }

            user_devices.push(device);
        });

        axios.post(`/setting/devices`, frm)
        .then(response => {});

        store.dispatch({type: DEVICE_SETTINGS, data: user_devices });

        this.props.close();
    }

    render()
    {
        const {devices, open} = this.state;
        const can_save = devices.filter(d => d.selected).length;
        return (
            <Fragment>
                <Popup
                    open={open}
                    onClose={this.close.bind(this)}
                    modal={true}
                >
                    <div className="device-selection">
                        <div className="device-select-header">
                            <h3>
                                Add Device 
                            </h3>
                            <button onClick={this.close.bind(this)}>
                                ×
                            </button>
                        </div>
                        <div className="device-options">
                        {
                            devices.map(device => {
            
                                return (
                                    <Fragment key={device.key}>
                                        {
                                            (device.key === 'pc' && device.selected) ? 
                                            <textarea 
                                                defaultValue={this.state.text}
                                                onChange={this.notePcSpecs.bind(this)}
                                                placeholder='Your pc specifications'
                                            /> : ''
                                        }
                                        <button
                                            onClick={e => {this.toggle.call(this, device.key)}}
                                            className={`btn dd-btn ` + (device.selected ? `btn-full`:``)}
                                        >
                                            {device.title}
                                        </button>
                                    </Fragment>
                                )
                            })
                        }
                        </div>
                        <div className="device-actions text-right">
                            <button 
                                className="btn dd-btn btn-gray btn-sm" 
                                onClick={this.close.bind(this)}
                            >
                                Cancel
                            </button>
                            <button 
                                disabled={!can_save}
                                className="btn dd-btn btn-full btn-sm"
                                onClick={this.onSave.bind(this)}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </Popup>
            </Fragment>
        )
    }
}