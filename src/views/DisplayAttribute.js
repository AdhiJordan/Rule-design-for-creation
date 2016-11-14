import React, { PropTypes } from 'react';
import {Card, CardHeader, CardText, Table, TableBody, TableRow, TableRowColumn} from 'material-ui'
import 'app/css/app.css';

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
const DisplayAttribute = ({attribute, deleteAttr}) => {
  
	return (
		<div className="cf">
		<div className="aa cf" >
		<div style={styles.div1}>{attribute.ruleName}</div>
		<div style={styles.div1}>{attribute.entityType}</div>
		<div style={styles.div1}>{attribute.exampleType}</div>
		<div style={styles.div3}><a href="" className="xBtn" onClick={deleteAttr}>X</a></div>
		
		</div>
		</div>
	);
};

export default DisplayAttribute

