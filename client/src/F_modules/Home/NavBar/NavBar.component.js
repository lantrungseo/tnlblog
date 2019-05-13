import React, {Component} from 'react'
//navbar styles
import './style.css'
//components
import SearchBox from './SearchBox/SearchBox.component'
import Auth from './Auth/Auth.component'
import SubNav from './SubNav/SubNav.component'

export default class NavBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      isMobileMenuOpen: false
    }
  }

  render(){
    return (
      <div className = "navbar-container card-effect">
        <div className = "nav">
          <div className = "nav__link">
            <a href = "https://lantrungsir.github.io">Author</a>
            <a href = "/">Home</a>
          </div>
          <div className = "search-container">
            <SearchBox/>
          </div>
          <Auth/>
          <div className = "nav-content">
              <h2 className = "logo">WHAT A BLOG</h2>
              <SubNav/>
          </div>
        </div>

        <div className = "mobile-nav">
          <a className = "logo">
              WHAT A BLOG
          </a>
          <a className = {`mobile-nav__icon--open ${(this.state.isMobileMenuOpen ? "fas fa-times" : "fas fa-bars")}`}
            onClick = {e=>this.openMobileMenu()}
          ></a>
          <div className = {`mobile-nav__content ${(this.state.isMobileMenuOpen ? "css-slide-down" : "css-slide-up")}`}>
              <div className = "search-container">
                <SearchBox/>
              </div>
              <Auth/>
              <SubNav/>
          </div>
        </div>
      </div>
    )
  }

  openMobileMenu = ()=>{
    this.setState(
      (prevState)=>({
        ...prevState,
        isMobileMenuOpen : !prevState.isMobileMenuOpen
      })
    )
  }
}