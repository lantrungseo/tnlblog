import React, {Component, Suspense} from 'react';
//router
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
//redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {fbSdkReady, checkLoginStatus} from '../B_modules/Auth/Auth.action'
//components : lazy loading
import PrivateRoute from './shared/PrivateRoute/PrivateRoute.component'
import Loader from './shared/Loader/Loader.component'
const Admin = React.lazy(()=>import('./Admin/Admin.component'))
const Home = React.lazy(()=>import('./Home/Home.component'))
const AuthRedirect = React.lazy(()=>import('./AuthRedirect/AuthRedirect.component'))
const Post = React.lazy(()=>import('./Post/Post.component'))
  

class App extends Component {
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
    return (
      <Router>
        <Suspense fallback = {<Loader/>}>
          <Switch>
            <PrivateRoute exact path = "/admin" component = {Admin}/>
            <Route exact path = "/auth/redirect" component = {AuthRedirect}/>
            <Route exact path = "/posts/:id" render = {
              ({match})=>(
                <Post endpoint = "verified" postID = {match.params.id}/>
              )
            }/>
            <Route exact path = "/" component = {Home}/>
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

const mapStateToProps = (state)=>({
  isFbSdkReady: state.AuthReducer.isFbSdkReady
})

const mapDispatchToProps = (dispatch)=>({
  fbSdkReady : bindActionCreators(fbSdkReady, dispatch),
  checkLoginStatus : bindActionCreators(checkLoginStatus, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(App)