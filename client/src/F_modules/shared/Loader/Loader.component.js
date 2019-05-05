import React, {Component} from 'react'
//styles
import './style.css'

export default class extends Component{
  render(){
    return(
      <span className="loader">
        <span className="loader-inner"></span>
      </span>
    )
  }
}