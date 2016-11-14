import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui';
import {Card, CardHeader, CardTitle, CardMedia, CardText, CardActions, FlatButton} from 'material-ui';
import Ajv from 'ajv'

    var ajv = new Ajv({ removeAdditional: true });
var schema = {
  "additionalProperties": false,
  "properties": {
    "foo": { "type": "number" },
    "bar": {
      "additionalProperties": { "type": "number" },
      "properties": {
        "baz": { "type": "string" }
      }
    }
  }
}

//
var user = {
  "id": 26,
  "name": "marees",
  "email": "mareesvlpt@gmail.com",
  "phone": "9600349634",
  "address": {
    "street": "2 nd street",
    "postcode":"600042",
    "city": "Chennai",
    "country": "India"
  },
  "personal": {
    "DOB": "1994-04-10",
    "age": 23,
    "gender": "male"
  },
  "connections": [
    {
      "id": "15",
      "name": "xxx",
      "connType": "friend",
      "since": "2014-02-23",
      "relation": "brother"
    },
    {
      "id": 23,
      "name": "yyy",
      "connType": "relative",
      "relation": "brother",
      "close": true,
      "since": "2012-07-03"
    }
  ],
  "feeds": {
    "news": true,
    "sport": true,
    "fashion": false
  },
  "createdAt": "2015-09-22T10:30:06.000Z"
};

var userSchema = {
  // "$schema": "http://json-schema.org/draft-04/schema#",
  // "id": "http://mynet.com/schemas/user.json#",
  // "title": "User",
  // "description": "User profile with connections",
  // "type": "object",
  "properties": {
    "id": { "type": ["string", "integer"], "pattern": "^[1-9][0-9]*$", "minimum": 1 },
    "name": { "type": "string", "maxLength": 128 },
    "email": { "type": "string", "format": "email" },
    "phone": { "type": "string", "pattern": "^[0-9()\\-\\.\\s]+$" }, 
    "address": {
      "type": "object",
      "additionalProperties": { "type": "string" },
      "maxProperties": 6,
      "required": ["street", "postcode", "city", "country"]
    },
    "personal": {
      "type": "object",
      "properties": {
        "DOB": { "type": "string", "format": "date" },
        "age": { "type": "number", "minimum": 13 },
        "gender": { "enum": ["female", "male"] },
      },
      "additionalProperties": false,
      "required": ["DOB", "age"]
    },
    "connections": {
      "type": "array",
      "maxItems": 150,
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": ["string", "integer"], "pattern": "^[1-9][0-9]*$", "minimum": 1 },
          "name": { "type": "string", "maxLength": 128 },
          "since": { "type": "string", "format": "date" },
          "connType": { "type": "string" },
          "relation": {},
          "close": {}
        },
        "oneOf": [
          {
            "properties": {
              "connType": { "enum": ["relative"] },
              "relation": { "type": "string" }
            },
            "dependencies": {
              "relation": ["close"]
            }
          },
          {
            "properties": {
              "connType": { "enum": ["friend", "colleague", "other"] },
              "relation": { "not": {} },
              "close": { "not": {} }
            },
          }
        ],
        "required": ["id", "name", "since", "connType"],
        "additionalProperties": false
      }
    },
    "feeds": {
      "type": "object",
      "patternProperties": {
        "^[A-Za-z]+$": { "type": "boolean" }
      },
      "additionalProperties": false
    },
    "createdAt": { "type": "string", "format": "date-time" }
  }
};


var ajv = Ajv({allErrors: true});
var validate = ajv.compile(userSchema);
var valid = validate(user);
if (valid) {
  alert('User data is valid');
} else {
  console.log('User data is INVALID!');
  console.log(validate.errors);
}

export default class TestingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    let name = e.target.value;
    this.setState({name: name});
  }
  handleSubmit(e) {
    e.preventDefault()
    alert(this.state.name)

  }

  render() {


var data = {
  "foo": 0,
  "additional1": 1, // will be removed; `additionalProperties` == false
  "bar": {
    "baz": "abc",
    "additional2": 2 // will NOT be removed; `additionalProperties` != false
  },
}

var validate = ajv.compile(schema);

console.log(validate(data)); // true
console.log(data); // { "foo": 0, "bar": { "baz": "abc", "additional2": 2 }

  return (
  <form onSubmit={this.handleSubmit}>
  <input type="text"  onChange={this.handleChange} value={this.state.name}/>
  <input type="submit" value="submit"/>
  </form>
  );
}

}
