import React, {Component} from 'react';
import Menu from '../menu';
import Flatpickr from 'react-flatpickr';

export default class Schedule extends Component {
    
    constructor(...props) {
        super(...props);
        
        this.state = {
            date: new Date()
        };
    }

    /**
     * to retrieve the Date object => dayElem.dateObj.getTime()
     * function to mark the dates
     * 
     * @param {array} m 
     * @param {string} n 
     * @param {object} fp 
     * @param {NodeElement} dayElem 
     */
    onDayCreated(m, n, fp, dayElem)
    {
        const timestamp = dayElem.dateObj.getTime();
        if( timestamp < 1549231200000)
        {
            dayElem.classList.add('has-event');
            dayElem.innerHTML = `<span class="event-day">${dayElem.textContent}</span><div class="aside event-dd-mark"></div><div class="aside event-group-mark"></div><div class="user-event-mark"></div>`;
        } else if (timestamp < 1549317600000)
        {
            dayElem.classList.add('has-event');
            dayElem.innerHTML = `<span class="event-day">${dayElem.textContent}</span><div class="aside event-dd-mark"></div><div class="aside event-group-mark"></div>`;
        } else if (timestamp < 1550786400000)
        {
            dayElem.classList.add('has-event');
            dayElem.innerHTML = `<span class="event-day">${dayElem.textContent}</span><div class="aside event-dd-mark"></div><div class="user-event-mark"></div>`;
        } else if (timestamp < 1551132000000) {
            dayElem.classList.add('has-event');
            dayElem.innerHTML = `<span class="event-day">${dayElem.textContent}</span></div><div class="aside event-group-mark"></div><div class="user-event-mark"></div>`;
        } else if (timestamp === 1551218400000)
        {
            dayElem.classList.add('has-event');
            dayElem.innerHTML = `<span class="event-day">${dayElem.textContent}</span><div class="aside event-dd-mark"></div><div class="user-event-mark"></div>`;
        } else if (timestamp === 1551304800000)
        {
            dayElem.classList.add('has-event');
            dayElem.innerHTML = `<div class="aside event-dd-mark">${dayElem.textContent}</div>`;
        } else if (timestamp === 1552082400000)
        {
            dayElem.classList.add('has-event');
            dayElem.innerHTML = `<div class="aside event-group-mark">${dayElem.textContent}</div>`;
        } else if (timestamp === 1551736800000)
        {
            dayElem.classList.add('has-event');
            dayElem.innerHTML = `<div class="aside user-event-mark">${dayElem.textContent}</div>`;
        }
    }

    render()
    {
        const {date} = this.state;
        return (
            <div className="d-flex">

                <Menu />
                
                <div className="user-middle">
                    
                    <section className="schedule">
                        <div className="schedule-header">
                               <div className="schedula-title">
                                   <small>JANUARY 2019</small>
                                </div>
                                <div className="schedule-change">

                                    <span className="fa fa-angle-right" aria-hidden="true"></span>
                                    <span className="fa fa-angle-left" aria-hidden="true"></span>
                                </div>
                            </div>


                        <div className="schedule-canlendar">
                            <Flatpickr 
                                onDayCreate={this.onDayCreated.bind(this)}
                                data-inline
                                value={date}
                                onChange={date => { this.setState({date}) }} />
                        </div>
                            
                        <div className="schedule-event">
                            <div className="create-event">
                                <div className="schedule-group">
                                    <span></span>Group
                                </div>
                                <div className="schedule-dudes">
                                    <span></span>
                                    Dudes
                                </div>
                                <div className="schedule-me">
                                    <span></span>
                                    Me
                                </div>

                                <button className="dd-btn btn-sm btn-full">Create Event</button>
                            </div>
                                <div className="schedule-contents">

                                    <div className="schedule-content withgroup">
                                        <h3>22 Jan 2019</h3>
                                        <div className="schedule-content-line">
                                            <div className="title">Event Owner </div> <span>:</span> <div className="content">Counter Strike Official</div>
                                            <div className="title">Event Title </div> <span>:</span> <div className="content">Middle East Champions</div>
                                            <div className="title">Web Site	</div> <span>:</span> <div className="content">www.steam.com</div>
                                            <div className="title">Description <br />  <small><span className="fa fa-minus" aria-hidden="true"></span>Leave Event</small>	</div> <span>:</span> <div className="long-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Etiam a turpis interdum, interdum orci ac, sagittis nisl. I
                                            nteger non metus augue. Quisque nunc est, laoreet id sapien dignissim
                                            sodales velit. Praesent pellentesque eu nibh vitae lobortis.</div>

                                        </div>
                                    </div>
                                    <div className="schedule-content withdudes">
                                        <h3>22 Jan 2019</h3>
                                        <div className="schedule-content-line">
                                            <div className="title">Event Owner </div> <span>:</span> <div className="content">Counter Strike Official</div>
                                            <div className="title">Event Title </div> <span>:</span> <div className="content">Middle East Champions</div>
                                            <div className="title">Web Site	</div> <span>:</span> <div className="content">www.steam.com</div>
                                            <div className="title">Description <br />  <small >
                                                <span className="fa fa-minus" aria-hidden="true"></span>Leave Event</small>	</div> <span>:</span> <div className="long-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Etiam a turpis interdum, interdum orci ac, sagittis nisl. I
                                            nteger non metus augue. Quisque nunc est, laoreet id sapien dignissim
                                            sodales velit. Praesent pellentesque eu nibh vitae lobortis.</div>

                                        </div>
                                    </div>
                                    <div className="schedule-content withme">
                                        <h3>22 Jan 2019</h3>
                                        <div className="schedule-content-line">
                                            <div className="title">Event Owner </div> <span>:</span> <div className="content">Counter Strike Official</div>
                                            <div className="title">Event Title </div> <span>:</span> <div className="content">Middle East Champions</div>
                                            <div className="title">Web Site	</div> <span>:</span> <div className="content">www.steam.com</div>
                                            <div className="title">Description <br />  <small><span className="fa fa-minus" aria-hidden="true"></span>Leave Event</small>	</div> <span>:</span> <div className="long-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Etiam a turpis interdum, interdum orci ac, sagittis nisl. I
                                            nteger non metus augue. Quisque nunc est, laoreet id sapien dignissim
                                            sodales velit. Praesent pellentesque eu nibh vitae lobortis.</div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                </div>

            </div>
        )
    }
}