import React, {Component} from 'react'
//styles
import './style.css'
//components
import NavBar from './NavBar/NavBar.component'
import BlogPosts from './BlogPosts/BlogPosts.component'

export default class extends Component{
  render(){
    return (
      <div className = "home-container">
          <NavBar/>
          <BlogPosts/>
      </div>
    )
  }
}