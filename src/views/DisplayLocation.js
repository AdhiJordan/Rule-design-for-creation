import React, { PropTypes } from 'react';
import {Card, CardHeader, CardText, Table, TableBody, TableRow, TableRowColumn} from 'material-ui'
import 'app/css/customer.css';
const styles = {
	div1: {
		float: 'left',
		width: 200,
		height: 30,
		color: '#464646',
		fontFamily: 'Work Sans',
		fontSize: 20,
		fontWeight: 'normal',
		marginLeft: -35,
		overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        paddingBottom: 13,
	},
    	div3: {
		marginLeft: 170,
		width: 10,
		marginTop: 6,
	},
}
const DisplayLocation = ({location,  deleteAttr}) => {
  console.log(location);
	return (
		
		<div className="aa cf" >
		<div style={styles.div1}><li><ul>{location.sample}</ul></li></div>	
		<div style={styles.div3}><a className="xBtn" onClick={deleteAttr}>X</a></div>
		</div>
	
	);
};

export default DisplayLocation

