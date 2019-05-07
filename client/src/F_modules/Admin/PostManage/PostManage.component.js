import React, {Component} from 'react'
//styles
import './style.css'
//components

import Publish from '../../shared/Publish/Publish.component'
//redux
import {connect} from 'react-redux'

class PostManage extends Component{
  render(){
    return (
      <div className = "post-manage-container" id = "post">
        <Publish isInQueue = {false}/>
      </div>
    )
  }
}

const mapStateToProps = ()=>({})

const mapDispatchToProps = ()=>({})

export default connect(mapStateToProps, mapDispatchToProps)(PostManage);