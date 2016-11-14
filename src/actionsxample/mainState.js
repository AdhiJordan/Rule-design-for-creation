import update from 'react-addons-update'
import * as types from './actionsTypesMain';
import thunk from 'redux-thunk';
import fetch from 'isomorphic-fetch';

const initialState = {
  entities: []
}

// Action Creators
export function loadEntitySuccess(entities) {

  
  return { type: types.LOAD_ENTITY_SUCCESS, payload: entities };

}

export function createEntitySuccess(entity) {
   // alert("create");

  return { type: types.CREATE_ENTITY_SUCCESS, payload: entity };
}

export function updateEntitySuccess(entityId, entity) {
  // alert("update");
  
  return { type: types.UPDATE_ENTITY_SUCCESS, payload: [entityId, entity] };
}

export function deleteEntitySuccess(entityId) {
  
  
  return { type: types.DELETE_ENTITY_SUCCESS, payload: entityId};
}

export function loadEntities() {
   return function(dispatch, getState) {
    // dispatch(beginAjaxCall());
    return fetch('http://localhost:1337/entity', {
            method: 'get',
                      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        
      
    }).then(r=>(r.json()))
    .then(entity => {
      // alert(entity)
    // alert(JSON.stringify(entity))      
    // console.log(entity)
      dispatch(loadEntitySuccess(entity)); })
  };
}
export function createEntity(entityName, attributes) {
  // alert("a");
      var data = {
        "entityName": entityName,
        "fields": _.map(attributes, attribute => ({
            "attributeName": attribute.attributeName,
            "attributeType": attribute.attributeType
        }))
    };
    // console.log(data)
    return function(dispatch, getState) {
    // dispatch(beginAjaxCall());
    console.log(getState())
    return fetch('http://localhost:1337/entity', {
            method: 'post',
                      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
      
    }).then(r=>(r.json()))
    .then(entity => {
      // alert(entity)
    // alert(JSON.stringify(entity))      
    // console.log(entity)
      dispatch(createEntitySuccess(entity)); })
  };

}

export function updateEntity(entityId, indexOfEntityToUpdate, entityName, attributes) {
  alert("a");
      var data = {
        "entityName": entityName,
        "fields": _.map(attributes, attribute => ({
            "attributeName": attribute.attributeName,
            "attributeType": attribute.attributeType
        }))
    };

    // console.log(data)
    return function(dispatch, getState) {
    // dispatch(beginAjaxCall());
    return fetch(`http://localhost:1337/entity/${entityId}`, {
            method: 'put',
                      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
      
    }).then(r=>(r.json()))
    .then(entity => {
      // alert(entity)
    // alert(JSON.stringify(entity))      
    // console.log(entity)
      dispatch(updateEntitySuccess(indexOfEntityToUpdate, entity)); })
  };

}

export function deleteEntity(entityId, indexOfEntityToDelete) {


      return function(dispatch, getState) {
    
    return fetch(`http://localhost:1337/entity/${entityId}`, {
            method: 'delete'
      
    }).then(() => 
        dispatch(deleteEntitySuccess(indexOfEntityToDelete)))
    .catch(error => {
      throw(error);
    });
  };


}






export default function reducer(state = initialState, action) {
  let { type, payload } = action

  switch(type) {
    case types.LOAD_ENTITY_SUCCESS: 
      // state.push(action.course);
      // return state;
      debugger;
      return update(state, { entities: { $set: payload } });

    case types.CREATE_ENTITY_SUCCESS:

    // return update(state, { list: { $set: payload } })
        // return [
        //    ...state,
        //    Object.assign({}, payload)
        // ];
        return update(state, { entities: { $push: [payload] }, entityName: { $set: '' }  });

    case types.UPDATE_ENTITY_SUCCESS:
    debugger;
    let result = payload[1].entityupdate[0]
        return update(state, { entities: { $splice: [[payload[0], 1, result]]} });

    case types.DELETE_ENTITY_SUCCESS:
    
        //       let result = [
    
           // let oldState = Object.assign({}, state);
           // const indexOfEmpToDelete = oldState.findIndex(entity => entity.id == payload)
        //    oldState.filter(entity => entity.id !== payload)
        // //    ...state,Object.assign({}, r)
        // // ];
                return update(state, { entities: { $splice: [[payload, 1]]} });

    default: 
      return state;
  }

}
