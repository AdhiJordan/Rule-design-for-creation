import React, {PropTypes} from 'react';
import 'app/css/customer.css';
import { connect } from 'react-redux';
import {createSelector} from 'reselect'
import {bindDispatch} from 'common/util/redux'
import { browserHistory } from 'react-router';
import TextInput from 'views/input-fields/TextInput';
import LocationTextBox from 'views/TextBox/LocationTextbox';
import CustomerTextbox from 'views/TextBox/CustomerTextbox';
import SpendTextbox from 'views/TextBox/SpendTextbox';
import AgeTextbox from 'views/TextBox/AgeTextbox';
import SelectInput from 'views/input-fields/SelectInput';
import {RadioButton, RadioButtonGroup} from 'material-ui'
import classNames from 'classnames'
import {Dialog, Paper, TextField} from 'material-ui';
import {Checkbox} from 'material-ui'
import {RaisedButton, FlatButton} from 'material-ui'
import DisplayLocation from 'views/DisplayLocation';
import NewCustomerSegment from 'views/input-fields/NewCustomerSegment';
  const styles = {
    newEntityPaper: {
      width: 375,
      marginLeft: 20,
      float: 'left',
      marginTop: -135,
      opacity: 1
      },
    textField: {
      width: 100
      },
    newCard: {
      float: 'left',
      opacity: 0.5,
      },
    radio:{
      marginLeft: -100
      }
  };
    class EditCustomerSegment extends React.Component {
      constructor(props, context) {
          super(props, context);      
          this.state = {
                customerName: this.props.customerdata.newCustomerSegment,
                age: {fromAge: this.props.customerdata.ageBetween, toAge: this.props.customerdata.ageTo},
                spends: {fromSpends: this.props.customerdata.spendsBetween, toSpends: this.props.customerdata.spendsTo },
                locationPlace: "",
                location: this.props.customerdata.location,
                toggleEntity: true, 
                opacity: 1,
                checked: false,
                toggleCheckbox: true,
                toggleLocation: false,
                locationChecked: true,
                toggleGender: false,
                genderChange: true,
                toggleSpends: false,
                checked: this.props.customerdata.gender,
                spendsChange: true
                
                
                };
               this.clearEvents = this.clearEvents.bind(this);
               this.genderChange = this.genderChange.bind(this);
               this.locationChecked = this.locationChecked.bind(this);
               this.ageUpdate = this.ageUpdate.bind(this);
               this.spendUpdate = this.spendUpdate.bind(this);
               this.addChecked = this.addChecked.bind(this);               
               this.updateCustomers = this.updateCustomers.bind(this);
               this.radioOneChange = this.radioOneChange.bind(this);
               this.spendsChange = this.spendsChange.bind(this);
               this.locationUpdate = this.locationUpdate.bind(this);
               this.addLocation = this.addLocation.bind(this);
               this.deleteAttr = this.deleteAttr.bind(this);
               this.customerUpdate = this.customerUpdate.bind(this);
               this.revertEntity = this.revertEntity.bind(this);
      }
        clearEvents(e) {
       
            event.preventDefault()
            this.props.actions.clearAllAttributes();
            alert('clear all events occuring...');
        }
        updateCustomers(e) {
                e.preventDefault()
                alert('to save edit');
                let editedCustomerData = {
                  newCustomerSegment: this.state.customerName,
                  ageBetween: this.state.age.fromAge,
                  ageTo: this.state.age.toAge,
                  spendsBetween: this.state.spends.fromSpends,
                  spendsTo: this.state.spends.toSpends,
                  location: this.state.location,
                  gender: this.state.checked
                }
                  console.log(editedCustomerData);
                  console.log(this.props.customerdata.id);
                  let customerId = this.props.customerdata.id
                  let customerData = this.props.customer.customers
                  console.log(customerData);
                  let indexOfEntityToUpdate = customerData.findIndex(entity => entity.id == customerId)
                  
                  this.props.actions.updateCustomer( this.props.customerdata.id, editedCustomerData, indexOfEntityToUpdate );
                   this.props.showCardToggle()
                   this.props.hideNewCard()

        }
        deleteAttr(places, event, index) {

                var newData = this.state.location.slice();
                newData.splice(index, 1);
                this.setState({location: newData});

        }
        addLocation(e) {
          
                let location = this.state.location
                let sample = this.state.locationPlace
                this.setState({location: location.concat({sample})});
                console.log(location);
                
        }
        locationUpdate(e) {
                let value = e.target.value
                this.setState({locationPlace: value});
        }
        spendUpdate(e) {
                let spendsData = this.state.spends
                let field = e.target.name
                let value = e.target.value
                if(field == 'fromSpends'){
                  spendsData['fromSpends'] = value
                  this.setState({spends: spendsData});
                }
                else if(field == 'toSpends') {
                  spendsData['toSpends'] = value
                  this.setState({spends: spendsData});
                }
        } 
        spendsChange(e, a) {
            this.setState({spendsChange: !this.state.spendsChange});
            if(a == true) {
              this.setState({toggleSpends: !this.state.toggleSpends});
            }
            else {
              this.setState({toggleSpends: !this.state.toggleSpends}); 
            }
        }
        radioOneChange(e, value) {
            this.setState({checked: value});
        }
        genderChange(e, a) {
                this.setState({genderChange: !this.state.genderChange});
                if(a == true) {
                 this.setState({toggleGender: !this.state.toggleGender});
                }
                else {
                 this.setState({toggleGender: !this.state.toggleGender});
                }
        }
        locationChecked(e, a) {
                this.setState({locationChecked: !this.state.locationChecked});
                if(a == true){
                  this.setState({toggleLocation: !this.state.toggleLocation});
                }
                else {
                  this.setState({toggleLocation: !this.state.toggleLocation});
                } 
        }
        ageUpdate(e) {
                let ages = this.state.age
                let field = e.target.name
                let value = e.target.value
                if(field == 'fromAge'){
                  ages['fromAge'] = value
                  this.setState({age: ages});
                }
               else if(field == 'toAge') {
                  ages['toAge'] = value
                  this.setState({age: ages});
                }
        }
        customerUpdate(e) {
                  this.setState({customerName: e.target.value});
                }
        
        addChecked(e, a) {
               let age = this.state.age
               this.setState({checked: !this.state.checked});
               if(a == false) {
                  this.setState({toggleCheckbox: !this.state.toggleCheckbox});
               }
               else {
                  this.setState({toggleCheckbox: !this.state.toggleCheckbox});
               }
        }
  
        
                 revertEntity(e) {
      
                    this.props.showCardToggle()
                    this.props.hideNewCard()

        }
      
     
        render() { 
                
                const { main, customerdata, actions} = this.props
                
                console.log(customerdata);

                const {showCardToggle, hideNewCard} = this.props
                let location = this.state.location
                let locationPlace = this.state.locationPlace
                let toggleSpends = this.state.toggleSpends
                let toggleLocation = this.state.toggleLocation
                let toggleGender = this.state.toggleGender
                let toggleCheckbox = this.state.toggleCheckbox 
                let age = this.state.age
                let spends = this.state.spends
                let checked = this.state.checked
                let toggleEntity = this.state.toggleEntity
                let newCustomer = this.state.newCustomer
                let opacity = { opacity: this.state.opacity }
                let toggleEntityClass = classNames({
                          'toggleEntity': true,
                          'toggleEntityOpacity': opacity.opacity === 0.5
                })
        return (

      
      
<div>
          <div className="totalDesigns">
              <Paper style={Object.assign(styles.newEntityPaper)} zDepth={2}>
                  <div className="closePaper">
                      <a onClick={this.toggleEntity}>
                          X
                      </a>
                  </div> 
              <div><label className="textNewCustomer">NEW CUSTOMER SEGMENT</label></div>                                             
                  <div className="textBoxCustomer">
                    <CustomerTextbox
                      style={styles.textField}
                      name="customerName"
                      placeholder="Customer Segment" 
                      onChange={this.customerUpdate}
                      value={this.state.customerName}
                    />
                    
                  </div>
              <div><label className="textConditions">CONDITIONS</label></div>
                  <div className="innerLayouts"> 
                   <div className="clearAll"><a onClick={this.clearEvents}>CLEAR ALL</a></div>                        
                      <Checkbox
                          label="AGE"
                          onCheck={this.addChecked}
                          checked={this.state.checked}
                          />                        
              {toggleCheckbox ?
                  <div>
                      <div className="ageTextBetween">Between</div>
                      <div className="twoInput">
                          <AgeTextbox
                            name="fromAge"
                            onChange={this.ageUpdate}
                            value={this.state.age.fromAge}
                            /> 
                      </div>
                      <div className="textTo">to</div>
                      <div className="secondInput">
                          <AgeTextbox
                            name="toAge" 
                            onChange={this.ageUpdate}
                            value={this.state.age.toAge}                             
                            />
                      </div>
                      <div className="textYears">yrs</div>
                      </div>
                      :
                      <div>                                  
                      </div>
                      }                              
                    <Checkbox
                      label="LOCATION"
                      onCheck={this.locationChecked}
                      checked={this.state.locationChecked}                                
                      />
                                                       
              {toggleLocation ?
                      <div>                                 
                      </div>
                      :
                      <div>
                      <div className="locationText">
                            <LocationTextBox
                            name="locationplace" 
                            onChange={this.locationUpdate}
                            value={this.state.sample}
                            />
                            <div className="addButtonSample">
                                <a onClick={this.addLocation} className="triangle-btn">
                                    <span className="glyphicon 
                                    glyphicon-chevron-right"></span>
                                </a>
                            </div>
                      <div className="displayArea">
                      {_(_.clone(this.state.location)).reverse().map((places, index) => 
                      <DisplayLocation  location={places} 
                      deleteAttr={this.deleteAttr.bind(null, places)}
                      key={index}
                      />).value() }
                      </div>
                      </div>
                      </div>                                
                      }
                      <Checkbox
                          label="GENDER"
                          onCheck={this.genderChange}
                          checked={this.state.genderChange}                                                 
                          />
              {toggleGender ?
                      <div>                                                    
                      </div>
                      :
                      <div>
                          <div className="locationText">
                            <RadioButtonGroup defaultSelected={this.props.customerdata.gender} style={{ display: 'flex' }} onChange={this.radioOneChange}>
                                  <RadioButton
                                    name="male"
                                    value="male"
                                    label="MALE"
                                    style={styles.labelStyle}
                                    />
                                  <RadioButton
                                    name="female"
                                    value="female"
                                    label="FEMALE"
                                    style={styles.radio}
                                    />
                                  
                            </RadioButtonGroup>
                          </div>
                      </div>                                                 
                      }   
                      <Checkbox
                          label="SPENDS"
                          onCheck={this.spendsChange}
                          checked={this.state.spendsChange}                                                 
                          />
              {toggleSpends ?
                      <div>
                          

                      </div> :

                      <div>
                        <div className="textBetween">Between
                          </div>
                          <div className="spendsTextBoxOne">
                                  <SpendTextbox
                                  name="fromSpends"
                                  onChange={this.spendUpdate}
                                  value={this.state.spends.fromSpends}
                                  /> 
                          </div>
                          <div className="spendsTextTo">to</div>
                          <div className="spendsTextBoxTwo">
                                  <SpendTextbox
                                  name="toSpends"
                                  onChange={this.spendUpdate}
                                  value={this.state.spends.toSpends}
                                  />
                          </div>
                      </div>
                    }       
                                        
                     </div>
                    
        <div className="addButtonDisplay">
        <RaisedButton icon={<img src="images/tick.png" />} label="SAVE" labelStyle={styles.saveLabel} labelColor="#fff"  backgroundColor="#00bfa5"  onClick={this.updateCustomers} />
      <div className="cancelButton">
        <FlatButton onClick={this.revertEntity} label="CANCEL" labelStyle={styles.cancelBtn}/>
      </div>
      </div>
              </Paper>
            </div>
                           
          </div>
        
    );
  }
}

EditCustomerSegment.propTypes = {
    main: PropTypes.object.isRequired,
    customer: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired

};

const selector = createSelector(
  state => state.main,
  state => state.customer,

  (main, customer) => ({ main, customer })
)

export default connect(selector, bindDispatch)(EditCustomerSegment);



