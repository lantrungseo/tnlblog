import React, {Component} from 'react';
//admin page style
import './style.css';
//components
import Loader from '../shared/Loader/Loader.component'
import {Redirect} from 'react-router-dom'
import FloatingMenu from '../shared/FloatingMenu/FloatingMenu.component'
import PostManage from './PostManage/PostManage.component'
//redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {checkAdminStatus} from '../../B_modules/Admin/Admin.action'

class Admin extends Component{
  componentDidMount(){
    let {checkAdminStatus} = this.props;
    checkAdminStatus();
  }

  render(){
    let {isAdmin} = this.props;
    if(isAdmin === undefined){
      return <Loader/>
    }
    if(isAdmin === false){
      alert("You are not an admin");
      return <Redirect to = "/"/>
    }
    if(isAdmin === true){
      return (
        <div className = "admin-container">
            <FloatingMenu>
                <a href = "#post">Posts</a>
                <a href = "#">Users</a>
                <a href = "/">Home</a>
            </FloatingMenu>
            <PostManage/>
        </div>
      );
    }
  }
}

const mapStateToProps = (state)=>({
  isAdmin : state.AdminReducer.isAdmin
});
const mapDispatchToProps = (dispatch)=>({
  checkAdminStatus: bindActionCreators(checkAdminStatus, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Admin)
