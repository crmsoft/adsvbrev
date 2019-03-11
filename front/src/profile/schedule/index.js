import React,{Component} from 'react';
import Flatpickr from 'react-flatpickr';
import {connect} from 'react-redux';
import {
    load,
    setDay
} from './store/events';
import {Redirect} from 'react-router-dom';
import {DateTime} from 'luxon';

class ProfileScheduleComponent extends Component{

    state = {
        renderPlot: false,
        ready: false
    }

    componentDidMount()
    {
        this.props.load();
    }

    componentDidUpdate()
    {
        if ( (this.state.renderPlot === false) && this.state.ready)
        {
            this.setState(() => {
                return {
                    renderPlot: true
                }
            }, () => {
                this.calendar.flatpickr  && this.calendar.flatpickr.redraw();
            });
        } // end if
    }

    static getDerivedStateFromProps(props, state)
    {
        return {
            ready: props.ready
        }
    }

    plotEvents(a,b,c,dayElem)
    {
        const {data} = this.props;

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
    
    render(){
        
        return (
            <div className="profile-schedule">
                {
                    this.props.describe ? <Redirect to={`schedule`} /> : null   
                }
                <div className="header">
                    schedule
                </div>

                <div className="block-content">

                    <Flatpickr 
                        ref={ref => { this.calendar = ref; }}
                        onDayCreate={
                            this.plotEvents.bind(this)
                        }
                        onChange={
                            (selectedDates, dateStr, instance) => {
                                
                                const selectedDate = selectedDates.pop();
                                
                                this.props.setDay(
                                    Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())    
                                );
                            }
                        }
                        data-inline
                        data-shorthand-current-month
                    />

                </div>

            </div>
        )
    }
}

const ProfileSchedule = connect(
    state => {
        return {
            ...state
        }
    },

    dispatch => {
        return {
            load: () => dispatch(load()),
            setDay: t => dispatch(setDay(t))
        }
    }
)(ProfileScheduleComponent);

export default ProfileSchedule;