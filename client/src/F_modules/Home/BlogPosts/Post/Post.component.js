import React, {Component} from 'react'
//styles
import './style.css'
//components
import {Link} from 'react-router-dom'
import Carousel from './Carousel/Carousel.component'
import ReactHTMLParser from 'react-html-parser'

export default class extends Component{
  constructor(props){
    super(props);
    this.state = {
      isContentOpen : false
    }
  }
  render(){
    let {posts, postID} = this.props;
    let myPost= posts[postID];
    let{images, title, content} = myPost;
    return(
      <div className = "modal-overlay">
        <Link
          className = "modal-overlay--close__icon fas fa-times"
          to = "/"
        ></Link>
        <Carousel images = {images}/>
        <div 
          className
          = {`post-container card-effect ${(this.state.isContentOpen ? "css-slide-down" : "css-slide-up")}`}
        >
            <h3>{title}</h3>
            {ReactHTMLParser(content)}
            
        </div>
        <div className = "post-footer" onClick = {()=>this.toggleContent()}>
          <h3>
            {title}
            &ensp;
            <span 
              className =  {
                (()=>{
                  if(!images){
                    return 'inactive'
                  }
                  let {isContentOpen} = this.state;
                  if(isContentOpen){
                    return 'fas fa-chevron-down'
                  }
                  else{
                    return 'fas fa-chevron-up'
                  }
                })()
              }
            >
            </span>
          </h3>
          
        </div>
      </div>
    )
  }
  toggleContent = (e)=>{
    this.setState(
      (prevState)=>({
        ...prevState,
        isContentOpen : !prevState.isContentOpen
      })
    )
  }
}
