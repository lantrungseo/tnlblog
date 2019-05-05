import React, {Component, Fragment} from 'react'
//styles
import './style.css'
//components


export default class extends Component{
  render(){
    let {posts, defaultThumbnailURL} = this.props;
    let keysArr = Object.keys(posts).reverse();
    let dataKeys = keysArr.slice(1,4);
    return (
      <div className = "newest-container card-effect">
        <a className = "top-story-container card-effect" href = "/post">
          {
            (()=>{
              let topStory = posts[keysArr[0]];
              let thumbnailURL = defaultThumbnailURL;
              if(topStory.images){
                thumbnailURL = topStory.images[Object.keys(topStory.images)[0]].url;
              }
              return(
                <Fragment>
                  <img src = {thumbnailURL}/>
                  <h4>{topStory.title}</h4>
                </Fragment>
              )
            })()
          }
        </a>
        <div className = "hot-stories-container">
          {
            dataKeys.map((key)=>{
              let hotStory = posts[key];
              let thumbnailURL  =  defaultThumbnailURL;
              if(hotStory.images){
                thumbnailURL = hotStory.images[Object.keys(hotStory.images)[0]].url;
              }
              return(
                  <div className = "hot-story card-effect" key ={key}>
                    <img src = {thumbnailURL}/>
                    <h4>
                    {hotStory.title.length >=40 ? `${hotStory.title.substr(0,39)}...`: hotStory.title}
                    </h4>
                  </div> 
              )
            })
          }
        </div>
      </div>
    )
  }
}