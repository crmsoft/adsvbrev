import React, {Component} from 'react';


export default class Event extends Component{

    render()
    {
        const {data} = this.props;
        return (
            <div className={`schedule-content with${data.type}`}>
                <h3>{data.start}</h3>
                <div className="schedule-content-line">
                    <div className="title">Event Owner </div> <span>:</span> 
                    <div className="content">
                        {data.owner.full_name}
                    </div>
                    <div className="title">Event Title </div> <span>:</span> <div className="content">{data.name}</div>
                    <div className="title">Web Site	</div> <span>:</span> 
                    <div className="content">
                        www.dudes.com
                    </div>
                    <div className="title">Description <br />  <small><span className="fa fa-minus" aria-hidden="true"></span>Leave Event</small>	</div> <span>:</span> 
                    <div className="long-content">
                        {data.description}
                    </div>

                </div>
            </div>
        )
    }
}