import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {createSelector} from 'reselect'
import {bindDispatch} from 'common/util/redux'
import { browserHistory } from 'react-router';
import 'app/css/customer.css';
import AttributeSingle from 'views/AttributeSingle'
 const styles = {
  div1: {
    float: 'left',
    
    color: '#464646',
    fontFamily: 'Work Sans',
    fontSize: 20,
    fontWeight: 'normal',
    marginLeft: 160,
    marginTop: -16,
  }
}
const NotCustomer = ({customer, deleteCustomer}) => {
   console.log(customer);
		return (
		
   
			<div>
		   		<div className="inside">

              <div className="customer"><img src="images/segment-icon.svg" width='27' height='27' /></div>
              <div style={styles.div1}>{customer.newCustomerSegment}</div>
		   				<div className="firstRectangle"><a onClick={deleteCustomer}>X</a></div>
		   				
		   				
		   	    </div>
		  </div> 

    		
    
		);
}


export default NotCustomer;

