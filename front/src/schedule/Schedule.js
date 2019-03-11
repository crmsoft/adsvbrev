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
        document.title = `Schedule`;

        profileScheduleStore.dispatch(setDay(null));
        
        let {describe} = this.state.schedule;
        this.describe(describe = describe ? describe : ((new Date).getTime()))
        
    }

    describe(describe)
    {
        axios.get(`/event/list/${describe}`).then(
            ({data}) => {
                this.setState(() => {
                    return {
                        events: data.data,
                        date: DateTime.fromMillis(describe).toJSDate()
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
            let dudes;
            
            found.map(event => {
                if (!dudes) {   
                    var withDudes = document.createElement('span');
                    withDudes.className = `mark with-${event.type}`;
                    marks.appendChild(
                        withDudes
                    );
                    dudes = true;
                } // end if
            });
    
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

    getTitle()
    {
        const {date} = this.state;

        return DateTime.fromJSDate(date).toLocaleString({month: 'long', year: 'numeric'});
    }

    nextMonth()
    {        
        this.setState( state => {
            return {
                date: DateTime.fromJSDate(this.state.date).plus({months: 1}).toJSDate()
            }
        });
    }

    prevMonth()
    {
        this.setState( state => {
            return {
                date: DateTime.fromJSDate(this.state.date).minus({months: 1}).toJSDate()
            }
        });
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
                                   <h3>{this.getTitle.call(this)}</h3>
                                </div>
                                <div className="schedule-change">

                                    <span 
                                        onClick={this.nextMonth.bind(this)}
                                        className="fa fa-angle-right" 
                                        aria-hidden="true">></span>
                                    <span
                                        onClick={this.prevMonth.bind(this)} 
                                        className="fa fa-angle-left" 
                                        aria-hidden="true"> {`<`} </span>
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
                                        events.map(event => <Event key={event.id} data={event} />)
                                    }
                                    
                                </div>
                            </div>
                        </section>

                </div>

            </div>
        )
    }
}