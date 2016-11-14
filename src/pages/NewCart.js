import React, { PropTypes } from 'react';
import {Card, IconButton, CardHeader, CardText, Table, TableBody, TableRow, TableRowColumn, Dialog, FlatButton} from 'material-ui'
import EditComponent from './EditComponent'
import 'app/css/app.css'
import classNames from 'classnames'
const styles = {
	border: {
      width: 350,//250px
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
export default class NewCart extends React.Component {
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
  	this.setState({showCard: !this.state.showCard})
  }
  deleteEntity() {
    this.props.deleteEntity()
    this.handleClose()
  }

	render() {
     const {entity, deleteEntity, opacity, hideNewCard} = this.props
     let showAttributeBtn = (entity.fields.length == 0)
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
          let addAttributeBtn = classNames({
          plusBtn: true,
          plusBtnHover: (opacity.opacity === 0.5)

        })


	return (
		<div>
		{this.state.showCard ? 
		<Card style={Object.assign(styles.border, opacity)}>
		<CardHeader style={styles.header}>
		    <span style={styles.entityName}>{entity.entityName}</span>
        <div className="editDelBtn">
		    <span className={editBtn} onClick={this.editEntity}></span>
        <span className={delBtn} onClick={this.handleOpen}></span>
        </div>
		    <Dialog
          title="ARE YOU SURE??"
          actions={btns}
          modal={true}
          open={this.state.open}
        >
          BY CLICKING YES, YOU WILL LOST "{entity.entityName}" Entity with {entity.fields.length} Fields!!
        </Dialog>
		</CardHeader>
        <CardText style={styles.cardText}>
        <Table>
        <TableBody displayRowCheckbox={false}>
        {showAttributeBtn && <TableRow><TableRowColumn>
          <div className={addAttributeBtn} onClick={this.editEntity}><span className="plusBtnLabel">ATTRIBUTE&nbsp;</span><span className="glyphicon glyphicon-plus plusBtnIcon"></span></div>
          
        </TableRowColumn></TableRow>}
        {entity.fields.map(field => <TableRow><TableRowColumn style={styles.tableAttribute}>{field.attributeName}</TableRowColumn> <TableRowColumn style={styles.tableAttribute}>{field.attributeType}</TableRowColumn></TableRow>)}
        </TableBody>
        </Table>
        </CardText> 
        </Card> : <EditComponent entity={entity} showCardToggle={this.showCardToggle} hideNewCard={hideNewCard}/> }
  </div>
       
	);
}
};


NewCart.propTypes = {
    // dispatch: PropTypes.func.isRequired,
    entity: PropTypes.object.isRequired,
    deleteEntity: PropTypes.func.isRequired
};

