import React, {PropTypes} from 'react';
import TextInput from 'views/input-fields/TextInput';
import SelectInput from 'views/input-fields/SelectInput';
import 'app/css/app.css';


class AttributeForm extends React.Component {

	render() {
		let {onClick, onChange, attributes, clearAll, error} = this.props;

		return (

           <div className="cf">
           <div className="attributesCount">ATTRIBUTES[{attributes.attributes.length}]</div>
           <form className="attributeForm aa">
           <div className="newLabel">NEW</div>
           <div className="clearAll"><a href="" onClick={clearAll}>CLEAR ALL</a></div>
			<TextInput
		     name="attributeName"
		     placeholder="Rule Name" 
		     onChange={onChange}
		     value={attributes.attributeName}
		     error={error.attributeName}/>

		    <SelectInput
		     name="attributeType"
		     label="Gender"
		     defaultOption="Attribute Type"
		     onChange={onChange}
		     value={attributes.attributeType} 
		     error={error.attributeType}/>
		    <a href="" className="triangle-btn" onClick={onClick}><span className="glyphicon glyphicon-chevron-right"></span></a>
		   </form>
		   </div>


		);
	}
}

export default AttributeForm;