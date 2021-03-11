//引入创建store的模块,applyMiddleware是使用中间件的模块
import {createStore,applyMiddleware} from 'redux'
//引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'
//引入这个库可以在浏览器使用开发者工具
import {composeWithDevTools} from 'redux-devtools-extension'
//引入汇总后的reducer
import reducer from './reducers'
//在这里设置使用中间件，，，
export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))