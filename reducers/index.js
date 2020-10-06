import {combineReducers} from 'redux'
import {shopReducer} from'./shop'

const Rootreducers=combineReducers({
    shop:shopReducer
})

export default Rootreducers