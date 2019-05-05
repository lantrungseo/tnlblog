import React, {Component, Fragment} from 'react'
//styles
import './style.css'
//components
import Loader from '../../../../shared/Loader/Loader.component'

export default class extends Component{
  constructor(props){
    super(props);
    this.state = {
      show : this.props.show,
      loaderTimeout : false
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.show !== this.props.show){
      this.setState(
        prevState =>({
          ...prevState,
          show : nextProps.show
        })
      )
    }
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState(
        prevState=>({
          ...prevState,
          loaderTimeout: true
        })
      )
    }, 1500)
  }
  render(){
    let {isAuthed, fbLogin, redditLogin} = this.props
    let {loaderTimeout, show} = this.state;
    if(show){
      return(
        <div className = "modal-overlay">
          <span className = "modal-overlay--close__icon fas fa-times"
            onClick = {this.closeDialog}
          >
          </span>
          <div className = "auth-dialog--content card-effect">
            <h2>Please continue</h2>
            {
              (()=>{
                if(!loaderTimeout){
                  return <Loader/>;
                }
                if(!isAuthed){
                  return (
                    <Fragment>
                      <button className = "fb css-ripple" onClick = {e=>fbLogin()}>
                        <span className = "fab fa-facebook-f"></span>
                        &ensp;
                        <span>with Facebook</span>
                      </button>
                      <button className = "reddit css-ripple" onClick = {e=>redditLogin()}>
                        <span className = "fab fa-reddit"></span>
                        &ensp;
                        <span>with Reddit</span>
                      </button>
                    </Fragment>
                  )
                }
                else{
                  return(
                    <Fragment>
                      <a href = "/admin">
                        <img src = {sessionStorage.getItem('user_picture')}/>
                        <p> Admin {sessionStorage.getItem('user_name')}</p> 
                      </a>
                    </Fragment>
                  )
                }
              })()
            }
          </div>
        </div>
      )
    }
    else{
      return null;
    }
  }
  closeDialog = (e)=>{
    e.preventDefault();
    this.setState(
      prevState =>({
        ...prevState,
        show : false
      })
    )
  }
}