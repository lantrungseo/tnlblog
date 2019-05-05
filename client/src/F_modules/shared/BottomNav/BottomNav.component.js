import React, {Component} from 'react'
//styles
import './style.css'

export default class extends Component{
  render(){
    return(
      <div className = "bottom-nav--container">
          {this.props.children}
      </div>
    )
  }
}