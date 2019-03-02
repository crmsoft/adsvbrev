import React, {Component} from 'react';
import Menu from '../menu';
import Flatpickr from 'react-flatpickr';
import profileScheduleStore from '../profile/schedule/store';
import { setDay } from '../profile/schedule/store/events';
import CreateEvent from './CreateEvent';
import axios from 'axios';
import Event from './Event';
import {DateTime} from 'luxon';

export default class Schedule extends Component {
    
    constructor(...props) {
        super(...props);
        
        this.state = {
            date: new Date(),
            schedule: profileScheduleStore.getState(),
            events: []
        };
    }

    componentDidMount()
    {
        profileScheduleStore.dispatch(setDay(null));
        
        let {describe} = this.state.schedule;
        this.describe(describe = describe ? describe : ((new Date).getTime()))
        
    }

    describe(describe)
    {
        axios.get(`/event/${describe}`).then(
            ({data}) => {
                this.setState(() => {
                    return {
                        events: data.data
                    }
                })
            }
        )
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
        const {data} = this.state.schedule;

        const date = DateTime.fromJSDate(dayElem.dateObj);
        
        let t = date.toISODate();

        let found = data.filter(item => {
            return item.start === t
        });
        
        if (found.length)
        {
            const marks = document.createElement("div");
            marks.className = 'marks';
            const withDudes = document.createElement('span');
            withDudes.className = 'mark with-dudes';
            marks.appendChild(
                withDudes
            );
    
            const withGr = document.createElement('span');
            withGr.className = 'mark with-group';
            marks.appendChild(
                withGr
            );
    
            dayElem.innerHTML = `<span>${dayElem.textContent}</span>${marks.outerHTML}`;
        }// end if
    }

    describeChanged(dates)
    {
        const date = dates.pop();
        this.describe(
            Date.UTC(
                date.getFullYear(), date.getMonth(), date.getDate()
            )
        );    
    }

    render()
    {
        const {date, events} = this.state;
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
                                onChange={this.describeChanged.bind(this)}
                                onDayCreate={this.onDayCreated.bind(this)}
                                data-inline
                                value={date} />
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

                                <CreateEvent />
                            </div>
                                <div className="schedule-contents">

                                    {
                                        events.map(event => <Event data={event} />)
                                    }
                                    
                                </div>
                            </div>
                        </section>

                </div>

            </div>
        )
    }
}