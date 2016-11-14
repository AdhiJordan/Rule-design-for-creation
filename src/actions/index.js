// Set up your root reducer here...
import { combineReducers } from 'redux';
import {routerReducer as routing} from 'react-router-redux'
import main from './mainState'
import customer from './mainCustomer'

export * from './mainState'
export * from './mainCustomer'


export default combineReducers({
 	main,
 	customer,
 	routing
 })