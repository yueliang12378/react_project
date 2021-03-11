//用于汇总reducer
import {combineReducers} from 'redux'

import {testReducer} from './login_reducer'
const allReducers = combineReducers({
    userInfo:testReducer
})
export default allReducers