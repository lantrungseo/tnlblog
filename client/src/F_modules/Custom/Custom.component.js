import React, {Component} from 'react'
//components
import Publish from '../shared/Publish/Publish.component'

export default class extends Component{
  render(){
    return (
      <div>
        <Publish endpoint = "queue"/>
      </div> 
    )
  }
}