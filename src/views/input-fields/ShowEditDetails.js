import React, { PropTypes } from 'react';
import {Card, IconButton, CardHeader, CardText, Table, TableBody, TableRow, TableRowColumn, Dialog, FlatButton} from 'material-ui'
import EditNewRule from 'rule/EditNewRule';
import NewRule from 'rule/NewRule';
import 'app/css/app.css'
import {Paper} from 'material-ui';
import classNames from 'classnames'
const styles = {
	border: {
      width: 1360,//250px
      float: 'left',
      overflow: 'auto',
      overflowY: 'hidden',
      border: '4px solid #f5f5f5',
      marginLeft: 35,
      marginTop: 25,
      
	},
  newEntityPaper: {
    width: 1360,
    marginLeft: 40,
    float: 'left',
    height: 50,
    marginTop: 25,
    backgroundColor: '#f5f5f5',
  },
	header: {
		backgroundColor: '#f5f5f5',
		height: 55,
    opacity: 1,

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
		bottom: 10,
    marginTop: 5,
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
export default class ShowEditDetails extends React.Component {
		constructor(props, context) {
        super(props, context);
          this.state = {
             open: false,
             showCard: true
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
     console.log(this.props.customer.length);
     console.log(rule.singleConditions.length);

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
            let singleBtn = classNames({
            
            'singleBtn': true,

            'singleBtnHideNewCart': opacity.opacity === 0.5

        })
             let nestedBtn = classNames({
            
            'nestedBtn': true,

            'nestedBtnHideNewCart': opacity.opacity === 0.5

        })
            let customerBtn = classNames({
            
            'customerBtn': true,

            'customerBtnHideNewCart': opacity.opacity === 0.5

        })
               let singleConditionValue = classNames({
            
            'singleConditionValue': true,

            'singleConditionValueHideNewCart': opacity.opacity === 0.5

        })
                      let nestedConditionValue = classNames({
            
            'nestedConditionValue': true,

            'nestedConditionValueHideNewCart': opacity.opacity === 0.5

        })
            let CustomerSegmentValue = classNames({
            
            'CustomerSegmentValue': true,

            'CustomerSegmentValueHideNewCart': opacity.opacity === 0.5

        })

	return (
    <div>
		<div>
    
		{this.state.showCard ? 
		
     
      <Paper style={Object.assign(styles.newEntityPaper)}
                   zDepth={2}>
		    <span style={styles.entityName}>{rule.ruleName} for {rule.entityType}</span>
        <div className="overAllDesign">
        <div>
        <span className={singleBtn}>
        <img src="images/single condition symbol.svg" width='20' height='20' />
        <span className={singleConditionValue} >{rule.singleConditions.length}</span>
        </span>

        <span className={nestedBtn}>
          <img src="images/nested condition symbol.svg" width='27' height='27' /> 
           <span className={nestedConditionValue}>{rule.nestedConditions.length}</span>
        </span>

        
         <span className={customerBtn}>
          <img src="images/segment-icon.svg" width='27' height='27' /> 
           <span className={CustomerSegmentValue} >{this.props.customer.length}</span>
        </span>
       
        
		     <div className="editDelBtn">
         <span className={delBtn} onClick={this.handleOpen}></span>&emsp;
        <span className={editBtn} onClick={this.editEntity}></span>
        </div>
        </div>
     </div>
     </Paper>
    : <NewRule customer={this.props.customer} rule={rule} style={styles.newCard} deleteCustomer={this.props.deleteCustomer}
        toggleEntity={this.toggleEntityFromNewCard}
         opacity={opacity} 
         hideNewCard={this.hideNewCard}/> }
  </div>

  </div>
       
	);
}
};


ShowEditDetails.propTypes = {
    // dispatch: PropTypes.func.isRequired,
    entity: PropTypes.object.isRequired,
    deleteEntity: PropTypes.func.isRequired
};

