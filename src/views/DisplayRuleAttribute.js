import React, { PropTypes } from 'react';
import {Card, CardHeader, CardText, Table, TableBody, TableRow, TableRowColumn} from 'material-ui'
import 'app/css/app.css';
import DisplaySingleAttribute from 'views/DisplaySingleAttribute';
import DisplayNestedAttribute from 'views/DisplayNestedAttribute';


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
const DisplayRuleAttribute = ({rule}) => {
  console.log(rule);
    console.log(rule);
      console.log(rule);

	return (
		<div className="cf">
		<div className="aa cf" >

		<div style={styles.div1}>{rule.ruleName}</div>
		<div style={styles.div1}>{rule.entityType}</div>
		<div style={styles.div1}>{rule.trueButton}</div>
		



	
 {_(_.clone(rule.singleConditions)).reverse().map((attr) => <DisplaySingleAttribute  rulesingle={attr}  />).value() }
	 {_(_.clone(rule.nestedConditions)).reverse().map((attr) => <DisplayNestedAttribute  rulenested={attr}  />).value() }	
		</div>
		</div>

	);
};

export default DisplayRuleAttribute

