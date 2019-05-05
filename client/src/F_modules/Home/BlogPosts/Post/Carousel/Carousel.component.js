import React, {Component} from 'react'
//styles
import './style.css'
//components

export default class extends Component{
  render(){
    let {images} = this.props;
    let imageKeys = Object.keys(images);
    return(
      <div className = "post-carousel-container">
        <div className= "overlay left">
          <span className ="post-carousel--icon fas fa-chevron-left"></span>
        </div>
        <div className = "overlay right">
          <span className ="post-carousel--icon fas fa-chevron-right"></span>
        </div>
        
        <div className = "post-carousel-content">
          {
            imageKeys.map((key, index)=>{
              if(index !=0){
                return null;
              }
              return(
                <img key = {index} src = {images[key].url}/>
              )
            }
              
            )
          }
        </div>
      </div>
    )
  }
}