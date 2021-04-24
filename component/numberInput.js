import React, { Component } from 'react';
import { TextInput } from 'react-native';

//export number input component
export class NumberInput extends Component {
    constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

   handleInputChange = (text) => {
     //Regex to only allow text to be numbers or empty, else new input will not be registered
    if (/^\d+$/.test(text) || text === "") {
      this.setState({
        text: text
      });
    }
  }
   
  
  render () {
    return (
      //return number input with defined keyboard, function and state but allow for custom style and placeholder
      <TextInput
        style = {this.props.style}
        placeholder = {this.props.placeholder}
        keyboardType='numeric'
        onChangeText={this.handleInputChange}
        value={this.state.text}
      />
    )
  }

}