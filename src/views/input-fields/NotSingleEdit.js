import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {createSelector} from 'reselect'
import {bindDispatch} from 'common/util/redux'
import { browserHistory } from 'react-router';
import 'app/css/single.css';
import AttributeSingle from 'views/AttributeSingle'
import TextInput from 'views/input-fields/TextInput';
import SelectInput from 'views/input-fields/SelectInput';
import {Checkbox} from 'material-ui'
import {RadioButton, RadioButtonGroup} from 'material-ui'

class NotSingleEdit extends React.Component {
	    constructor(props, context) {
        super(props, context);      
          this.state = {
            singleCondition:[],
 //singles: {operandValue: '', operatorFunction: '' , constantValue: ''},
            singles: {
             operandValue:  this.props.rule.operandValue,
             operatorFunction: this.props.rule.operatorFunction, 
             constantValue: this.props.rule.constantValue },
             toggleValue: false,
           checked: true
            };
     this.addAttr = this.addAttr.bind(this);
     this.updateAttribute = this.updateAttribute.bind(this);
        
    }
 
   
   updateAttribute(e) {
     let data = this.state.singles
      let field = e.target.name
      let value = e.target.value
      if(field == 'constantValue') {       
    
    data['constantValue'] = value
       this.setState({singles: data})

      }
      else if(field == 'operandValue') {
          data['operandValue'] = value
          this.setState({singles: data})
        }
        else{

          if(field == 'operatorFunction')
          data['operatorFunction'] = value
          this.setState({singles: data})
        
      }
    
      
    }
   
    addAttr(e, a) {
      alert("hallo you are in edit cration");
      e.preventDefault();
      this.setState({checked: !this.state.checked})
      console.log(this.state.singles);
      this.props.addToSingleEdited(this.state.singles, a);
       alert("done");
    }
    checked() {
      if(this.props.rule.id !== undefined) 
        return true
      return !this.state.checked

    }
     
	render() {  
    let toggleChange = this.state.toggleChange
    let singles = this.state.singles
    let singleCondition = this.state.singleCondition
    let {onClick, onChange} = this.props;
    const {rule} = this.props
    console.log("rule.id");
    console.log(rule.id);
    console.log(rule);


   
		return (
			<div>	
   
			<div>
		   		<div className="insideFirstRectangle">
		   				<div className="firstRectangleClose"><a onClick={onClick}>X</a></div>
		   				<div className="imgRectangleSingle">
		   						<img src="images/single condition symbol.svg" width='20' height='20' />
		   				</div>
		   				<div className="textNotOf">NOT OF</div>	
		   				
		   				<div className="checkboxAlignment">
  						
              <Checkbox
              onCheck={this.addAttr}
               checked={this.checked()}
              />
  						</div>

  						<div className="dropDown">

  						<div className="textOperand">OPERAND</div>
  						<div className="dropOperand">
  						   <SelectInput
		    				 name="operandValue"
		    				 defaultOption="Attribute"
		    				 onChange={this.updateAttribute}
		    				 value={singles.operandValue} 
		    				 />
		    				 </div>
  						<div className="textOperatorFunction">OPERATOR FUNCTION</div>
  						 <div className="dropOperator">
  						  <SelectInput
                 name="operatorFunction"
                 defaultOption="Attribute"
                 onChange={this.updateAttribute}
                 value={singles.operatorFunction} 
                 />
		    				 </div>
  						<div className="textConstant">CONSTANT</div>
  						<div className="textInputConstant">
  						 <TextInput
		    			 name="constantValue"
		    			 placeholder="Constant" 
		    			 onChange={this.updateAttribute}
		    			 value={singles.constantValue}
		    			 />
  						</div>
	  					</div>
	  					<div>
	  					<a onClick={onChange}>
  						<div className="duplicate">
  						</div>
  						<div className="duplicateSecond">
  						</div>
  						</a>
  						</div>
		   	    </div>
		   	        		</div> 

    		</div>
    
		);
	}
}


export default NotSingleEdit;

