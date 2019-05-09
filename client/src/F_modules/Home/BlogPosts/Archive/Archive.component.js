import React, {Component} from 'react'
//styles
import './style.css'


export default class extends Component{
  render(){
    let {posts, defaultThumbnailURL} = this.props;
    let keysArr = Object.keys(posts).reverse();
    let dataKeys = keysArr.slice(4);
    
    return(
      <div className = "archive-container">
        {
          dataKeys.map((key)=>{
            let story = posts[key];
            let thumbnailURL = defaultThumbnailURL;
            if(story.images){
              thumbnailURL = story.images[Object.keys(story.images)[0]].url;
            }
            return(
                <a className = "archive-story card-effect" key = {key} href = {`post/${key}`}>
                  <img src = {thumbnailURL}/>
                  <h4>
                    {story.title}
                  </h4>
                </a>
            );
          })
        }
      </div>
    )
  }
}