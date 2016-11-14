import React, {PropTypes} from 'react';
import TextInput from 'views/input-fields/TextInput';
import SelectInput from 'views/input-fields/SelectInput';
import 'app/css/nested.css';
import 'app/css/single.css';
import {Checkbox} from 'material-ui'
class NotOfNested extends React.Component {
	   constructor(props, context) {
        super(props, context);      
          this.state = {
          	
             nesteds: {fetchFunction: '', operandValueNested: '', operatorFunctionNested: '', constantValueNested: ''},
             checked: false
             
        };
 this.addAttri = this.addAttri.bind(this);
 this.updateAttribute = this.updateAttribute.bind(this);
     
    }
  
 
   updateAttribute(e) {
     let data = this.state.nesteds
      let field = e.target.name
      let value = e.target.value
      if(field == 'constantValueNested') {       
    
    data['constantValueNested'] = value
       this.setState({nesteds: data})

      }
      else if(field == 'operandValueNested') {
          data['operandValueNested'] = value
          this.setState({nesteds: data})
        }
        else if(field == 'operatorFunctionNested')

          {
          data['operatorFunctionNested'] = value
          this.setState({nesteds: data})
        
      }
      else {
        if(field == 'fetchFunction')
        data['fetchFunction'] = value
          this.setState({nesteds: data})

      }
     
    
      
    }

   addAttri(e, a) {
      e.preventDefault();
      alert(a);
      console.log(this.state.nesteds);
      this.setState({checked: !this.state.checked})
       if(this.props.rule.id == undefined)
      this.props.addToNested(this.state.nesteds, a);
    }
     
	render() {   	 
		let {onClick, onChange} = this.props;
    let nesteds = this.state.nesteds


		return (
			<div>
		   		<div className="insideRectangle">
		   				<div className="RectangleClose"><a onClick={onClick}>X</a></div>
		   				<div className="RectangleNested">
		   						<img src="images/Add Nested Condition.svg" width='27' height='27' />		   						
		   				</div>
		   				<div className="textNotOfNested">NOT OF</div>	
		   				
		   				<div className="checkboxAlignment">
  						<Checkbox
              onCheck={this.addAttri}
               checked={this.state.checked}
              />
	  					
  						</div>

  							<div className="dropDown">
  						<div className="textFetchFunctionNested">FETCH FUNCTION</div>
  						<div className="dropFetchFunction">
  						<SelectInput
                 name="fetchFunction"
                 defaultOption="Function"
                 onChange={this.updateAttribute}
                 value={nesteds.fetchFunction}
                  />
		    				  </div>
  						<div className="textOperandNested">OPERAND</div>
  						<div className="dropOperandValueNested">
  						  <SelectInput
                 name="operandValueNested"
                 defaultOption="Function"
                 onChange={this.updateAttribute}
                 value={nesteds.operandValueNested}
                  />
		    				  </div>
  						<div className="textOperatorFunctionNested">OPERATOR FUNCTION</div>
  						<div className="dropOperatorFunctionNested">
  						 <SelectInput
                 name="operatorFunctionNested"
                 defaultOption="Function"
                 onChange={this.updateAttribute}
                 value={nesteds.operatorFunctionNested}
                  />
  						<div className="textConstantNested">CONSTANT</div>
  							<div className="textConstantValueNested">

  							 <TextInput
               name="constantValueNested"
               placeholder="Constant" 
               onChange={this.updateAttribute}
               value={nesteds.constantValueNested}
               />
  							</div>
		          
	  					</div>
	  					<div className="duplicateDesignNested">
	  					<a onClick={onChange}>
  						<div className="duplicateNested">
  						</div>
  						<div className="duplicateSecondNested">
  						</div>
  						</a>
  						</div>
		   	    </div>
		   	    
    		</div>
        </div>
		);
	}
}


export default NotOfNested;