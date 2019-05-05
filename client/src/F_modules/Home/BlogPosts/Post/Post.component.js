import React, {Component} from 'react'
//styles
import './style.css'
//components
import {Link} from 'react-router-dom'
import Carousel from './Carousel/Carousel.component'

export default class extends Component{
  render(){
    let {posts, postID} = this.props;
    let myPost= posts[postID];
    let{images, title, content} = myPost;
    let mediaCarousel = (images? <Carousel images = {images}/>:null);
    return(
      <div className = "modal-overlay">
        <Link
          className = "modal-overlay--close__icon fas fa-times"
          to = "/"
        ></Link>
        <div className= "post-container--mobile">
          {mediaCarousel}

        </div>
      </div>
    )
  }
}
