//引入legacy_createStore，专门用于创建redux中最为核心的store对象
import { legacy_createStore, applyMiddleware, combineReducers, compose } from "redux";

//负责Redux 的异步处理
import reduxThunk from "redux-thunk"

//引入为组件服务的所有reducer,并组合各个模块的reducer
import NumStatusReducer from "./NumStatus/reducer";
import ArrStatusReducer from "./ArrStatus/reducer";
const reducers = combineReducers({
    NumStatusReducer,
    ArrStatusReducer
})

//创建数据仓库store
//加上 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()是为了让浏览器的redux-dev-tools插件能正常使用
// const store = legacy_createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

// 判断有没有__REDUX_DEVTOOLS_EXTENSION_COMPOSE__这个模块
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose //rt

// 把仓库数据，浏览器redux-dev-tools，还有reduxThunk插件关联在store中
const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

export default store