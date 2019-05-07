import React, {Component} from 'react'
//components
import Loader from '../shared/Loader/Loader.component'

export default class extends Component{
  componentDidMount(){
    alert("Hello");
    this.timer = setTimeout(()=>{
      if(window.opener){
        window.opener.redditCallback(window.location.hash.substr(1));
      }
      window.close();
    }, 1500) 
  }
  componentWillUnmount(){
    clearTimeout(this.timer);
  }
  render(){
    return <Loader/>
  }
}