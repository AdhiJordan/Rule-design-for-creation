import React, { PropTypes } from 'react';
import {Card, IconButton, CardHeader, CardText, Table, TableBody, TableRow, TableRowColumn, Dialog, FlatButton} from 'material-ui'
import 'app/css/app.css'
import classNames from 'classnames'
import EditCustomerSegment from 'views/input-fields/EditCustomerSegment';


const styles = {
	border: {
      width: 500,//250px
      float: 'left',
      overflow: 'auto',
      overflowY: 'hidden',
      border: '4px solid #00bfa5',
      marginLeft: 115,
      marginTop: -100,
	},
	header: {
		backgroundColor: '#00bfa5',
		height: 55,

	}, 
	cardText: {
		padding: 0,
        color: '#464646',
    // fontFamily: 'WorkSans',
    fontSize: 20,
    fontWeight: 'normal',

	},
	entityName: {
		fontWeight: 'bold',
		fontSize: 29,
    fontFamily: 'Work Sans',
    color: '#464646',
		position: 'relative',
		bottom: 10,
	},
	Xbtn: {
		textDecoration: 'none',	
		// fontWeight: 800,
		fontSize: 20,
		color: '#001',

	},

	dotBtn: {
		textDecoration: 'none',	
		float: 'right',
		marginRight: 10,
		marginTop: -5,
		fontWeight: 800,
		fontSize: 22,
		color: '#000',
		// position: 'relative',
		// bottom: 5,
		// content: '\f141'
	},
  tableAttribute: {
    fontSize: 20,
    fontFamily: 'Work Sans',
    fontWeight: 'normal',
  fontStyle: 'normal',
  fontStretch: 'normal',
  color: '#464646',
  }
}
export default class NewCustomerSegment extends React.Component {
		constructor(props, context) {
        super(props, context);
          this.state = {
             open: false,
             showCard: true,
          };
          this.handleOpen = this.handleOpen.bind(this);
          this.handleClose = this.handleClose.bind(this);
          this.editEntity = this.editEntity.bind(this);
          // this.updateEntity = this.updateEntity.bind(this);
          this.showCardToggle = this.showCardToggle.bind(this);
          this.deleteEntity = this.deleteEntity.bind(this);

}
// componentWillUpdate() {
// 	this.setState({showCard: true})
// }
  handleOpen(e) {
  	e.preventDefault()
     if(this.props.opacity.opacity === 0.5) {
      return ''
     }
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }
  editEntity(e) {
    e.preventDefault()
    
    if(this.props.opacity.opacity === 0.5) {
      return ''
    }
    this.setState({showCard: !this.state.showCard})
    this.props.toggleEntity()    
    this.props.hideNewCard()
 
  }
  // updateEntity() {
  // 	this.setState({showCard: !this.state.showCard})
  // 	this.props.updateEntity
  // }
  
  deleteEntity() {
    this.props.deleteEntity()
    this.handleClose()
  }
   showCardToggle() {
    this.setState({showCard: true})
  }

	render() {
     const {customer, deleteEntity, opacity, hideNewCard } = this.props  
     console.log(customer);
      const btns = [
      <FlatButton
        label="NO"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="YES"
        primary={true}
        onTouchTap={this.deleteEntity}
        // handleClose()
      />,
    ];
   let editBtn = classNames({
            'glyphicon': true,
            'glyphicon-pencil': true,
            'editBtn': true,
            'editBtnHideNewCart': opacity.opacity === 0.5
        })
                let delBtn = classNames({
            'glyphicon': true,
            'glyphicon-remove': true,
            'delBtn': true,
            'delBtnHideNewCart': opacity.opacity === 0.5
        })
	return (
		<div>
		{this.state.showCard ? 
		<Card style={Object.assign(styles.border, opacity)}>
		<CardHeader style={styles.header}>
		    <span style={styles.entityName}>{customer.newCustomerSegment}</span>
		     <div className="editDelBtn">
         <span className={delBtn} onClick={this.handleOpen}></span>&emsp;
        <span className={editBtn} onClick={this.editEntity}></span>
        
        </div>
        <Dialog
          title="ARE YOU SURE??"
          actions={btns}
          modal={true}
          open={this.state.open}
        >
        </Dialog>
    </CardHeader>
        <CardText style={styles.cardText}>
        <Table>
        <TableBody displayRowCheckbox={false}>
        <TableRow>
        <TableRowColumn style={styles.tableAttribute}>AGE &emsp;&emsp;&emsp;&emsp;
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        {customer.ageBetween}-{customer.ageTo}yrs
        </TableRowColumn>
        </TableRow> 

        
        <TableRow>

        <TableRowColumn style={styles.tableAttribute}> 
        <div className="locationDown">
        Location
        </div> {customer.location.map(field =>
          <div className="displayList">
         <li>
         <ul> {field.sample}
         </ul>
         </li>
         </div>
          )}
        </TableRowColumn>
        </TableRow>

        <TableRow>
        <TableRowColumn style={styles.tableAttribute}>GENDER &emsp;&emsp;&emsp;&emsp;
        &emsp;&emsp;&emsp;&emsp;&emsp;
        {customer.gender}
        </TableRowColumn>
        </TableRow>

        <TableRow>
        <TableRowColumn style={styles.tableAttribute}>SPENDS &emsp;&emsp;&emsp;&emsp;
        &emsp;&emsp;&emsp;&emsp;&emsp;INR&emsp;
        {customer.spendsBetween}-{customer.spendsTo}
        </TableRowColumn>
        </TableRow>
        </TableBody>
        </Table>
        </CardText> 
        </Card> : <EditCustomerSegment customerdata={customer} showCardToggle={this.showCardToggle} hideNewCard={hideNewCard}/> }
  </div>
       
	);
}
};


NewCustomerSegment.propTypes = {
    // dispatch: PropTypes.func.isRequired,
    entity: PropTypes.object.isRequired,
    deleteEntity: PropTypes.func.isRequired
};

