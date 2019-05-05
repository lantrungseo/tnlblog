import React, {Component, Fragment} from 'react'
//styles
import './style.css'

export default class extends Component{
  render(){
    //remember to recalc the width of the anchor and line alignment in ./style.css
    return(
      <Fragment>
        <div className="header">
          <a href="#">Soccer</a>
          <a href="#">School</a>
          <a href="#">Readers' opinions</a>
          <span className="line"></span>
        </div>
        <div className = "mobile-subnav">
          <h2>Menu</h2>
          <a className = "mobile-nav__link" href = "https://lantrungsir.github.io">
            Author
          </a>
          <hr/>
          <a className = "mobile-nav__link" href = "/admin">
            Admin
          </a>
          <hr/>
        </div>
      </Fragment>
      
    )
  }
}