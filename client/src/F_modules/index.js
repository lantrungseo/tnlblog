import React, {Component} from 'react';
//router
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
//components
import PrivateRoute from './shared/PrivateRoute/PrivateRoute.component'
import Admin from './Admin/Admin.component'
import Home from './Home/Home.component'
import AuthRedirect from './AuthRedirect/AuthRedirect.component'
//redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {fbSdkReady, checkLoginStatus} from '../B_modules/Auth/Auth.action'

class App extends Component {
  componentDidMount(){
    window.addEventListener("FBReady", this.checkLoginStatus)
    this.props.checkLoginStatus("reddit")
  }
  componentWillUnmount(){
    window.removeEventListener("FBReady", this.checkLoginStatus)
  }
  render(){
    return (
      <Router>
        <Switch>
          <PrivateRoute exact path = "/admin" component = {Admin}/>
          <Route exact path = "/" component = {Home}/>
          <Route exact path = "/auth/redirect" component = {AuthRedirect}/>
        </Switch>
      </Router>
    );
  }
  //custom methods
  checkLoginStatus = ()=>{
    this.props.fbSdkReady();
    this.props.checkLoginStatus("fb")
  }
}

const mapStateToProps = ()=>({});
const mapDispatchToProps = (dispatch)=>({
  fbSdkReady : bindActionCreators(fbSdkReady, dispatch),
  checkLoginStatus : bindActionCreators(checkLoginStatus, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(App)