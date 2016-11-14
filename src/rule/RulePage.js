import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {createSelector} from 'reselect'
import {bindDispatch} from 'common/util/redux'
import { browserHistory } from 'react-router';
import {Dialog, Paper, TextField} from 'material-ui';
import Header from 'rule/header'
import 'app/css/ruleapp.css';
import 'app/css/wizard.css';
import 'app/css/app.css';
import classNames from 'classnames'
import {RadioButton, RadioButtonGroup} from 'material-ui'
import DisplayAttribute from 'views/DisplayAttribute'
import _ from 'lodash'
import Ajv from 'ajv'
import entitySchema from 'schema/entity'
import TextInput from 'views/input-fields/TextInput';
import SelectInput from 'views/input-fields/SelectInput';
import NotSingle from 'views/input-fields/NotSingle';
import ShowEditDetails from 'views/input-fields/ShowEditDetails';
import NotOfNested from 'views/input-fields/NotOfNested';
import NotCustomer from 'views/input-fields/NotCustomer';
import CustomerSegment from 'views/input-fields/CustomerSegment';
import NewCustomerSegment from 'views/input-fields/NewCustomerSegment';
import OperandDrop from 'views/dropdown/OperandDrop';
import {RaisedButton} from 'material-ui'
import 'app/css/fresh.css';
import DisplayRuleAttribute from 'views/DisplayRuleAttribute';
import DisplaySingleAttribute from 'views/DisplaySingleAttribute';
import NewRule from './NewRule';
import SearchTextbox from 'views/TextBox/SearchTextbox';





var ajv = Ajv({allErrors: true});
var validate = ajv.compile(entitySchema);


const iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?~`";

const styles = {
  newEntityPaper: {
    width: 1360,
    marginLeft: 30,
    float: 'left',
  },
    addLabel: {
    fontFamily: 'Work Sans',
  },
   newCard: {
    float: 'left',
    opacity: 0.5,
  },
  labelStyle: {
    fontFamily: 'Work Sans',
    fontSize: 10,
    width: 130,
    float: 'left',
  },
};

class RulePage extends React.Component {

        constructor(props, context) {
          super(props, context);      
          this.state = {
            searchTextbox: '',
           arraynot: [],
           arrayNested: [],
           arrayCustomer: [],
           newRule: {ruleName: '', entityType: ''},
           singleData: [],
           nestedData: [],
           checked: "ifAllTrue",
           rule: {operandValue: '', operatorFunction: '' , constantValue: ''},
           rule: {fetchFunction: '', operandValueNested: '', operatorFunctionNested: '', constantValueNested: ''},
           toggleForCustomer: false,
           toggleEntity: true,
           toggleForCreateRule: false,
           opacity: 1,
           toggleEntitySecondTime: true
           
        };
          this.deleteCustomer = this.deleteCustomer.bind(this);
          this.toggleEntity = this.toggleEntity.bind(this);
          this.toggleEntitySecond = this.toggleEntitySecond.bind(this);
          this.addAttribute = this.addAttribute.bind(this);
          this.updateAttribute = this.updateAttribute.bind(this);
          this.toggleRectangle = this.toggleRectangle.bind(this);
          this.toggleCustomer = this.toggleCustomer.bind(this);
          this.toggleSquare = this.toggleSquare.bind(this);
          this.onRemove = this.onRemove.bind(this);
          this.onRemoveFirst = this.onRemoveFirst.bind(this);
          this.addToSingle = this.addToSingle.bind(this);
          this.addToNested = this.addToNested.bind(this);
          this.radioOneChange = this.radioOneChange.bind(this);
          this.changeToggleForCustomer = this.changeToggleForCustomer.bind(this);
          this.closeCreateRule = this.closeCreateRule.bind(this);
          this.searchTextboxChange = this.searchTextboxChange.bind(this);
   
        }
        searchTextboxChange(e) {
          this.setState({searchTextbox: e.target.value})
        }
       
        deleteCustomer(index, id) {
            alert(index + " " + id);
            // console.log(this.props)
              this.props.actions.deleteCustomer(id, index);
        }
        toggleEntity(e) {
            e.preventDefault()
            if(this.state.opacity == 0.5) {
                return ''
        }
            this.setState({toggleEntity: !this.state.toggleEntity})
            this.setState({newRuleButton: !this.state.newRuleButton})
        }
        toggleEntitySecond() {
           alert("inside dhoni");
          this.setState({toggleForCreateRule: false});
         
        }
        radioOneChange(e, value) {   
        this.setState({checked: value});
        }

        addToSingle(singles, a, index) { 
          let single = this.state.singleData
          if(!a) {
            
            let singleData = this.state.singleData.slice()
            singleData.push(singles)
            this.setState({singleData: singleData}); 
          }
          else {
            var tempDelete = this.state.singleData.filter( s => s.operandValue !== singles.operandValue)
            this.setState({singleData: tempDelete, arraynot: []});
          }
        }
        addToNested(nesteds, a, index) {
          let nestedDataConditions = this.state.nestedData


            if(!a) {
              let nestedData = this.state.nestedData.slice()
              nestedData.push(nesteds)
              this.setState({nestedData: nestedData})


               
            }
            else {
                var temp = this.state.nestedData.filter( n => n.operandValueNested !== nesteds.operandValueNested)
                this.setState({nestedData: temp});
            }
        }
        addAttribute(e) {
            e.preventDefault();
            let ruletwo = 
            {ruleName: this.state.newRule.ruleName, 
            entityType: this.state.newRule.entityType,
            singleConditions: this.state.singleData,
            nestedConditions: this.state.nestedData,
            trueButton: this.state.checked} 
            this.props.actions.createEntity(ruletwo);
            this.closeCreateRule()
            this.resetRuleValue()

        }
        resetRuleValue() {
          alert("we are in reset mode");
          this.setState({newRule: {ruleName: '', entityType: ''} });
          this.setState({ arraynot: [] });
          this.setState({ arrayNested: [] });
          this.setState({ arrayCustomer: [] });
        }
        closeCreateRule() {
          this.setState({toggleForCreateRule: !this.state.toggleForCreateRule});
         
        }
        updateAttribute(e) {
            let sample = this.state.newRule
            let field = e.target.name
            let value = e.target.value
            if(field == 'ruleName') {       
                     sample['ruleName'] = value
                     this.setState({newRule: sample})
            }
            else {
                if(value != '') {
                    sample['entityType'] = value
                    this.setState({newRule: sample})
                }
            }
        }
        onRemove(nesteds, index) {
              var newData = this.state.arrayNested.slice();
              newData.splice(index,1);
              this.setState({arrayNested: newData});
              var deleteNested = this.state.nestedData.slice();
              deleteNested.splice(index,1);
              this.setState({nestedData: deleteNested})
        }
        onRemoveFirst(index) {
              var newInfo = this.state.arraynot.slice();
              newInfo.splice(index,1);
              this.setState({arraynot: newInfo});
              var deleteSingle = this.state.singleData.slice();
              deleteSingle.splice(index,1);
              this.setState({singleData: deleteSingle})
              console.log(this.state.singleData);
        }
        toggleRectangle(e) {
              let temp = this.state.arraynot
              this.setState({arraynot: 
              temp.concat(<NotSingle rule={this.state.rule} 
              onClick={this.onRemoveFirst}
              onChange={this.toggleRectangle} 
              addToSingle = {this.addToSingle}
              new={false}/>)});
              
        }
        toggleSquare(e) {
              let sample = this.state.arrayNested
              this.setState({arrayNested: 
              sample.concat(<NotOfNested
              rule={this.state.rule} 
              onClick={this.onRemove} 
              onChange={this.toggleSquare} 
              addToNested = {this.addToNested}
              new={false} />)});
        }

        customerSegment() {
          if(this.state.toggleForCustomer == true)

              return <CustomerSegment changeToggleForCustomer={this.changeToggleForCustomer} />
          return ''


        }
        toggleCustomer(e) {
        
          this.setState({toggleForCustomer: !this.state.toggleForCustomer});
              
        }
        changeToggleForCustomer(e) {
          alert("may be samrt");
          this.setState({arrayCustomer: e});    
          console.log(this.state.arrayCustomer);
          this.setState({toggleForCustomer: false});

        }
        toggleEntityFromNewCard() 
        {
              this.setState({toggleEntity: true});
        }

        render() {
              console.log(this.state.arraynot);
              let singleData = this.state.singleData
              let toggleForCreateRule = this.state.toggleForCreateRule
              
              let toggleEntitySecond = this.state.toggleEntitySecond
              let toggleEntity = this.state.toggleEntity
              let {onClick, onChange, singles, nesteds, main} = this.props;
              let toggleRectangle = this.state.toggleRectangle
              let toggleSquare = this.state.toggleSquare
              let toggleCustomer = this.state.toggleCustomer
              let newRule = this.state.newRule
              let onRemove = this.state.onRemove
              let onRemoveFirst = this.state.onRemoveFirst
              let addToSingle = this.state.addToSingle
              let opacity = { opacity: this.state.opacity }
              let toggleEntityClass = classNames({
                    'toggleEntity': true,
                    'toggleEntityOpacity': opacity.opacity === 0.5
              })
            
        return ( 
          <div>
              <Header></Header>
              <div className="subHeader">
          </div>
              <div className="FirstCreationOfRule">
        <a 
                          className={toggleEntityClass}
                          onClick={this.toggleEntitySecond}>
                          <div className="secondRuleOfRuleCreation">
                            <div className="newRectangle"> 
                                <div className="newRule">
                                + 
                                </div>    
                            </div>
                            <div>
                                <p className="newHai">NEW RULE</p>
                            </div>
                          </div>
                          </a> 
        </div>
        <div className="searchTextboxDesign">
              <SearchTextbox
              name="searchTextbox"
              placeholder="Find a Rule"
              value={this.state.searchTextbox}
              onChange={this.searchTextboxChange}
              />
              <div className="searchSymbol">
              <img src="images/search.svg" width='23' height='23' />
              </div>
        </div>
    
          {toggleEntity ? 
            <div className="newBox">
                  <label className="newBoxText">
                  Rules define your system's behaviour. 
                  Create your first one!
                  </label>
                    <div className="openPaper">
                        <a href="" 
                          className={toggleEntityClass}
                          onClick={this.toggleEntity}>
                          <div className="secondRule">
                            <div className="newRectangle"> 
                                <div className="newRule">
                                + 
                                </div>    
                            </div>
                            <div>
                                <p className="newHai">NEW RULE</p>
                            </div>
                          </div>
                        </a> 
            </div>
            </div>: 
            
            <div>
            {toggleEntitySecond ? 
              <div>
              </div> :
              <div>
            {toggleForCreateRule ? 
              <div>
              </div> :

            <div className="paperDown">
                  <Paper style={Object.assign(styles.newEntityPaper)}
                   zDepth={2}>
                  <div className="entityClose">
                      <a href="" 
                        onClick={this.toggleEntity}>
                        X
                      </a>
                  </div>              
            <div>
               <div className="cf">
                 <form className="attributeForm aa">
                   <div className="newLabel">NEW RULE</div>
                   <div className="newText">
                       <TextInput
                           name="ruleName"
                           placeholder="Rule Name" 
                           onChange={this.updateAttribute}
                           value={newRule.ruleName}
                           />
         </div>
          <div className="newLabel">FOR WHICH ENTITY?</div>
          <div className="newSelect">
        <SelectInput
         name="entityType"
         defaultOption="Entity Type"
         onChange={this.updateAttribute}
         value={newRule.entityType} 
     />
         </div>
       </form>
       </div>
  <div>
        <div className="threeButtons">
          
          <div className="singleFirst">
          <a onClick={this.toggleRectangle}>
              <div className="imageSingle">
                  <img src="images/Add Single Condition.svg" width='21' height='21' />
              </div>
          
              <div className="textFirst">SINGLE CONDITION</div>
          </a>
          </div>
          <div className="nestedSecond">
          <a onClick={this.toggleSquare}>
              <div className="imageNested">
              <img src="images/Add Nested Condition.svg" width='27' height='27' />
              </div>
              <div className="textSecond">NESTED CONDITION</div>
          </a>
          </div>
          <div className="customerThird">
          <a onClick={this.toggleCustomer}>
              <div className="imageCustomer">
              <img src="images/add-a-segment.svg" width='23' height='23' />
              </div>
              <div className="textThird">CUSTOMER SEGMENT</div>
          </a>
          </div>
          
          
          {this.state.arraynot}
          {this.state.arrayNested}
          {this.props.customer.customers.map((customer, index) => <NotCustomer key={index} customer={customer} deleteCustomer={this.deleteCustomer.bind(this,index, customer.id)} />)}
        </div>
        <div className="adjustIt">
        </div>
        <div className="radioButtons">
 <RadioButtonGroup  defaultSelected="ifAllTrue" onChange={this.radioOneChange}>
  
      <RadioButton
      name="ifAllTrue"
        value="ifAllTrue"
        label="IF ALL TRUE"
        style={styles.labelStyle}
      />
          <RadioButton
      name="ifAnyTrue"
        value="ifAnyTrue"
        label="IF ANY TRUE"
        style={styles.labelStyle}
     
      />
    </RadioButtonGroup>
    </div>
      
        <div className="addButtonDisplay">
        <RaisedButton icon={<img src="images/tick.png" />} label={"ADD RULE"} labelStyle={styles.addLabel} labelColor="#fff"  backgroundColor="#00bfa5"  onClick={this.addAttribute} />
      </div> 
      </div>
      
        
{this.customerSegment()}
    
</div>
              </Paper>
             
              </div>
            }
            </div> 
          }



          </div>
          
          
            }
            {_(_.clone(main.rules)).reverse().map((rule) => <ShowEditDetails
             deleteCustomer={this.deleteCustomer.bind(this)}
              customer={this.props.customer.customers}
               rule={rule} style={styles.newCard}
                toggleEntity={this.toggleEntityFromNewCard}
                 opacity={opacity} hideNewCard={this.hideNewCard}/>).value() }
          </div>
        );
}
}
RulePage.propTypes = {
    main: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
const selector = createSelector(
  state => state.main,
  state => state.customer,
  (main, customer) => ({ main, customer })
)
export default connect(selector, bindDispatch)(RulePage);