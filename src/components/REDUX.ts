import {applyMiddleware, compose, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import data from '../components/API/flights.json'

let initialState = {
    sorter: {
        sort: 'increase' as 'increase' | 'decrease' | 'duration',
        transfer0: false,
        transfer1: false,
        price_from: 0,
        price_to: 30000,
        airline0: false,
        airline1: false
    } as SorterType,
    sorted: data.result.flights as Array<any>
}

export type InitialStateType = typeof initialState

const REDUX = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'TAS/SET_SORTER':
            return {
                ...state,
                sorter: action.sorter
            }
        case 'TAS/SET_SORTED':
            return {
                ...state,
                sorted: action.sorted
            }
        default:
            return state;
    }
}

//ACTION
type ActionsType = InferActionsType<typeof actions>

export const actions = {
    setSorter: (sorter: SorterType) => ({type: 'TAS/SET_SORTER', sorter: sorter} as const),
    setSorted: (sorted: Array<any>) => ({type: 'TAS/SET_SORTED', sorted: sorted} as const)
}

//STORE
type RootReducerType = typeof REDUX
export type AppStateType = ReturnType<RootReducerType>
export type InferActionsType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
const store = createStore(REDUX, compose(applyMiddleware(thunkMiddleware)))

export default store

// TYPES
export type SorterType = {
    sort?: string
    transfer0?: boolean
    transfer1?: boolean
    price_from?: number
    price_to?: number
    airline0?: boolean
    airline1?: boolean
}