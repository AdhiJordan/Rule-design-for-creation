import React, { PropTypes } from 'react';
import {Card, IconButton, CardHeader, CardText, Table, TableBody, TableRow, TableRowColumn, Dialog, FlatButton} from 'material-ui'
import EditNewRule from 'rule/EditNewRule';
import 'app/css/app.css'
import classNames from 'classnames'
import NotCustomer from 'views/input-fields/NotCustomer';
const styles = {
	border: {
      width: 1300,//250px
      float: 'left',
      overflow: 'auto',
      overflowY: 'hidden',
      border: '4px solid #00bfa5',
      marginLeft: 15,
      
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
export default class NewRule extends React.Component {
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
  showCardToggle() {
  	this.setState({showCard: false})
  }
  deleteEntity() {
    this.props.deleteEntity()
    this.handleClose()
  }

	render() {
     const {rule, deleteEntity, opacity, hideNewCard, arraynot} = this.props
     const {customer} =this.props
     console.log("hai adhi");
     console.log(this.props.customer);
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
		    <span style={styles.entityName}>{rule.ruleName} for {rule.entityType}</span>
		     <div className="editDelBtn">
         <span className={delBtn} onClick={this.handleOpen}></span>&emsp;
        <span className={editBtn} onClick={this.editEntity}></span>

        </div>
    </CardHeader>
        <CardText style={styles.cardText}>
        <Table>
        <TableBody displayRowCheckbox={false}>
        {rule.singleConditions.map(field => <TableRow> 
 
          <TableRowColumn style={styles.tableAttribute}>
          &emsp; NOT OF &emsp;{field.operandValue}</TableRowColumn>
           <TableRowColumn style={styles.tableAttribute}>{field.operatorFunction}
           </TableRowColumn><TableRowColumn style={styles.tableAttribute}>
           {field.constantValue}</TableRowColumn>
           <TableRowColumn></TableRowColumn></TableRow> )}

         {rule.nestedConditions.map(field => <TableRow>

          <TableRowColumn style={styles.tableAttribute}>&emsp; NOT OF &emsp;
          {field.fetchFunction}
          </TableRowColumn>
          <TableRowColumn style={styles.tableAttribute}>
          {field.operandValueNested}</TableRowColumn>
           <TableRowColumn style={styles.tableAttribute}>{field.operatorFunctionNested}
           </TableRowColumn><TableRowColumn style={styles.tableAttribute}>
           {field.constantValueNested}</TableRowColumn></TableRow>)}


          {this.props.customer.map(field => <TableRow>
            <TableRowColumn style={styles.tableAttribute}>
            <span><img src="images/segment-icon.svg" width='27' height='27' /> </span>
            {field.newCustomerSegment}</TableRowColumn>
             <TableRowColumn></TableRowColumn>
              <TableRowColumn></TableRowColumn>
               <TableRowColumn></TableRowColumn></TableRow>)}


          
       <span>{rule.trueButton}</span>
     
        </TableBody>
        </Table>
        </CardText> 
        </Card> : <EditNewRule customer={this.props.customer} deleteCustomer={this.props.deleteCustomer} rule={rule} showCardToggle={this.showCardToggle} hideNewCard={hideNewCard}/> }
  </div>
       
	);
}
};


NewRule.propTypes = {
    // dispatch: PropTypes.func.isRequired,
    entity: PropTypes.object.isRequired,
    deleteEntity: PropTypes.func.isRequired
};

