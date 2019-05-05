import React, {Component} from 'react'
//styles
import './style.css'

export default class extends Component{
  render(){
    return (
      <button 
        className = "floating-button card-effect css-ripple"
        onClick = {this.props.onClick}
      >
        <span className = "fas fa-bars"></span>
      </button>
    )
  }
}