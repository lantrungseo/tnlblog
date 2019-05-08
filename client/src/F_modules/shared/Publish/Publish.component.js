import React, {Component, Fragment} from 'react'
//styles
import './style.css'
//components
import BottomNav from '../BottomNav/BottomNav.component'
import Recaptcha from 'react-recaptcha'
import Media from './Media/Media.component'
//redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {publish} from '../../../B_modules/Publish/Publish.action'

const initialState = {
  title: "",
  contents: [
    {
      imageIndex: -1, 
      content: ""
    }
  ],
  imgs: []
}

const maxImgCount = 10;

class Publish extends Component{
  constructor(props){
    super(props);
    this.state = initialState;
  }
  componentWillReceiveProps(nextProps){
    let {publishState: cur} = this.props;
    let {publishState: next} = nextProps;
    if(cur !== next){
      if(next === "fail"){
        alert("fail to publish post :(");

      }
      if(next === "succeed"){
        alert("successfully publish post");
        this.redo();
      }
    }
  }
  render(){
    let {publishState} = this.props;
    return(
      <div className = "publish-container card-effect">
        <div className = "publish-header">
            <h4>Create post</h4>
        </div>
        <div className = "publish-content"> 
            <input 
              placeholder = "....Post title here" type = "text"
              onChange = {e=>this.saveData('title', e.target.value)}
            />
            <div className = "publish-text">
              <div 
                contentEditable = {true} className = "textarea"
                placeholder = "....Content here"
                onBlur = {e=>this.saveData('contents', e.target.innerHTML, 0)}
              ></div>
              {
                this.state.contents.map(
                  (chunk, index)=>{
                    if(index ===0){
                      return null;
                    }
                    let {imgs} = this.state;
                    return (
                      <Fragment key = {index}>
                        <Media 
                          image = {imgs[chunk.imageIndex]} 
                          num = {chunk.imageIndex}
                          eraseImage = {this.eraseImage}
                        />
                        <div 
                          contentEditable = {true} className = "textarea"
                          placeholder = "....Continue to write here"
                          onBlur = {e=>this.saveData('contents', e.target.innerHTML, index)}
                        ></div>
                      </Fragment>
                    )
                  }
                )
              }
            </div>
        </div>
        <div className = "publish-functional">
          <div className = "card-effect publish-photos">
            <input type = "file" 
              onChange = {e=>this.saveData('imgs', e.target)}
              accept = "image/*"
            />
            <span className = "fas fa-images"> Photos </span>
          </div>
        </div>
        <Recaptcha 
            size = "normal"
            sitekey = "6LeDAZ4UAAAAAMysqNfSY1ni1ryieo69x6nlacIM"
            render = "explicit"
            badge = "inline"
            className = "recaptcha"
            verifyCallback = {this.onRecaptchaResponse}
          />
        <BottomNav>
          <span onClick = {this.publishPost}>
            <i
              className = {
                (()=>{
                  switch(publishState){
                    case "fail": return "far fa-sad-tear"
                    case "start" : return "fas fa-spinner fa-spin"
                    case "succeed": return "far fa-smile"
                    default: return "fas fa-upload"
                  }
                })()
              }>
            </i>
              &ensp;Publish
          </span>
          <span className = "fas fa-redo" onClick = {this.redo}>&ensp; Redo</span>
        </BottomNav>
      </div>
    )
  }
  //add new parts started by an image
  addNewChunk = ()=>{
    this.setState(
      (prevState)=>{
        let newState = {...prevState};
        newState['contents'].push({
          imageIndex : prevState.imgs.length-1,
          content : ""
        })
        return newState
      }
      
    )
  }
  //recaptcha response
  onRecaptchaResponse = (token)=>{
    this.saveData("recaptchaToken", token)
  }
  //check dupllcated images
  checkDuplicateImage = (img)=>{
    return this.state.imgs.filter(
      ({file})=>( 
        img.name === file.name &&
        img.lastModified === file.lastModified &&
        img.size === file.size &&
        img.type === file.type
      )
    ).length > 0
  }
  //saving data
  saveData = (key, data, index = 0)=>{
    if(!data){
      return;
    }
    switch(key){
      case "imgs":{
        if(this.checkDuplicateImage(data.files[0])){
          alert("you have chosen this image before");
          data.value = null;
          return;
        }
        if(this.state.imgs.length >= maxImgCount){
          alert("only 10 images allowed");
          data.value = null;
          return;
        }
        let localUrl = URL.createObjectURL(data.files[0]);
        let image = new Image();
        image.onload = ()=>{
          if(image.width < 400 || image.height < 300){
            alert("uploaded image must be aleast 500*400");
          }
          else{
            this.setState(
              prevState =>({
                ...prevState,
                [key] : [...prevState[key], {
                  localUrl : localUrl,
                  file : data.files[0]
                }]
              })
            )
            //after saving image, please add a new chunk start with this image
            this.addNewChunk();
          }
          data.value = null;
        }
        image.src = localUrl;
        return;
      }
      case 'contents':{
        this.setState(
          (prevState)=>{
            let newState = {...prevState};
            newState[key][index].content = data
            return newState;
          }
        )
        return;
      }
      default:{
        this.setState(
          prevState =>({
            ...prevState,
            [key] : data
          })
        )
        return;
      }
    }
  }
  //erase image
  eraseImage = (index)=>{
    let {imgs, contents}  = this.state;
    imgs.splice(index, 1);
    //because imgs[index] was spliced from the array, so we should decrease the imageIndex onwards
    for(let i = index+1; i < contents.length; ++i){
      --contents[i].imageIndex;
    }
    //only the images was deleted, not the contents being written
    contents[index].imageIndex =  -1;
    this.setState(
      prevState=>({
        ...prevState,
        imgs,
        contents
      })
    )
  }
  //redo all the things
  redo = ()=>{
    window.location.reload();
  }
  //publish post
  publishPost = ()=>{
    let {isInQueue} = this.props;
    this.props.publish(this.state, isInQueue);
  }
  
}

const mapStateToProps = (state)=>({
  publishState: state.PublishReducer.publishState
})

const mapDispatchToProps = (dispatch)=>({
  publish: bindActionCreators(publish, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Publish)