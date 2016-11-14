import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {createSelector} from 'reselect'
import {bindDispatch} from 'common/util/redux'
import { browserHistory } from 'react-router';
import {Dialog, Paper, TextField} from 'material-ui';
import Header from 'rule/header'
import 'app/css/ruleapp.css';
import 'app/css/wizard.css';
import 'app/css/app.css';
import 'app/css/single.css';
import classNames from 'classnames'
import {RadioButton, RadioButtonGroup} from 'material-ui'
import DisplayAttribute from 'views/DisplayAttribute'
import _ from 'lodash'
import Ajv from 'ajv'
import entitySchema from 'schema/entity'
import TextInput from 'views/input-fields/TextInput';
import SelectInput from 'views/input-fields/SelectInput';
import NotSingle from 'views/input-fields/NotSingle';
import NotSingleEdit from 'views/input-fields/NotSingleEdit';
import NotOfNested from 'views/input-fields/NotOfNested';
import CustomerSegment from 'views/input-fields/CustomerSegment';
import OperandDrop from 'views/dropdown/OperandDrop';
import {RaisedButton, FlatButton} from 'material-ui'
import 'app/css/wizard.css';
import 'app/css/fresh.css';
import DisplayRuleAttribute from 'views/DisplayRuleAttribute';
import DisplaySingleAttribute from 'views/DisplaySingleAttribute';
import NotCustomer from 'views/input-fields/NotCustomer';
import EditCustomerSegment from 'views/input-fields/EditCustomerSegment';


const styles = {
  newEntityPaper: {
    width: 1279,
    marginLeft: 20,
    float: 'left',
  },
    addLabel: {
    fontFamily: 'Work Sans',
  },
   newCard: {
    float: 'left',
    opacity: 0.5,
  },
  labelStyle: {
    fontFamily: 'Work Sans',
    fontSize: 10,
    width: 130, 
    float: 'left',
  },
};

class EditNewRule extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
        	 
           arrayNested: [],
          newRule: {ruleName: this.props.rule.ruleName, entityType: this.props.rule.entityType},
          singleData: [],
          arraynot: [],
          arrayCustomer: [],
          nestedData: this.props.rule.nestedConditions,
          checked: this.props.rule.trueButton,
          rule: {operandValue: '', operatorFunction: '' , constantValue: ''}
        };
            
            this.updateAttribute = this.updateAttribute.bind(this);
            this.toggleRectangle = this.toggleRectangle.bind(this);
            this.toggleCustomer = this.toggleCustomer.bind(this);
            this.toggleSquare = this.toggleSquare.bind(this);
            this.onRemove = this.onRemove.bind(this);
            this.onRemoveFirst = this.onRemoveFirst.bind(this);
           
            this.addToSingleEdited = this.addToSingleEdited.bind(this);
            this.addToNested = this.addToNested.bind(this);
            this.radioOneChange = this.radioOneChange.bind(this);
    }

   componentWillMount() {
    let temp = this.state.singleData
   
  this.setState({singleData: temp.concat(this.props.rule.singleConditions)});

  // this.props.store.dispatch(actions.updateEntityNameEditComponent(this.props.editComponent.entityName))
}

    radioOneChange(e, value) {
  
       this.setState({checked: value})


    }
    addToSingleEdited (singles, a, index) {
            let single = this.state.singleData
          console.log(singles);
          console.log(a);
          alert("hi this edited adhithay");
          if(!a) {
            
            let singleData = this.state.singleData
            singleData.push(singles)

            this.setState({singleData: singleData});
            console.log(singleData);

            
          }
          else {
            var tempDelete = this.state.singleData.filter( s => s.operandValue !== singles.operandValue)
            this.setState({singleData: tempDelete});
          }
    }
// addToSingle(singles, a, index) { 
//           let single = this.state.singleData
//           console.log(singles);
//           console.log(a);
//           alert("hi")
//           if(!a) {
            
//             let singleData = this.state.singleData
//             singleData.push(singles)

//             this.setState({singleData: singleData});
//             console.log(singleData);

            
//           }
//           else {
//             var tempDelete = this.state.singleData.filter( s => s.operandValue !== singles.operandValue)
//             this.setState({singleData: tempDelete});
//           }
//         }
    
    addToNested(nesteds, a, index) {
      if(!a) {
        this.setState({nestedData: this.state.nestedData.concat(nesteds)});
      
      }
        else {
      
    
      var temp = this.state.nestedData.filter( n => n.operandValueNested !== nesteds.operandValueNested)
      
      
      this.setState({nestedData: temp});
      
      

    }
    }
  
   
        updateAttribute(e) {
      
     let sample = this.state.newRule
      let field = e.target.name
      let value = e.target.value
      if(field == 'ruleName') {       
    
        sample['ruleName'] = value
       this.setState({newRule: sample})

      }
      else {
        
        if(value != '') {
          sample['entityType'] = value
          this.setState({newRule: sample})
        }
         
        }
     
    }

  updateEntity(e)
  {
    alert('hitted redux');
    console.log(this.state.singleData);
  	const rule = this.state.rule
 	  const ruleId = this.props.rule.id
 	  const indexOfEntityToUpdate = rule.findIndex(rule => rule.id == ruleId)
 	  this.props.actions.updateEntity(ruleId, indexOfEntityToUpdate, this.state.newRule.ruleName, this.state.newRule.entityType, this.state.singleData, this.state.nestedData, this.state.checked)
 	 
   this.props.showCardToggle()
      this.props.hideNewCard()
 }
 
