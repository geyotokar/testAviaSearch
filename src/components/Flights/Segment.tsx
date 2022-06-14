import React from 'react'
import {Airline, Day, Destination, DestinationProps, Duration, Time, Transfer} from './SegmentMicroComponents'
import './Flights.css'

const Segment: React.FC<SegmentPropsType> = (props) => {
    return <div className='f__segment'>
        <Destination dCity={props.dCity}
                     aCity={props.aCity}
                     dAirport={props.dAirport}
                     dAirportUid={props.dAirportUid}
                     aAirport={props.aAirport}
                     aAirportUid={props.aAirportUid}
        />
        <div className='f__segment__departure'>
            <div><Time time={props.dTime}/> <Day time={props.dTime}/></div>
            <Duration duration={props.duration}/>
            <div><Day time={props.aTime}/> <Time time={props.aTime}/></div>
        </div>
        <Transfer transfer={props.transfer}/>
        <Airline airline={props.airline}/>
    </div>
}

export default Segment

type SegmentPropsType = DestinationProps & {
    aTime: string
    dTime: string
    duration: number
    transfer: number
    airline: string
}