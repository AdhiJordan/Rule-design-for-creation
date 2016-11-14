import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import {RaisedButton} from 'material-ui';
import {Dialog, Paper, TextField} from 'material-ui';
import {FlatButton} from 'material-ui';
import 'app/css/header.css';
import classNames from 'classnames'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui';



const styles = {

};


export default class Header extends React.Component {

    constructor(props, context) {
        super(props, context);

    }

    render() {



        return (   
        <div>
              <div className="outerRectangle">
              </div>
              <div className="casaLogo">
              <img src="images/logo3.png" width='205' height='35' />
              </div>
              <div>
         
              </div>

              
        </div>
        );
}
};








