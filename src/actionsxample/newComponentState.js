import update from 'react-addons-update'
import * as types from './actionsTypesNew'

const initialState = {
  attributes: [],
  // attribute: { attributeName: '', attributeType: ''},
  attributeName: '',
  attributeType: '',
  entityName: ''
}
export function addAttribute(attribute) {
	return { type: types.ADD_ATTRIBUTE_SUCCESS, payload: attribute };
}
export function updateAttributeName(attributeName) {
	return { type: types.UPDATE_ATTRIBUTE_NAME, payload: attributeName };
}
export function updateAttributeType(attributeType) {
	return { type: types.UPDATE_ATTRIBUTE_TYPE, payload: attributeType };
}
export function deleteAttribute(indexOfAttrToDelete) {
	return { type: types.DELETE_ATTRIBUTE, payload: indexOfAttrToDelete }
}
export function updateEntityName(entityName) {
    return { type: types.UPDATE_ENTITY_NAME, payload: entityName };
}
export function clearEntityInnewComponent() {
	return { type: types.CLEAR_ENTITY};
}
export function clearAllAttributes() {
	return { type: types.CLEAR_ALL_ATTRIBUTES};
}


export default function reducer(state = initialState, action) {
  let { type, payload } = action

  switch(type) {
    case types.ADD_ATTRIBUTE_SUCCESS: 
    console.log(payload);
      return update(state, { attributes: { $push: [payload] }, attributeName: {$set: ''}, attributeType: {$set: ''} });

    case types.UPDATE_ATTRIBUTE_NAME:
      return update(state, { attributeName: { $set: payload } });

    case types.UPDATE_ATTRIBUTE_TYPE:
      return update(state, { attributeType: { $set: payload } });
    
    case types.DELETE_ATTRIBUTE:
      return update(state, { attributes: { $splice: [[payload, 1]] } });

    case types.UPDATE_ENTITY_NAME:
      return update(state, { entityName: { $set: payload } });

    case types.CLEAR_ENTITY:
      return update(state, { entityName: { $set: '' }, attributes: { $set: []} });

    case types.CLEAR_ALL_ATTRIBUTES:
      return update(state, { attributes: { $set: []} });

    default: 
      return state;
  }

}
