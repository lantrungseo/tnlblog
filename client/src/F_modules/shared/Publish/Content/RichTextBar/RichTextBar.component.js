import React, {Component} from 'react'
//styles
import './style.css'

const richTextButtons = [
  {command : "bold", icon : "bold"},
  {command : "italic", icon : "italic"},
  {command : "underline", icon : "underline"},
  {command : "justifyLeft", icon : "align-left"},
  {command: "justifyRight", icon : "align-right"},
  {command: "justifyCenter", icon : "align-center"}
]

export default class extends Component{
  render(){
    return(
      <div className = "rich-text-control-bar">
        {richTextButtons.map(
          ({command, icon}, index)=>(
            <button 
              key = {index}
              className = {`fas fa-${icon}`}
              onClick = {()=>this.execRichText(command)}
            ></button>
          )
        )}
      </div>  
    )
  }
  execRichText = (command)=>{
    document.execCommand(command, true);
    return;
  }
}