import React, {Component, Fragment} from 'react'
//styles
import './style.css'
//components
import FloatingButton from './FloatingButton/FloatingButton.component'

export default class extends Component{
  constructor(props){
    super(props);
    this.state = {
      isMenuOpen : false
    } 
  }
  render(){
    return(
      <Fragment>
        <FloatingButton onClick = {this.toggleMenu}/>
        {
          (()=>{
            if(this.state.isMenuOpen){
              return (
              <div className = "floating-menu--container card-effect">
                {this.props.children}
              </div>
              )
            }
            else{
              return null;
            }
          })()
        }
      </Fragment>
    )
  }
  toggleMenu = (e)=>{
    e.preventDefault();
    this.setState(
      (prevState)=>({
        ...prevState,
        isMenuOpen : !prevState.isMenuOpen
      })
    )
  }
}