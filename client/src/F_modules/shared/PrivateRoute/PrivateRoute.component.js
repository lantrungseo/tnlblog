import React, {Component} from 'react'
//redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fbSdkReady, checkLoginStatus} from '../../../B_modules/Auth/Auth.action'
//components
import {Route, Redirect} from 'react-router-dom'
import Loader from '../Loader/Loader.component'

class PrivateRoute extends Component {
  componentDidMount(){
    window.addEventListener("FBReady", this.checkLoginStatus)
  }

  componentWillUnmount(){
    window.removeEventListener("FBReady", this.checkLoginStatus)
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
    let {component: Component, isAuthed, location} = this.props;
    if(isAuthed === undefined){
      return <Loader/>
    }
    if(isAuthed === false){
      return(
        <Redirect
          to = {{
            pathname : "/",
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
  //custom methods
  checkLoginStatus = ()=>{
    this.props.fbSdkReady();
    this.props.checkLoginStatus();
  }
}

const mapStateToProps = (state)=>({
  isAuthed : state.AuthReducer.isAuthed
})

const mapDispatchToProps = (dispatch)=>({
  fbSdkReady : bindActionCreators(fbSdkReady, dispatch),
  checkLoginStatus : bindActionCreators(checkLoginStatus, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)