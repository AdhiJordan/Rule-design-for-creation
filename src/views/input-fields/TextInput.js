import React, {PropTypes} from 'react';
import classNames from 'classnames';

const styles = {
	error: {
		color: 'brown',
	}
}
const TextInput = ({name, label, placeholder, onChange, value, error}) => {
	// let wrapperClass = "form-group";
	       let wrapperClass = classNames({
      // 'form-group': true,
      'div1': true,
      'has-error': error && error.length > 0
    });
	return (
		<div className={wrapperClass}>
		   
		   <div className="field">
		      <input 
		         type="text"
		         name={name}
		         className="form-control"
		         placeholder={placeholder}
		         onChange={onChange}
		         value={value}
		        />
              {error && <div style={styles.error}>{error}</div>}
		   </div>
		</div>
	);
};

TextInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string
};

export default TextInput;