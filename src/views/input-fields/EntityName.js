import React, {PropTypes} from 'react'
import 'app/css/app.css'
import classNames from 'classnames';

const styles = {
	error: {
		color: 'brown',
	}
}

export default class EntityName extends React.Component {
  // constructor(props, context) {
  //        super(props, context);
 //        const state = {
 //            entityName: ''
 //        }

        render() {
        	let { name, label, value, onChange, error} = this.props

	       let wrapperClass = classNames({
      'form-group': true,
      'entityName': true,
      'has-error': error && error.length > 0
    });

        	return (
        <div className={wrapperClass}>
		   <span className="newEntityLabel">{label}</span>
		   <div className="field entityNameField">
		    
		      <input 
		         type="text"
		         name={name}
		         className="form-control"
		         value={value}
		         onChange={onChange} 
		         required/>
		         {error && <div style={styles.error}>{error}</div>}
		        
		   </div>
		</div>
        	)
        }


}