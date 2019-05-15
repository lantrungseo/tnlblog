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
    if(this.props.isFbSdkReady){
      this.props.checkLoginStatus();
      return;
    }
    window.addEventListener("FBReady", this.props.fbSdkReady);
  }

  componentWillUnmount(){
    window.removeEventListener("FBReady", this.props.fbSdkReady)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps !== this.props){
      if(nextProps.isFbSdkReady){
        this.props.checkLoginStatus();
      }
    }
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
}

const mapStateToProps = (state)=>({
  isAuthed : state.AuthReducer.isAuthed,
  isFbSdkReady: state.AuthReducer.isFbSdkReady
})

const mapDispatchToProps = (dispatch)=>({
  fbSdkReady : bindActionCreators(fbSdkReady, dispatch),
  checkLoginStatus : bindActionCreators(checkLoginStatus, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)