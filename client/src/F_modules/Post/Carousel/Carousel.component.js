import React, {Component} from 'react'
//styles
import './style.css'
//components

export default class extends Component{
  constructor(props){
    super(props);
    this.state = {
      mediaDisplay: 0
    }
  }
  render(){
    let {images} = this.props;
    let imageKeys = Object.keys(images);
    let length = imageKeys.length;
    return(
      <div className = "post-carousel-container">
        <div className= "overlay left">
          <span 
            className ="post-carousel--icon fas fa-chevron-left"
            onClick = {e=>this.slideMedia(-1)}
          ></span>
        </div>
        <div className = "overlay right">
          <span 
            className ="post-carousel--icon fas fa-chevron-right"
            onClick = {e=>this.slideMedia(1)}
          ></span>
        </div>
        
        <div className = "post-carousel-content">
          {
            imageKeys.map((key, index)=>{
              if((index-this.state.mediaDisplay)%length !== 0){
                return null;
              }
              return(
                <div className = "post-carousel-image" key = {key}>
                  <img src = {images[key].url}/>
                  <div className = "post-carousel-image-overlay">
                    {images[key].title}
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
  slideMedia = (num)=>{
    this.setState(
      (prevState)=>({
        ...prevState,
        mediaDisplay : prevState.mediaDisplay + num
      })    
    )
  }
}