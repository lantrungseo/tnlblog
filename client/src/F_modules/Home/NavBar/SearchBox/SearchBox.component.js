import React, {Component} from 'react'
//styles
import './style.css'
//redux
import {connect} from 'react-redux'

class SearchBox extends Component{
  render(){
    return(
        <div className="search">
          <input type="text" className="searchTerm fas fa-search" placeholder="&#xf002; Please search..."/>
        </div>
    )
  }
}

const mapStateToProps = ()=>({})
const mapDispatchToProps = ()=>({})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)