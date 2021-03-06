import React, {useEffect, useState} from 'react'
import './Sorting.css'
import {Formik, Form, Field} from 'formik'
import {actions, AppStateType, SorterType} from '../REDUX'
import {useDispatch, useSelector} from 'react-redux'

const Sorting: React.FC = () => {
    const dispatch = useDispatch()
    const setSorter = (LocalSorter: SorterType) => {
        dispatch(actions.setSorter(LocalSorter))
    }
    const handleSubmit = (e: any) => {
        getSorterFromForm(e.target.name, e.target.value)
    }
    const sorter = useSelector((state: AppStateType) => state.sorter)
    const sorted = useSelector((state: AppStateType) => state.sorted) // to get less airline price

    const [lessAirlinePrice0, setLAP0] = useState(0)
    const [lessAirlinePrice1, setLAP1] = useState(0)

    const getSorterFromForm = (name: string, values: any) => {
        if (values === 'true') {
            values = false
        } else if (values === 'false') {
            values = true
        }
        let actualSorter = sorter
        switch (name) {
            case 'sort':
                actualSorter = {...actualSorter, sort: values}
                break
            case 'transfer0':
                actualSorter = {...actualSorter, transfer0: values}
                break
            case 'transfer1':
                actualSorter = {...actualSorter, transfer1: values}
                break
            case 'price_from':
                actualSorter = {...actualSorter, price_from: Number(values)}
                break
            case 'price_to':
                actualSorter = {...actualSorter, price_to: Number(values)}
                break
            case 'airline0':
                actualSorter = {...actualSorter, airline0: values}
                break
            case 'airline1':
                actualSorter = {...actualSorter, airline1: values}
                break
            default:
        }
        if ({...actualSorter} !== {...sorter}) {
            setSorter(actualSorter)
        }
    }

    useEffect(() => { // less airline price
        let actualSorted0 = [...sorted].filter(function (f) {
            return f.flight.carrier.uid === 'LO'
        })
        let actualSorted1 = [...sorted].filter(function (f) {
            return f.flight.carrier.uid === 'SU1'
        })
        actualSorted0 = [...actualSorted0].sort(function (a: any, b: any) {
            return a.flight.price.total.amount - b.flight.price.total.amount
        })
        actualSorted1 = [...actualSorted1].sort(function (a: any, b: any) {
            return a.flight.price.total.amount - b.flight.price.total.amount
        })
        setLAP0(actualSorted0[0].flight.price.total.amount)
        setLAP1(actualSorted1[0].flight.price.total.amount)
    }, [])


    return <aside>
        <Formik
            initialValues={sorter}
            onSubmit={handleSubmit}>
            {() => (
                <Form className='sorting__container'>
                    <div className='s__items'>
                        <h4>??????????????????????</h4>
                        <label><Field type="radio" name='sort' value='increase' onClick={handleSubmit}/>- ???? ??????????????????????
                            ????????</label>
                        <label><Field type="radio" name='sort' value='decrease' onClick={handleSubmit}/>- ???? ????????????????
                            ????????</label>
                        <label><Field type="radio" name='sort' value='duration' onClick={handleSubmit}/>- ???? ?????????????? ??
                            ????????</label>
                    </div>
                    <div className='s__items'>
                        <h4>??????????????????????</h4>
                        <label><Field type="checkbox" name='transfer0' onClick={handleSubmit}/>- ?????? ??????????????????</label>
                        <label><Field type="checkbox" name='transfer1' onClick={handleSubmit}/>- 1 ??????????????????</label>
                    </div>
                    <div className='s__items'>
                        <h4>????????</h4>
                        <label>???? <Field className='s__price' type='number' name='price_from' min={0}
                                         onBlur={handleSubmit}/></label>
                        <label>???? <Field className='s__price' type='number' name='price_to' min={0}
                                         onBlur={handleSubmit}/></label>
                    </div>
                    <div className='s__items'>
                        <h4>????????????????????????</h4>
                        <div className='row'><label className='s__airline__label'><Field type="checkbox" name='airline0' onClick={handleSubmit}/>
                            - LOT Polish Airlines </label><div className='s__airline__price'> ???? {lessAirlinePrice0} ??.</div></div>
                        <div className='row'><label className='s__airline__label'><Field type="checkbox" name='airline1' onClick={handleSubmit}/>
                            - ???????????????? - ???????????????????? ?????????????????? </label><div className='s__airline__price'> ???? {lessAirlinePrice1} ??.</div></div>
                    </div>
                </Form>
            )}
        </Formik>
    </aside>
}

export default Sorting