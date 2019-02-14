import React,{Component} from 'react';
import DevicePopup from './DevicePopup';

export default class DeviceList extends Component{

    state = {
        popup: false
    }

    close()
    {
        this.setState(() => {
            return {
                popup: false
            }
        });
    }

    open()
    {
        this.setState(() => {
            return {
                popup: true
            }
        });
    }

    render()
    {
        
        const {list, devices, guest} = this.props;
        const hasPc = list.filter(d => d.key === 'pc');
        return (
            <div className="pr-2 pl-2">
                <div className="row pt-2">
                    <div className="col-sm-4 main-color">
                        My preffered devices
                    </div>
                    <div className="col-sm-8">
                        {
                            list.filter(d => d.key !== 'pc').map(d => d.title).join(', ')
                        }
                    </div>
                </div>
                {
                    hasPc.length ? (
                        <div className="row pt-2">
                            <div className="col-sm-4 main-color">
                                My computer properties
                            </div>
                            <div className="col-sm-8">
                                {hasPc[0].description}
                            </div>
                        </div>
                    ) : null
                }
                {
                    !guest ? (
                        <div className="row pt-2">
                            <div className="col-sm-12 device-advice">
                                <DevicePopup
                                    close={this.close.bind(this)} 
                                    isOpen={this.state.popup}
                                    devices={devices} 
                                    selected={list}
                                />
                                <div className="text-right">
                                    <button 
                                        onClick={this.open.bind(this)}  
                                        className="dd-btn btn-sm"
                                    >
                                        Device Settings
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        )
    }
}