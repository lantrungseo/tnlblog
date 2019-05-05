import React, {Component} from 'react'
//styles
import './style.css'
//components
import {Link} from 'react-router-dom'

export default class extends Component{
  render(){
    return(
      <div className = "modal-overlay">
        <Link
          className = "modal-overlay--close__icon fas fa-times"
          to = "/"
        ></Link>
        <div className = "post-container--mobile">
          
        </div>
        <div className = "post-container">

        </div>
      </div>
    )
  }
}
