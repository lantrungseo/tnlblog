import React, {Component} from 'react'
//styles
import './style.css'

export default class extends Component{
  render(){
    let {image, num, eraseImage} = this.props;
    if(num===-1){
      return null;
    }
    let {localUrl : imgLocalUrl} = image;
    return(
      <div className = "image-list">
        <div className = "image-display">
          <img src = {imgLocalUrl}/> 
          <div className = "overlay">
            <span className = "fas fa-times" 
              onClick = {()=>eraseImage(num)}
            >
            </span> 
          </div>
        </div>
      </div>
      
    )
  }
}