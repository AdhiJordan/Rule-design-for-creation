// Set up your root reducer here...
import { combineReducers } from 'redux';
import {routerReducer as routing} from 'react-router-redux'
import main from './mainState'
import newComponent from './newComponentState'
import editComponent from './editComponentState'

export * from './mainState'
export * from './newComponentState'
export * from './editComponentState'

export default combineReducers({
 	main,
 	newComponent,
 	editComponent,
 	routing
 })