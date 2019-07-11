import React from 'react';
import {DateTime} from 'luxon';

export default ({data}) => {
    
    return (
        <div className="event-schedule">
            <div className="row">
                <div className="col-md-3">
                    <div className="event-schedule-left">
                        <h3>
                            {DateTime.fromISO(data.start).toLocaleString({month:'short'})}
                        </h3>
                        <div className="event-schedule-number">
                            {DateTime.fromISO(data.start).toLocaleString({day:'2-digit'})}
                        </div>
                        <h4>Tournament</h4>
                        <h5>
                            {data.is_private ? 'private':'public'}
                        </h5>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="event-schedule-right">
                        <div className="event-schedule-date" ><span
                            className="icon-friends"></span>Sunday, February 24, 2019 at 5 PM – 8 PM</div>
                        <div className="event-schedule-date"><span
                            className="icon-friends"></span>Via İnternet <a href="www.gamecounter.com">www.gamecounter.com</a>
                        </div>
                        <div className="event-schedule-buttons">
                            <button className="dd-btn btn-sm btn-gray mr-5 pr-lg-4 pl-lg-4">
                                Interested
                            </button>
                            <button className="dd-btn btn-sm btn-full pr-lg-5 pl-lg-5">
                                Attending
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}