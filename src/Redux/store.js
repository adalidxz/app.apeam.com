import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import login from './loginDucks'
import layout from './layoutDucks'
import productos from './productosDucks'
import proveedores from './proveedoresDucks'
import entradasalida from './entradasalidaDucks'
const rootReducer = combineReducers({
    login: login,
    layout:layout,
    productos:productos,
    proveedores: proveedores,
    entradasalidad: entradasalida
})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    return store;
}