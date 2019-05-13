import React, {Component, Fragment} from 'react'
//styles
import './style.css'
//components
import Carousel from './Carousel/Carousel.component'
import ReactHTMLParser from 'react-html-parser'
//redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getPosts} from '../../B_modules/Post/Post.action'

class Post extends Component{
  componentDidMount(){
    let {postID, getPost, endpoint}  = this.props;
    getPost(endpoint, postID);
  }
  render(){
    let {post} = this.props;
    if(!post){
      return null;
    }
    let {contents, images, title} = post;
    return(
      <div className = "post-container">
        <div className = "post-header">
          <a href = "/tnlautograph">
            <span className = "fas fa-chevron-left">
            &ensp;
              MAIN PAGE
            </span>
          </a>
        </div>
        {
          images ?
          <div className = "post-carousel">
            <Carousel images = {images}/>
          </div>
          : null
        }
        <h1>{title}</h1>
        <div className = "post-content">
          {
            Object.keys(contents).map(
              (contentKey)=>{
                let data = contents[contentKey];
                let {imageIndex, content} = data;
                return(
                  <Fragment key = {contentKey}>
                    {
                      (
                        imageIndex ?
                        <div className = "post-content-image">
                          <img src = {images[imageIndex].url} />
                          <div className = "post-content-image-overlay">{images[imageIndex].title}</div>
                        </div>
                        : null
                      )
                    }
                    <div>{ReactHTMLParser(content)}</div>
                  </Fragment>
                )
              }
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>({
  post : state.PostReducer.postData
})

const mapDispatchToProps = (dispatch)=>({
  getPost : bindActionCreators(getPosts, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)

