import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {actions, AppStateType} from '../REDUX'
import Flight from './Flight'
import './Flights.css'
import data from '../API/flights.json'

const FlightsContainer: React.FC = () => {

    const dispatch = useDispatch()
    const sorter = useSelector((state: AppStateType) => state.sorter)
    const sorted = useSelector((state: AppStateType) => state.sorted)

    const initialSorted = data.result.flights as Array<any>
    const updateSorted = () => {
        let actualSorted = initialSorted

        actualSorted = [...actualSorted].filter(function (f) {
            return f.flight.price.total.amount <= sorter.price_to! && f.flight.price.total.amount >= sorter.price_from!
        })

        if (sorter.transfer0 === true) {
            actualSorted = [...actualSorted].filter(function (f) {
                return f.flight.legs[0].segments.length === 1
            });
        }
        if (sorter.transfer1 === true) {
            actualSorted = [...actualSorted].filter(function (f) {
                return f.flight.legs[0].segments.length === 2
            });
        }
        if (sorter.airline0 === true) {
            actualSorted = [...actualSorted].filter(function (f) {
                return f.flight.carrier.uid === 'LO'
            });
        }
        if (sorter.airline1 === true) {
            actualSorted = [...actualSorted].filter(function (f) {
                return f.flight.carrier.uid === 'SU1'
            });
        }
        switch (sorter.sort) {
            case 'increase':
                actualSorted = [...actualSorted].sort(function (a: any, b: any) {
                    return a.flight.price.total.amount - b.flight.price.total.amount
                })
                break
            case 'decrease':
                actualSorted = [...actualSorted].sort(function (a: any, b: any) {
                    return b.flight.price.total.amount - a.flight.price.total.amount
                })
                break
            case 'duration':
                actualSorted = [...actualSorted].sort(function (a: any, b: any) {
                    return (a.flight.legs[0].duration - b.flight.legs[0].duration)
                })
                break
            default:
        }
        dispatch(actions.setSorted(actualSorted))
    }

    useEffect(() => { // COMPONENT UPDATE
        updateSorted()
    }, [sorter])

    return <Flights sorted={sorted}/>
}

const Flights: React.FC<{ sorted: Array<any> }> = (props) => {
    const [portion, setPortion] = useState(2)
    const stateArray: Array<any> = props.sorted.slice(0, portion)

    return <main className='flight__container'>
        {stateArray.map((f: any) => <Flight key={f.flightToken}
                                            price={f.flight.price.total.amount}
                                            departureTime1={f.flight.legs[0].segments[0].departureDate}
                                            departureCity1={f.flight.legs[0].segments[0].departureCity.caption}
                                            departureAirport1={f.flight.legs[0].segments[0].departureAirport.caption}
                                            departureAirportUid1={f.flight.legs[0].segments[0].departureAirport.uid}
                                            arrivalTime1={f.flight.legs[0].segments[0].arrivalDate}
                                            arrivalCity1={f.flight.legs[0].segments[0].arrivalCity.caption}
                                            arrivalAirport1={f.flight.legs[0].segments[0].arrivalAirport.caption}
                                            arrivalAirportUid1={f.flight.legs[0].segments[0].arrivalAirport.uid}
                                            duration1={f.flight.legs[0].segments[0].travelDuration}
                                            transfer1={f.flight.legs[0].segments[0].stops}
                                            airline1={f.flight.legs[0].segments[0].airline.caption}

                                            departureTime2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].departureDate : 'F'}
                                            departureCity2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].departureCity.caption : 'F'}
                                            departureAirport2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].departureAirport.caption : 'F'}
                                            departureAirportUid2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].departureAirport.uid : 'F'}
                                            arrivalTime2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].arrivalDate : 'F'}
                                            arrivalCity2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].arrivalCity.caption : 'F'}
                                            arrivalAirport2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].arrivalAirport.caption : 'F'}
                                            arrivalAirportUid2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].arrivalAirport.uid : 'F'}
                                            duration2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].travelDuration : 'F'}
                                            transfer2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].stops : 'F'}
                                            airline2={f.flight.legs[0].segments[1] ? f.flight.legs[0].segments[1].airline.caption : 'F'}
        />)}
        <button className='f__more' onClick={() => setPortion(portion + 2)}>Показать еще</button>
    </main>
}

export default FlightsContainer