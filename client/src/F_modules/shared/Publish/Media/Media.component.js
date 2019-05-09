import React, {Component} from 'react'
//styles
import './style.css'

export default class extends Component{
  render(){
    let {image, num, eraseImage} = this.props;
    if(!image){
      return null;
    }
    let {localUrl : imgLocalUrl, title} = image;
    return(
      <div className = "image-list">
        <div className = "image-display">
          <img src = {imgLocalUrl}/> 
          <div className = "overlay">
            <span className = "fas fa-times" 
              onClick = {()=>eraseImage(num)}
            >
            </span>
            <span className = "fas fa-heading"
              onClick = {()=>this.changeTitle(title)}
            >
            </span>
          </div>
        </div>
      </div>
    )
  }
  changeTitle = (prevTitle)=>{
    let ans = prompt("Your new image title", prevTitle);
    let {addImageTitle, num} = this.props;
    addImageTitle(num, ans);
  }
}