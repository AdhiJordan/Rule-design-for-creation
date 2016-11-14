import React, { PropTypes } from 'react';
import {Card, CardHeader, CardText, Table, TableBody, TableRow, TableRowColumn} from 'material-ui'
import 'app/css/app.css';
import 'app/css/single.css';

import TextInput from 'views/input-fields/TextInput';
import SelectInput from 'views/input-fields/SelectInput';
import {Checkbox} from 'material-ui'
import {RadioButton, RadioButtonGroup} from 'material-ui'

const styles = {
	div1: {
		float: 'left',
		width: 140,
		color: '#464646',
		fontFamily: 'Work Sans',
		fontSize: 20,
		fontWeight: 'normal',
		marginLeft: 3,
		overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        paddingBottom: 13,
	},
    	div3: {
		float: 'left',
		width: 10,
		marginTop: 8,
	},
}

const DisplaySingleAttribute = ({rulesingle}) => { 

	return (
		<div className="cf">
		<div className="aa cf" >
		<div className="dropDown">

  						
		<div style={styles.div1}>{rulesingle.operandValue}</div>
		<div style={styles.div1}>{rulesingle.operatorFunction}</div>
		<div style={styles.div1}>{rulesingle.constantValue}</div>

		
		
		</div>
		</div>
		</div>
	);

};

export default DisplaySingleAttribute

