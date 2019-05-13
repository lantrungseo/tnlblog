import React, {Component} from 'react'
//styles
import './style.css'
//components
import Newest from './Newest/Newest.component'
import Archive from './Archive/Archive.component'

//redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getPosts} from '../../../B_modules/Post/Post.action'

const defaultThumbnailURL = "https://i0.wp.com/www.tryoopedia.com/wp-content/uploads/2019/03/wordpress_ping_list.jpg?fit=680%2C380&ssl=1";

class BlogPosts extends Component{
  componentDidMount(){
    this.props.getPosts("verified");
  }
  render(){
    let {posts} = this.props;
    if(!posts){
      return null;
    }
    return(
      <div className = "blog-posts-container">
        <Newest posts = {posts} defaultThumbnailURL = {defaultThumbnailURL}/>
        <Archive posts = {posts} defaultThumbnailURL = {defaultThumbnailURL}/>
      </div>
    )
  }
}

const mapStateToProps = (state)=>({
  posts : state.PostReducer.postData
});

const mapDispatchToProps = (dispatch)=>({
  getPosts : bindActionCreators(getPosts, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogPosts)