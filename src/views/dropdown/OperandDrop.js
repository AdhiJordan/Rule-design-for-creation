import React, {PropTypes} from 'react';
import classNames from 'classnames';

const styles = {
     dropDown: {
    // marginTop: 25,
  },
  	error: {
		color: 'brown',
	},
	defaultOption: {
		opacity: 0.5,
	}

};

const options = ['Lesser Than', 'Greater Than', 'Equals'];
const OperandDrop = ({name, label, defaultOption, onChange, values, error}) => {
  	       let wrapperClass = classNames({
      // 'form-group': true,
      'div1': true,
      'has-error': error && error.length > 0
    });

	return (

		<div className={wrapperClass}>

		   <div className="">
		      <select 
		         name={name}
		         className="form-control"
		         style={styles.dropDown} 
		         onChange={onChange}
		         values={values}
		         required>
		         <option className="defaultOption" values=""><span>{defaultOption}</span></option>
		         {options.map(option => <option values={option}>{option}</option>)}
		      </select>
          {error && <div style={styles.error}>{error}</div>}
		   </div>
		</div>
	);
};

OperandDrop.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	defaultOption: PropTypes.string
};

export default OperandDrop;