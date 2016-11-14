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
import {RaisedButton} from 'material-ui'
import DisplayLocation from 'views/DisplayLocation';
import NewCustomerSegment from 'views/input-fields/NewCustomerSegment';
import RulePage from 'rule/RulePage';
  const styles = {
    newEntityPaper: {
      width: 375,
      marginLeft: 20,
      float: 'left',
      marginTop: -90,
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
    class CustomerSegment extends React.Component {
	    constructor(props, context) {
          super(props, context);      
          this.state = {
                customerName: '' ,
                age: {fromAge: null, toAge: null},
                spends: {fromSpends: null, toSpends: null },
                locationPlace: "",
                location: [],
                opacity: 1,
                checked: false,
                toggleCheckbox: true,
                toggleLocation: false,
                locationChecked: true,
                toggleGender: false,
                genderChange: true,
                toggleSpends: false,
                checked: "male",
                toggleEntity: true,
                spendsChange: true
                
                
                };
               this.deleteEntity = this.deleteEntity.bind(this);
               this.clearEvents = this.clearEvents.bind(this);
               this.genderChange = this.genderChange.bind(this);
               this.locationChecked = this.locationChecked.bind(this);
               this.ageUpdate = this.ageUpdate.bind(this);
               this.spendUpdate = this.spendUpdate.bind(this);
               this.addChecked = this.addChecked.bind(this);
               this.toggleEntity = this.toggleEntity.bind(this);
               this.customerUpdate = this.customerUpdate.bind(this);
               this.radioOneChange = this.radioOneChange.bind(this);
               this.spendsChange = this.spendsChange.bind(this);
               this.locationUpdate = this.locationUpdate.bind(this);
               this.addLocation = this.addLocation.bind(this);
               this.deleteAttr = this.deleteAttr.bind(this);
               this.addDetails = this.addDetails.bind(this);
               this.getCustomerDetails = this.getCustomerDetails.bind(this);
               this.toggleEntityFromNewCard = this.toggleEntityFromNewCard.bind(this);
             
      }
     
      getCustomerDetails(e) {
            console.log(this.props.customer.customers);
            console.log('hai adhithya');
            alert('customer');
            // {_(_.clone(this.props.main.customers)).reverse().map((customer) => <RulePage  
            //   customer={customer} />).value() }
            this.props.changeToggleForCustomer(this.props.customer.customers);

      }

      clearEvents(e) {
       
            event.preventDefault()
            this.setState({customerName: []});
    
        
      }
        addDetails(e) {
                e.preventDefault()
                alert('firstcustomer');
                console.log(this.state.customerName);
                let customerData = {
                  newCustomerSegment: this.state.customerName,
                  ageBetween: this.state.age.fromAge,
                  ageTo: this.state.age.toAge,
                  spendsBetween: this.state.spends.fromSpends,
                  spendsTo: this.state.spends.toSpends,
                  location: this.state.location,
                  gender: this.state.checked
                }
                this.props.actions.createCustomer(customerData);


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
          alert('radio changes occuring ..');
            this.setState({checked: value});
            console.log(value);
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
  
        toggleEntity(e) {
              e.preventDefault()
              if(this.state.opacity == 0.5) {
              return ''
              }
              this.setState({toggleEntity: !this.state.toggleEntity})
        }
        toggleEntityFromNewCard() {
              
              this.setState({toggleEntity: false});
        } 
       hideNewCard() {
               let opacity = 1;
                if(this.state.opacity === 1) {
                opacity = 0.5
                }
                this.setState({opacity: opacity})
        }
        deleteEntity(customer, id) {
      // event.preventDefault();
      alert('delete clicked'); 
      console.log(customer.id);
           
           console.log(customer);
            let customerData = this.props.customer.customers
                  console.log(customerData);
           const indexOfEntityToDelete = customerData.findIndex(entity1 => entity1.id == customer.id)
           console.log(indexOfEntityToDelete);
           this.props.actions.deleteCustomer( customer.id, indexOfEntityToDelete)
        }
       
	      render() { 
                const { main, customer, actions } = this.props
              
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
      
		    <div className="outerLayerBlack">
            <div><label className="pickUp">PICK A CUSTOMER SEGMENT</label></div>
          <div className="closeCustomer">
              <a onClick={this.getCustomerDetails}>
              <img src="images/close.png" width='20' height='20' />
              </a>
          </div> 
              {toggleEntity ?
                  <div>                  
                      <div className="addCustomer">
                        <div>
                          <a className={toggleEntityClass} 
                                onClick={this.toggleEntity}>
                                <img src="images/add-button.png" 
                                width='40' height='40' />
                          </a>
                        </div>
                      </div>
                  
                             
          <div className="innerRectangle">
            <label className="innerText">No Customer Segments Yet. 
            Just add a new one now!</label>
          </div>
          
        </div>
        :

          <div className="totalDesign">
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
                  <div className="ageChecked">                       
                      <Checkbox
                          label="AGE"
                          onCheck={this.addChecked}
                          checked={this.state.checked}
                          />     
                          </div>                   
              {toggleCheckbox ?
                  <div className="insideSpace">
                      <div className="ageTextBetween">Between</div>
                      <div className="twoInput">
                          <AgeTextbox
                            name="fromAge"
                            onChange={this.ageUpdate}
                            value={age.fromAge}
                            /> 
                      </div>
                      <div className="textTo">to</div>
                      <div className="secondInput">
                          <AgeTextbox
                            name="toAge" 
                            onChange={this.ageUpdate}
                            value={age.toAge}                             
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
                            value={locationPlace}
                            />
                            <div className="addButtonSample">
                                <a onClick={this.addLocation} className="triangle-btn">
                                    <span className="glyphicon 
                                    glyphicon-chevron-right"></span>
                                </a>
                            </div>
                      <div className="displayArea">
                      {_(_.clone(location)).reverse().map((places, index) => 
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
                            <RadioButtonGroup  style={{ display: 'flex' }} onChange={this.radioOneChange}>
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
                                  value={spends.fromSpends}
                                  /> 
                          </div>
                          <div className="spendsTextTo">to</div>
                          <div className="spendsTextBoxTwo">
                                  <SpendTextbox
                                  name="toSpends"
                                  onChange={this.spendUpdate}
                                  value={spends.toSpends}
                                  />
                          </div>
                      </div>
                    }       
                                        
                     </div>
                    <div className="createButton">
                      <RaisedButton icon={<img src="images/tick.png" />}
                       label={"CREATE"} labelStyle={styles.addLabel}
                       labelColor="#fff"  backgroundColor="#00bfa5" onClick={this.addDetails} />
                    </div>
              </Paper>
            </div>
            }   
             {_(_.clone(customer.customers)).reverse().map(customer => 
               <NewCustomerSegment  style={styles.newCard} opacity={opacity} 
               hideNewCard={this.hideNewCard}
               toggleEntity={this.toggleEntityFromNewCard} 
               deleteEntity={this.deleteEntity.bind(null, customer)}
               customer={customer} />).value()}                 
          </div>
          </div>
          
		);
	}
}
CustomerSegment.propTypes = {
    main: PropTypes.object.isRequired,
    customer: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired

};

const selector = createSelector(
  state => state.main,
  state => state.customer,

  (main, customer) => ({ main, customer })
)

export default connect(selector, bindDispatch)(CustomerSegment);


