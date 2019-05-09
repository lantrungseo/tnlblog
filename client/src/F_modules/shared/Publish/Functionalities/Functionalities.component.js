import React, {Component} from 'react'
//styles
import './style.css'

export default class extends Component{
  render(){
    let {saveData} = this.props;
    return(
      <div className = "publish-functional">
        <div className = "card-effect publish-photos function">
          <input type = "file" 
            accept = "image/*"
            onChange = {e=>saveData("imgs", e.target)}
          />
          <span className = "fas fa-images"> Photos </span>
        </div>
      </div>
    )
  }
}