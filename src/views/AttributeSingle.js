import React, {PropTypes} from 'react';
import TextInput from 'views/input-fields/TextInput';
import SelectInput from 'views/input-fields/SelectInput';
import OperandDrop from 'views/dropdown/OperandDrop';
import 'app/css/single.css';

class AttributeSingle extends React.Component {
sample(e) {
	alert('hai');
}
 
	render() { 
	let {onClick, onChange, singles, error} = this.props; 
		return (
			<div>
		   		<div className="insideFirstRectangle">
		   				<div className="firstRectangleClose"><a onClick={onClick}>X</a></div>
		   				<div className="imgRectangleSingle">
		   						<img src="images/single condition symbol.svg" width='20' height='20' />
		   						
		   				</div>
		   				<div className="textNotOf">NOT OF</div>	
		   				
		   				<div className="checkboxAlignment">
  						<input type="checkbox"  className="checkboxFiveInput"  />
	  					
  						</div>

  						<div className="dropDown">

  						<div className="textOperand">OPERAND</div>
  						<div className="dropOperand">
  						   <SelectInput
		    				 name="operandValue"
		    				 defaultOption="Attribute"
		    				 onChange={onChange}
		    				 value={singles.operandValue} 
		    				 error={error.operandValue}/>
		    				 </div>
  						<div className="textOperatorFunction">OPERATOR FUNCTION</div>
  						 <div className="dropOperator">
  						   <OperandDrop
		    				 name="operatorFunction"
		    				 defaultOption="Function"
		    				 onChange={onChange}
		    				 values={singles.operatorFunction} 
		    				 error={error.operatorFunction}/>
		    				 </div>
  						<div className="textConstant">CONSTANT</div>
  						<div className="textInputConstant">
  						 <TextInput
		    			 name="constantValue"
		    			 placeholder="Constant" 
		    			 onChange={onChange}
		    			 value={singles.constantValue}
		    			 error={error.constantValue}/>
  						</div>
	  					</div>
	  					<div>
	  					<a>
  						<div className="duplicate">
  						</div>
  						<div className="duplicateSecond">
  						</div>
  						</a>
  						</div>
		   	    </div>
		   	    
    		</div>
		);
	}
}
export default AttributeSingle;

