import React, { PropTypes } from 'react';
import {Dialog, Paper, TextField} from 'material-ui';
import HomePage from 'pages/HomePage'
import 'app/css/app.css';
import EntityName from 'views/input-fields/EntityName' ;
import DisplayAttribute from 'views/DisplayAttribute'
import AttributeForm from 'views/AttributeForm'
import Ajv from 'ajv'
import entitySchema from 'schema/entity'
import {RaisedButton, FlatButton} from 'material-ui'
var ajv = Ajv({allErrors: true});
var validate = ajv.compile(entitySchema);
import {createSelector} from 'reselect'
import { connect } from 'react-redux';
import {bindDispatch} from 'common/util/redux'

const styles = {
  editEntity: {
    width: 350,
    
    marginLeft: 20,
    float: 'left',
  },
  cancelBtn: {
    // float: 'right',
    fontFamily: 'Work Sans',
    color: '#dc7a34',
  },
  saveLabel: {
    fontFamily: 'Work Sans',
  }
}
const iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?~`";
export default class EditComponent extends React.Component {
	constructor(props, context) {
        super(props, context);
          this.state = {
            entityNameError: '',
            attributeNameError: '',
            attributeTypeError: ''
          };
          this.updateEntityName = this.updateEntityName.bind(this);
          this.addAttribute = this.addAttribute.bind(this);
          this.updateAttribute = this.updateAttribute.bind(this);
          this.clearAll = this.clearAll.bind(this);
          this.deleteAttr = this.deleteAttr.bind(this);
          this.updateEntity = this.updateEntity.bind(this);
          this.revertEntity = this.revertEntity.bind(this);


}
componentWillMount() {
  this.props.actions.updateEntityNameEditComponent(this.props.entity.entityName);
  this.props.actions.addAttributeInitialEditComponent(this.props.entity.fields)
  // this.props.store.dispatch(actions.updateEntityNameEditComponent(this.props.editComponent.entityName))
}
addAttribute(e) {
      e.preventDefault();
      if(!this.attributeIsValid()) {
        return ''
      }
      let attribute = {attributeName: this.props.editComponent.attributeName, attributeType: this.props.editComponent.attributeType}
      this.props.actions.addAttributeEditComponent(attribute)
      // let newAttributes = this.state.attributes.concat(this.state.attribute)
      // console.log(newAttributes)
      // this.setState({attributes: newAttributes})
      this.setState({ attributeNameError: '', attributeTypeError: '' })
}
deleteAttr(attr, event) {
        event.preventDefault();

      var attributes = this.props.editComponent.attributes
      console.log(attributes)
      const indexOfAttrToDelete = attributes.findIndex(attribute => (attribute.attributeName == attr.attributeName && attribute.attributeType == attr.attributeType))
      if(indexOfAttrToDelete > -1) {
       this.props.actions.deleteAttributeEditComponent(indexOfAttrToDelete)
      }
      // attributes.splice(indexOfAttrToDelete, 1)
      // let newAttributes = attributes.filter(attribute => (attribute.attributeName != attr.attributeName ))
      // console.log(attributes)
      // this.setState({attributes: newAttributes})
    // }
}
    updateAttribute(e) {
      let field = e.target.name
      let value = e.target.value
      if(field == 'attributeName') {
       for(let i = 0; i<value.length; i++) {
         if(iChars.indexOf(value[i]) != -1) {
          this.props.actions.updateAttributeNameEditComponent(value.trim().toLowerCase())
          this.setState({attributeNameError: 'special character not allowed!!' });
          return ''
         }
       }
       // if(this.state.attribute.attributeName.length > 0 && value.trim() === "") {
       //      this.setState({attribute:{attributeName: value}, attributeNameError: 'Required!!'});
       //      return ''
       //  }
      //  let attribute = this.state.attribute
      // attribute[field] = value
      this.props.actions.updateAttributeNameEditComponent(value.trim().toLowerCase())
       this.setState({attributeNameError: ''})

      }
      else {
        
        if(value != '') {
          this.setState({attributeTypeError: ''});
        }

      this.props.actions.updateAttributeTypeEditComponent(value)
       // this.setState({attribute: attribute})
        }
      
    }
    updateEntityName(e) {
              let value = e.target.value;
        for(let i = 0; i<value.length; i++) {

           if(iChars.indexOf(value[i]) != -1) {
            this.props.actions.updateEntityNameEditComponent(value.trim().toUpperCase());
          this.setState({entityNameError: 'special character not allowed!!' });
          return ''
        }
        }
        if(this.props.editComponent.entityName.length > 0 && value.trim() === '') {
          this.props.actions.updateEntityNameEditComponent(value.trim())
            this.setState({entityNameError: 'Required!!'});
            return ''
        }
              
        this.props.actions.updateEntityNameEditComponent(value.trim().toUpperCase())

         // if(!this.checkEntityName()) {
         //          this.setState({entityNameError: ''});
         // }
         this.setState({entityNameError: ''});

        
    }
        clearAll(event) {
       event.preventDefault();
      this.props.actions.clearAllAttributesEditComponent()
    }

        attributeIsValid() {
      let attributeValid = true
      let attributeNameError = this.state.attributeNameError
      let attributeTypeError = this.state.attributeTypeError
      if((this.props.editComponent.attributeName).trim() === "" && this.props.editComponent.attributeType === "") {
            this.setState({attributeNameError: 'Required!!', attributeTypeError: 'select this!!' });
           attributeValid = false
       }
      else if((this.props.editComponent.attributeName).trim() === "") {
        this.setState({attributeNameError: 'Required!!' });
         attributeValid = false
      }
      else if(this.props.editComponent.attributeType === "") {
        debugger;
        this.setState({attributeTypeError: 'select this!!'} );
          attributeValid = false
      }
      else if(this.state.attributeNameError.length > 0 || this.state.attributeTypeError.length > 0) {
          attributeValid = false
    }
    else {
      (this.props.editComponent.attributes).forEach((value) => {
          if(value.attributeName.toLowerCase() === this.props.editComponent.attributeName.toLowerCase()) {
            this.setState({attributeNameError: 'already exists'});
            attributeValid = false
          }
      });
    }
      return attributeValid
    }
 

    schemaValidation() {
      let entityValid = true;
      let entity = {
        "entityName": this.props.editComponent.entityName,
        "attributes": this.props.editComponent.attributes
      }
      let valid = validate(entity);


       if (valid) {
          alert('entity data is valid');
      }
      else {
          console.log('entity data is INVALID!');
          console.log(validate.errors);
          entityValid = false
      }
return entityValid
}

checkEntityName() {
 let existEntityName = false;
 // let entities = this.props.main.entities.filter(entity => entity.entityName !== this.props.editComponent.entityName)
        _(this.props.main.entities).forEach((value) => {
          if(value.entityName.toUpperCase() === this.props.editComponent.entityName.toUpperCase() && value.id !== this.props.entity.id) {
            this.setState({entityNameError: 'already exists'});
            existEntityName = true;
          }
      });
        return existEntityName
}
    updateEntity() {
      if(this.checkEntityName()) {
                  return ''
      }
      if(this.state.entityNameError.length > 0) {
        return ''
      }
      if(this.props.editComponent.entityName.trim() === "") {
        this.setState({entityNameError: 'Required!!'})
        return ''
      }

           if(!this.schemaValidation()) {
        alert("schema error")
        return ''
      }
      const entityId = this.props.entity.id
      const entities = this.props.main.entities
      const indexOfEntityToUpdate = entities.findIndex(entity => entity.id == entityId)

      this.props.actions.updateEntity(entityId, indexOfEntityToUpdate, this.props.editComponent.entityName, this.props.editComponent.attributes)
      this.props.showCardToggle()
      this.props.hideNewCard()
  

    }

    // revertEntity() {
    //   // this.setState({entityName: entityName, attributes: attributes})
    //   this.props.showCardToggle()
    //   this.props.hideNewCard()

    // }

	render() {
		const {entity, showCardToggle, editComponent} = this.props

    let entityNameError = this.state.entityNameError
    let attributeErrors = {attributeName: this.state.attributeNameError, attributeType: this.state.attributeTypeError}
    let disabled = (editComponent.entityName.length === 0);
		return (
			<div>
			<Paper style={styles.editEntity} zDepth={2}>
      <div className="newEntity cf">
			   <EntityName name="entityOld" label="ENTITY" onChange={this.updateEntityName} value={editComponent.entityName} error={entityNameError} />
			   
			   <AttributeForm onClick={this.addAttribute} onChange={this.updateAttribute} attributes={editComponent} clearAll={this.clearAll} error={attributeErrors}/>
			
			{_(_.clone(editComponent.attributes)).reverse().map(field => <DisplayAttribute attribute={field} deleteAttr={this.deleteAttr.bind(null, field)}/>).value() }
      <div className="editComponentBtns">
         <RaisedButton icon={<img src="images/tick.png" />} label="SAVE" labelStyle={styles.saveLabel} labelColor="#fff" disabled={disabled} backgroundColor="#00bfa5" onClick={this.updateEntity} />
			
         <FlatButton onClick={this.revertEntity} label="CANCEL" labelStyle={styles.cancelBtn}/>
      </div>
      </div>
			</Paper>
			</div>
		);
	}

}

// 

EditComponent.propTypes = {
    // dispatch: PropTypes.func.isRequired,
    entity: PropTypes.object.isRequired,
    editComponent: PropTypes.object.isRequired
}

const selector = createSelector(
  state => state.main,
  state => state.editComponent,
  (main, editComponent) => ({ main, editComponent })
)

export default connect(selector, bindDispatch)(EditComponent);