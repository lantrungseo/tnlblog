import React, {Component, Fragment} from 'react'
//styles
import './style.css'

export default class extends Component{
  render(){
    //remember to recalc the width of the anchor and line alignment in ./style.css
    return(
      <Fragment>
        <div className="header">
          <a href="#">Lưu bút</a>
          <span className="line"></span>
        </div>
        <div className = "mobile-subnav">
          <h2>Menu</h2>
          <a className = "mobile-nav__link" href = "https://lantrungsir.github.io">
            Tác giả
          </a>
          <hr/>
          <a className = "mobile-nav__link" href = "/tnlautograph/write">
            Viết cho Trung
          </a>
          <hr/>
        </div>
      </Fragment>
      
    )
  }
}