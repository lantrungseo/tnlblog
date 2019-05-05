import React, {Component} from 'react'
//styles
import './style.css'
//components

export default class extends Component{
  render(){
    return(
      <div className = "modal-overlay">
        <span 
          className = "modal-overlay--close fas fa-times"
        ></span>
        <div className = "post-container">
          
        </div>
      </div>
    )
  }
}
