import React, {Component, Fragment} from 'react'
//styles
import './style.css'
//components
import AuthDialog from './AuthDialog/AuthDialog.component'
//redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  fbLogin, redditLogin
} from '../../../../B_modules/Auth/Auth.action'

class Auth extends Component{ 
  constructor(props){
    super(props);
    this.state= {
      authDialogOpen : false
    }
  }

  componentDidMount(){
    //for admin auth fallback
    let urlParamsFinder = new URLSearchParams(window.location.search);
    let authDialogOpen = urlParamsFinder.get("auth_open_dialog");
    this.setState(
      (prevState)=>({
        ...prevState,
        authDialogOpen : authDialogOpen
      })
    )
  }

  render(){
    let {isAuthed, fbLogin,redditLogin} = this.props;
    return(
      <Fragment>
        <div className = {`auth-container ${(isAuthed ? 'inactive': '')}`}>
          <span
            className = "auth-button reddit"
            onClick = {e=>redditLogin()}
          >
            <span className = "fab fa-reddit"></span>
          </span>
          <span 
            className = "auth-button facebook"
            onClick = {e=>fbLogin()}
          >
            <span className = "fab fa-facebook-f"></span>
          </span>
        </div>
        <div className = {`user-info-container ${isAuthed ? '' : 'inactive'}`}>
          <img src = {sessionStorage.getItem('user_picture')}/>
          <p>{sessionStorage.getItem('user_name')}</p>
        </div>
        <AuthDialog 
          show = {this.state.authDialogOpen}
          fbLogin = {fbLogin}
          redditLogin = {redditLogin}
          isAuthed ={isAuthed}
        />
      </Fragment>
      
    )
  }
}

const mapStateToProps = (state)=>({
  isAuthed : state.AuthReducer.isAuthed
})
const mapDispatchToProps = (dispatch)=>({
  fbLogin : bindActionCreators(fbLogin, dispatch),
  redditLogin : bindActionCreators(redditLogin, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)