onRemove(nesteds, index) {
  var newData = this.state.arrayNested.slice();
  newData.splice(index,1);
  this.setState({arrayNested: newData});
  var deleteNested = this.state.nestedData.slice();
  deleteNested.splice(index,1);
  this.setState({nestedData: deleteNested})

}
onRemoveFirst(index) {
  
  var newInfo = this.state.arraynot.slice();
  newInfo.splice(index,1);
  this.setState({arraynot: newInfo});
  var deleteSingle = this.state.singleData.slice();
  deleteSingle.splice(index,1);
  this.setState({singleData: deleteSingle})
   console.log(this.state.singleData);
}
   
   toggleRectangle(e) {

      let temp = this.state.singleData
      console.log('data flows');
     	console.log(this.state.singleData);
      console.log(temp);
     this.setState({singleData: temp.concat(<NotSingleEdit
              rule={this.state.rule} 
              onClick={this.onRemoveFirst}
              onChange={this.toggleRectangle} 
              addToSingleEdited = {this.addToSingleEdited}
              new={true}
              />)})
     
    
        }
    toggleSquare(e) {
     let sample = this.state.arrayNested
      
      this.setState({arrayNested: sample.concat(<NotOfNested onClick={this.onRemove} onChange={this.toggleSquare} addToNested = {this.addToNested} />)});
        }
    toggleCustomer(e) {
          
          let fact = this.state.arrayCustomer
          
          this.setState({arrayCustomer: fact.concat(<CustomerSegment />)});
       
        }
    revertEntity() {
       
      this.props.showCardToggle()
      this.props.hideNewCard()

    }


        render() {
          
        	const {rule, showCardToggle} = this.props
        	console.log(rule);
          console.log(rule.singleConditions);
          console.log("this.state.arraynot")
          console.log(this.state.arraynot)
        	let newRule = this.state.newRule
       

     
        	return (
        		<div>
        				 <div className="paperDown">
              <Paper style={Object.assign(styles.newEntityPaper)} zDepth={2}>
              <div className="entityClose"><a href="" onClick={this.toggleEntity}>X</a></div>              
                  



  <div>
           <div className="cf">
           <form className="attributeForm aa">
           <div className="newLabel">NEW RULE</div>
           <div className="newText">
           <TextInput

         name="ruleName"
         placeholder="Rule Name" 
         onChange={this.updateAttribute}
         value={newRule.ruleName}
         />
         </div>
          <div className="newLabel">FOR WHICH ENTITY?</div>
          <div className="newSelect">
        <SelectInput
         name="entityType"
         defaultOption="Entity Type"
         onChange={this.updateAttribute}
         value={newRule.entityType} 
         />
         </div>
       </form>
       </div>
  <div>
        <div className="threeButtons">
          
          <div className="singleFirst">
          <a onClick={this.toggleRectangle}>
              <div className="imageSingle">
                  <img src="images/Add Single Condition.svg" width='21' height='21' />
              </div>
          
              <div className="textFirst">SINGLE CONDITION</div>
          </a>

          </div>


          <div className="nestedSecond">
          <a onClick={this.toggleSquare}>
              <div className="imageNested">
              <img src="images/Add Nested Condition.svg" width='27' height='27' />
              </div>
              <div className="textSecond">NESTED CONDITION</div>
          </a>
          </div>


          <div className="customerThird">
          <a onClick={this.toggleCustomer}>
              <div className="imageCustomer">
              <img src="images/add-a-segment.svg" width='23' height='23' />
              </div>
              <div className="textThird">CUSTOMER SEGMENT</div>

          </a>
          </div>
          
          
        
        
         {this.state.singleData.map(field => <NotSingleEdit rule={field}/>)}
         {this.props.customer.map((customer, index) => <NotCustomer key={index} customer={customer} deleteCustomer={this.props.deleteCustomer.bind(null, index, customer.id)} />)}
         


        </div>
        <div className="adjustIt">
        </div>


        <div className="radioButtons">
 <RadioButtonGroup  defaultSelected="ifAllTrue" onChange={this.radioOneChange}>
  
      <RadioButton
      name="ifAllTrue"
        value="ifAllTrue"
        label="IF ALL TRUE"
        style={styles.labelStyle}

      />

          <RadioButton
      name="ifAnyTrue"
        value="ifAnyTrue"
        label="IF ANY TRUE"
        style={styles.labelStyle}
     
      />
    </RadioButtonGroup>
    </div>

      
        <div className="addButtonDisplay">
        <RaisedButton icon={<img src="images/tick.png" />} label="SAVE" labelStyle={styles.saveLabel} labelColor="#fff"  backgroundColor="#00bfa5"  onClick={this.updateEntity.bind(this)} />
			
        <FlatButton onClick={this.revertEntity} label="CANCEL" labelStyle={styles.cancelBtn}/>
      </div>
      </div> 
      {this.state.arrayCustomer}
      </div>

              </Paper>
             
              </div>
        		</div>
        		);
        }

    
}
export default EditNewRule;