import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {createSelector} from 'reselect'
import {bindDispatch} from 'common/util/redux'
import { browserHistory } from 'react-router';
import {RaisedButton} from 'material-ui'
import {Dialog, Paper, TextField} from 'material-ui';
import {FlatButton} from 'material-ui';
import 'app/css/app.css';
import EntityName from 'views/input-fields/EntityName' ;
import DisplayAttribute from 'views/DisplayAttribute'
import AttributeForm from 'views/AttributeForm'
import classNames from 'classnames'
import NewCart from './NewCart'
import _ from 'lodash' 
import Ajv from 'ajv'
import entitySchema from 'schema/entity'

var ajv = Ajv({allErrors: true});
var validate = ajv.compile(entitySchema);

const styles = {
  newEntityPaper: {
    width: 350,
    marginLeft: 20,
    float: 'left',
  },
  autoWidth: {
   maxWidth: '300%',
   marginTop: 20,
   width: '150%',
   boxSizing: 'content-box',
  },
  newCard: {
    float: 'left',
    opacity: 0.5,
  },
  attributeForm: {
    backgroundColor: '#E0E0E0',
  },
  addBtn: {
    backgroundColor: '#00bfa5',
    color: '#fff',
  },
  addLabel: {
    fontFamily: 'Work Sans',
  }
};

const iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?~`";

class HomePage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            entityNameError: '',
            attributeNameError: '',
            attributeTypeError: '',
            attributeVisible: true,
            adding: false,
            toggleEntity: false,
            opacity: 1
        };
        this.updateEntityName = this.updateEntityName.bind(this);
        this.hideAttribute = this.hideAttribute.bind(this);
        this.updateAttribute = this.updateAttribute.bind(this);
        this.addAttribute = this.addAttribute.bind(this);
        this.deleteAttr = this.deleteAttr.bind(this);
        this.saveEntity = this.saveEntity.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.deleteEntity = this.deleteEntity.bind(this);
        this.toggleEntity = this.toggleEntity.bind(this);
        this.toggleEntityFromNewCard = this.toggleEntityFromNewCard.bind(this);
        this.hideNewCard = this.hideNewCard.bind(this);

    }
    updateEntityName(e) {
     
      
        let value = e.target.value;
        for(let i = 0; i<value.length; i++) {

           if(iChars.indexOf(value[i]) != -1) {
            this.props.actions.updateEntityName(value.trim().toUpperCase())
            this.setState({entityNameError: 'special character not allowed!!' });
            return ''
           }
        }
        this.props.actions.updateEntityName(value.trim().toUpperCase())
        this.setState({entityNameError: ''});


    }
    hideAttribute(e) {
        e.preventDefault();
        if(this.props.newComponent.entityName.length === 0) {
          return ''
        }
        this.setState({attributeVisible: false});
    }
    updateAttribute(e) {
     
      let field = e.target.name
      let value = e.target.value
      if(field == 'attributeName') {
       for(let i = 0; i<value.length; i++) {
         if(iChars.indexOf(value[i]) != -1) {
          this.props.actions.updateAttributeName(value.trim().toLowerCase())
          this.setState({ attributeNameError: 'special character not allowed!!' });
          return ''
         }
       }
      this.props.actions.updateAttributeName(value.trim().toLowerCase())
       this.setState({attributeNameError: ''})

      }
      else {
        
        if(value != '') {
          this.setState({attributeTypeError: ''});
        }
          let attribute = this.state.attribute
          this.props.actions.updateAttributeType(value.trim())
          this.setState({attributeTypeError: ''})
        }
      
    }
 
    attributeIsValid() {
      let attributeValid = true
      let attributeNameError = this.state.attributeNameError
      let attributeTypeError = this.state.attributeTypeError
      debugger;
      if((this.props.newComponent.attributeName).trim() === "" && this.props.newComponent.attributeType === "") {
            this.setState({attributeNameError: 'Required!!', attributeTypeError: 'select this!!' });
           attributeValid = false
       }
      else if((this.props.newComponent.attributeName).trim() === "") {
        this.setState({attributeNameError: 'Required!!' });
         attributeValid = false
      }
      else if(this.props.newComponent.attributeType === "") {
        debugger;
        this.setState({attributeTypeError: 'select this!!'} );
          attributeValid = false
      }
      else if(this.state.attributeNameError.length > 0 || this.state.attributeTypeError.length > 0) {
          attributeValid = false
      }
      else {
      _(this.props.newComponent.attributes).forEach((value) => {
          if(value.attributeName.toLowerCase() === this.props.newComponent.attributeName.toLowerCase()) {
            this.setState({attributeNameError: 'already exists'});
            attributeValid = false
          }
      });
    }
      return attributeValid
    }

    addAttribute(e) {
      e.preventDefault();

      if(!this.attributeIsValid()) {
        return ''
      }
      let attribute = {attributeName: this.props.newComponent.attributeName.toLowerCase(), attributeType: this.props.newComponent.attributeType}
      this.props.actions.addAttribute(attribute)
    }
    deleteAttr(attr, event) {
      event.preventDefault();

      const attributes = this.props.newComponent.attributes
      const indexOfAttrToDelete = attributes.findIndex(attribute => (attribute.attributeName == attr.attributeName && attribute.attributeType == attr.attributeType))
      if(indexOfAttrToDelete > -1) {
        this.props.actions.deleteAttribute(indexOfAttrToDelete)

      }
    }

    clearAll(event) {
       event.preventDefault()
       this.props.actions.clearAllAttributes()
    }
    
    schemaValidation() {
      let entityValid = true;
      let entity = {
        "entityName": this.props.newComponent.entityName,
        "attributes": this.props.newComponent.attributes
      }
      var valid = validate(entity);


if (valid) {
  alert('entity data is valid');
} else {
  console.log('entity data is INVALID!');
  console.log(validate.errors);
  entityValid = false
}

return entityValid
    }
checkEntityName() {
 let existEntityName = false;
        _(this.props.main.entities).forEach((value) => {
          if(value.entityName.toUpperCase() === this.props.newComponent.entityName.toUpperCase()) {
            this.setState({entityNameError: 'already exists'});
            existEntityName = true;
          }
      });
        return existEntityName
}
    saveEntity() {
      if(this.checkEntityName()) {
        return ''
      }
      if(this.state.entityNameError.length > 0) {
        return ''
      }
      if(this.props.newComponent.entityName.trim() === "") {
        this.setState({entityNameError: 'Required!!'})
        return ''
      }
      if(!this.schemaValidation()) {
        alert("schema error")
        return ''
      }
      this.setState({adding: true});
      this.props.actions.createEntity(this.props.newComponent.entityName.toUpperCase(), this.props.newComponent.attributes)

      .then(() => { 
        this.props.actions.clearEntityInnewComponent()
        this.setState({adding: false, attributeNameError: '', attributeTypeError: ''}) } )
      .catch(error => {
      this.setState({adding: false});
      });

    }
    // editEntity(entityId, entityName, attributes) {

    //   const entities = this.props.main.entities
    //   const indexOfEntityToUpdate = entities.findIndex(entity => entity.id == entityId)
    //   this.props.actions.updateEntity(entityId, indexOfEntityToUpdate, entityName, attributes)

    // }
    deleteEntity(entity) {
      // event.preventDefault();
      const entities = this.props.main.entities
      const indexOfEntityToDelete = entities.findIndex(entity1 => entity1.id == entity.id)
      this.props.actions.deleteEntity(entity.id, indexOfEntityToDelete)
    }
    toggleEntity(e) {
      e.preventDefault()
      if(this.state.opacity == 0.5) {
        return ''
      }
      this.setState({toggleEntity: !this.state.toggleEntity})
    }
     toggleEntityFromNewCard() {
      this.setState({toggleEntity: true})
    }
    hideNewCard() {
       let opacity = 1;
       if(this.state.opacity === 1) {
        opacity = 0.5
       }
       this.setState({opacity: opacity})
    }

    render() {

        const { main, newComponent, actions } = this.props
        
        let entityNameError = this.state.entityNameError
        let attributeErrors = {attributeName: this.state.attributeNameError, attributeType: this.state.attributeTypeError}
        let attributeVisible = this.state.attributeVisible
        let disabled = newComponent.entityName.length === 0
        let toggleEntity = this.state.toggleEntity
        let opacity = { opacity: this.state.opacity }
        let addAttributeBtn = classNames({
          plusBtn: true,
          plusBtnHover: (newComponent.entityName.length === 0)

        })
        let toggleEntityClass = classNames({
          'toggleEntity': true,
          'toggleEntityOpacity': opacity.opacity === 0.5
        })

        return (   
        	<div style={styles.autoWidth}>
              {toggleEntity ? <a href="" className={toggleEntityClass} onClick={this.toggleEntity}><span className="glyphicon glyphicon-plus entityPlusBtn"></span></a> : 
              <Paper style={Object.assign(styles.newEntityPaper, opacity)} zDepth={2}>
              <div className="entityClose"><a href="" onClick={this.toggleEntity}>X</a></div>
              <div className="newEntity cf">
              <EntityName name="entity" label="NEW ENTITY" onChange={this.updateEntityName} value={newComponent.entityName} error={entityNameError}></EntityName>
              
              <div className="attributePart cf">
              {!(attributeVisible) && <AttributeForm onClick={this.addAttribute} onChange={this.updateAttribute} attributes={newComponent} clearAll={this.clearAll} error={attributeErrors}/> }
              {_(_.clone(newComponent.attributes)).reverse().map((attr, index) => <DisplayAttribute key={index} attribute={attr} deleteAttr={this.deleteAttr.bind(null, attr)}/>).value() }
              </div>
              <RaisedButton icon={<img src="images/tick.png" />} label={this.state.adding ? "ADDING..." : "ADD"} labelStyle={styles.addLabel} labelColor="#fff" disabled={disabled} backgroundColor="#00bfa5" onClick={this.saveEntity} />
              {attributeVisible && <div className={addAttributeBtn} onClick={this.hideAttribute}><span className="plusBtnLabel">ATTRIBUTE&nbsp;</span><span className="glyphicon glyphicon-plus plusBtnIcon"></span></div>}
              </div>  
              </Paper>
            }
              {_(_.clone(main.entities)).reverse().map(entity => <NewCart key={entity.id} style={styles.newCard} entity={entity} deleteEntity={this.deleteEntity.bind(null, entity)} toggleEntity={this.toggleEntityFromNewCard} opacity={opacity} hideNewCard={this.hideNewCard}/>).value()}
            </div>
        );
}

HomePage.propTypes = {

    main: PropTypes.object.isRequired,
    newComponent: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired

};

const selector = createSelector(
  state => state.main,
  state => state.newComponent,
  (main, newComponent) => ({ main, newComponent })
)

export default connect(selector, bindDispatch)(HomePage);
