import React, {PropTypes} from 'react';

const NumberInput = ({name, label, onChange, placeholder, value, pattern, error}) => {
	let wrapperClass = "form-group";
	if(error && error.length >0) {
		wrapperClass += " " + "has-error";
	}
	return (
		<div className={wrapperClass}>
		   <label htmlFor={name}>{label}</label>
		   <div className="field">
		      <input 
		         type="number"
		         name={name}
		         className="form-control"
		         placeholder={placeholder}
		         value={value}
		         onChange={onChange} 
		         pattern={pattern} required/>
		         {error && <div className="alert alert-danger">{error}</div>}
		   </div>
		</div>
	);
};

NumberInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
	error: PropTypes.string
};

export default NumberInput;