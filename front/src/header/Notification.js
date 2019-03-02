import React,{Component, Fragment} from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';

export default class Notification extends Component{

    state = {
        list: [],
        open: false
    }

    componentDidUpdate()
    {
        if (this.state.load)
        {
            axios.get(`/notification/list`)
            .then(response => this.setState(() => { return { load: false, list: response.data.data } }))
        } // end if
    }

    onClose()
    {
        this.setState(() => {
            return {
                open: false
            }
        })
    }

    render()
    {
        const {list} = this.state;
        return (
            <div className="followers-popup">
                <Popup
                    onOpen={e => this.setState({load:true})}
                    modal={false}
                    overlayStyle={{display:'none'}}
                    position="bottom center"
                    trigger={this.props.trigger}
                >
                    <Fragment>
                        <div className="followers-header">
                            Notifications
                        </div>
                        {
                            list.map(not => {
                                return (
                                    <li className="user" key={not.id}>
                                        <div className="row">
                                            <div className="col p-0">
                                                {not.message}
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </Fragment>
                </Popup>
            </div>
        )
    }
}