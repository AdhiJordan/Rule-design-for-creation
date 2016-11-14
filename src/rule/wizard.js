import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import {RaisedButton} from 'material-ui';
import {Dialog, Paper, TextField} from 'material-ui';
import {FlatButton} from 'material-ui';
import classNames from 'classnames'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui';
export default class Wizard extends React.Component {

    constructor(props, context) {
        super(props, context);
  this.state = {
    finished: false,
    stepIndex: null,
  };
    }


     handleNext(e){
      e.preventDefault()
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev(e){
    e.preventDefault()
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Select campaign settings...';
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

    render() {
          const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Select campaign settings</StepLabel>
          </Step>
          <Step>
            <StepLabel>Create an ad group</StepLabel>
          </Step>
          <Step>
            <StepLabel>Create an ad</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? 
            <p>hai</p>
           : 
            <div>
              <p>{this.getStepContent(stepIndex)}</p>
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onTouchTap={this.handleNext}
                />
              </div>
            </div>
          }
        </div>
      </div>
    );
}
};







