import update from 'react-addons-update'
import * as types from './actionsTypesEdit'

const initialState = {
  attributes: '',
  // attribute: { attributeName: '', attributeType: ''},
  attributeName: '',
  attributeType: '',
  entityName: ''
}

export function addAttributeInitialEditComponent(attribute) {
  return { type: types.ADD_ATTRIBUTE_SUCCESS_INITIAL_EDIT, payload: attribute };
}
export function addAttributeEditComponent(attribute) {
	return { type: types.ADD_ATTRIBUTE_SUCCESS_EDIT, payload: attribute };
}
export function updateAttributeNameEditComponent(attributeName) {
	return { type: types.UPDATE_ATTRIBUTE_NAME_EDIT, payload: attributeName };
}
export function updateAttributeTypeEditComponent(attributeType) {
	return { type: types.UPDATE_ATTRIBUTE_TYPE_EDIT, payload: attributeType };
}
export function deleteAttributeEditComponent(indexOfAttrToDelete) {
	return { type: types.DELETE_ATTRIBUTE_EDIT, payload: indexOfAttrToDelete }
}
export function updateEntityNameEditComponent(entityName) {
    return { type: types.UPDATE_ENTITY_NAME_EDIT, payload: entityName };
}
// export function clearEntityInTemp() {
// 	return { type: types.CLEAR_ENTITY};
// }
export function clearAllAttributesEditComponent() {
	return { type: types.CLEAR_ALL_ATTRIBUTES_EDIT};
}


export default function reducer(state = initialState, action) {
  let { type, payload } = action

  switch(type) {
    case types.ADD_ATTRIBUTE_SUCCESS_INITIAL_EDIT: 
      return update(state, { attributes: { $set: payload } });

    case types.ADD_ATTRIBUTE_SUCCESS_EDIT: 

      return update(state, { attributes: { $push: [payload] }, attributeName: {$set: ''}, attributeType: {$set: ''}});

    case types.UPDATE_ATTRIBUTE_NAME_EDIT:
      return update(state, { attributeName: { $set: payload } });

    case types.UPDATE_ATTRIBUTE_TYPE_EDIT:
      return update(state, { attributeType: { $set: payload } });
    
    case types.DELETE_ATTRIBUTE_EDIT:
      return update(state, { attributes: { $splice: [[payload, 1]] } });

    case types.UPDATE_ENTITY_NAME_EDIT:
      return update(state, { entityName: { $set: payload } });

    case types.CLEAR_ENTITY_EDIT:
      return update(state, { entityName: { $set: '' }, attributes: { $set: []} });

    case types.CLEAR_ALL_ATTRIBUTES_EDIT:
      return update(state, { attributes: { $set: []} });
      
    default: 
      return state;
  }

}
