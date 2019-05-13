import React, {Component} from 'react'
//redux
import {connect} from 'react-redux'
//components
import {Route, Redirect} from 'react-router-dom'
import Loader from '../Loader/Loader.component'

class PrivateRoute extends Component {
  constructor(props){
    super(props);
    this.state = {
      authCheckTimeOut: false
    }
  }
  componentDidMount(){
    this.timer = setTimeout(()=>{
      this.setState(
        prevState =>({
          ...prevState,
          authCheckTimeOut : true
        })
      )
    }, 1500)
  }
  componentWillUnmount(){
    clearTimeout(this.timer);
  }
  render(){
    let {component, ...rest} = this.props;
    return (
      <Route
        {...rest}
        render = {this.routeRender}
      />
    )
  }
  routeRender = (componentProps)=>{
    let {component: Component, isAuthed, location} = this.props
    if(isAuthed === undefined){
      if(this.state.authCheckTimeOut){
        isAuthed = false;
      }
      else{
        return <Loader/>
      }
    }
    if(isAuthed === false){
      return(
        <Redirect
          to = {{
            pathname : "/tnlautograph",
            state: {
              from : location
            },
            search : `?auth_open_dialog=true&redirect_to=${location.pathname}`
          }}
        />
      )
    }
    if(isAuthed === true){
      return(
        <Component {...componentProps}/>
      )
    }
  }
}

const mapStateToProps = (state)=>({
  isAuthed : state.AuthReducer.isAuthed
})

const mapDispatchToProps = ()=>({})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)