import React, { Component } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from 'daypilot-pro-react';

const styles = {
    wrap: {
        display: "flex"
    },


}
class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewType: "Day",
            durationBarVisible: false,
            timeRangeSelectedHandling: "Enabled",
            onTimeRangeSelected: args => {
                let dp = this.calendar;
                DayPilot.Modal.prompt("Create a new event:", "Event 1").then(function (modal) {
                    dp.clearSelection();
                    if (!modal.result) { return; }
                    dp.events.add(new DayPilot.Event({
                        start: args.start,
                        end: args.end,
                        id: DayPilot.guid(),
                        text: modal.result
                    }));
                });
            },
            eventDeleteHandling: "Update",
            onEventClick: args => {
                let dp = this.calendar;
                DayPilot.Modal.prompt("Update event text:", args.e.text()).then(function (modal) {
                    if (!modal.result) { return; }
                    args.e.data.text = modal.result;
                    dp.events.update(args.e);
                });
            }
        }
    }

    getEventItems() {
        axios.get('http://localhost:3001/events')
            .then(response => {
                this.setState({ events: response.data });
                console.log(this.state);
            })
    }

    componentDidMount() {
        // this.getEventItems();
        this.setState({
            events: [
                {
                    id: 1,
                    text: "Event 1",
                    start: "2021-09-13T10:30:00",
                    end: "2021-09-13T13:00:00"
                },
                {
                    id: 2,
                    text: "Event 2",
                    start: "2021-09-14T09:30:00",
                    end: "2021-09-14T11:30:00",
                    backColor: "#38761d"
                },
                {
                    id: 2,
                    text: "Event 3",
                    start: "2021-09-14T12:00:00",
                    end: "2021-09-14T15:00:00",
                    backColor: "#cc4125"
                }
            ]
        })
    }

    render() {
        const { ...config } = this.state;
        return (
            <div className="main-page-wrapper">
                <div className='main-page'>
                    <div className='navigator'>
                        <DayPilotNavigator
                            selectMode={"day"}
                            showMonths={1}
                            skipMonths={1}
                            onTimeRangeSelected={args => {
                                this.setState({
                                    startDate: args.day
                                })
                            }}
                            cssClassPrefex="default"


                        />
                    </div>
                    <div className="calendar">
                        <DayPilotCalendar
                            {...config}
                            heightSpec="Full"
                            ref={component => {
                                this.calendar = component && component.control
                            }}

                        />
                    </div>

                </div>
            </div >
        )
    }
}

export default MainPage;