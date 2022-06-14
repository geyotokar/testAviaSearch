import React from 'react'
import './App.css'
import FlightsContainer from './components/Flights/Flights'
import Sorting from './components/Sorting/Sorting'
import {Provider} from 'react-redux'
import store from './components/REDUX'

const App: React.FC = () => {
    return <Provider store={store}>
        <div className='app-wrapper'>
            <Sorting/>
            <FlightsContainer/>
        </div>
    </Provider>
}

export default App