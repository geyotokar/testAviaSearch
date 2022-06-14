import React from 'react'
import {TimeIcon} from '../assets/images/time'
import './Flights.css'

export const Blue: React.FC<T> = (props) => <div className='blue_text'>{props.v}</div>
export const Orange: React.FC<T> = (props) => <div className='orange_text'>{props.v}</div>
export const Line: React.FC = () => <div className='line'/>

export const Destination: React.FC<DestinationProps> = (props) => {
    return <div className='f__segment__destination'>
        {props.dCity}, {props.dAirport} <Blue v={'(' + props.dAirportUid + `)  → `}/>
        {props.aCity}, {props.aAirport} <Blue v={'(' + props.aAirportUid + ')'}/>
    </div>
}

export const Time: React.FC<{ time: string }> = (props) => {
    const time = props.time.substring(11, 16)
    return <div className='f__segment__departure_time'>{time}</div>
}

export const Day: React.FC<{ time: string }> = (props) => {
    const fullDate = new Date(props.time)
    const date = fullDate.getDate().toString()
    const months = ['янв.', 'фев.', 'мар.', 'апр.', 'май', 'июн.', 'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.']
    const month = months[fullDate.getMonth()]
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
    const day = days[fullDate.getDay()]
    return <Blue v={date + ' ' + month + ' ' + day}/>
}

export const Duration: React.FC<{ duration: number }> = (props) => {
    const duration = props.duration
    const min = duration % 60
    const hour = (duration - min) / 60
    return <div className='f__segment__departure_duration'>
        <TimeIcon/> {hour} ч {min} мин
    </div>
}

export const Transfer: React.FC<{transfer: number }> = (props) => {
    return <div className='f__segment__transfer'>
        {props.transfer === 1 ? <Orange v='1 пересадка'/> : <Line/>}
    </div>
}

export const Airline: React.FC <{airline: string}> = (props) => {
    return <div className='f__segment__airline'>Рейс выполняет: {props.airline}</div>
}

type T = {
    v: string
}

export type DestinationProps = {
    dCity: string
    aCity: string
    dAirport: string
    dAirportUid: string
    aAirport: string
    aAirportUid: string
}