import React from 'react';
import ReactDOM from 'react-dom';
//serviceworker
import * as serviceWorker from './serviceWorker';
// root component
import App from './F_modules'
// reducers
import AuthReducer from './B_modules/Auth/Auth.reducer'
import AdminReducer from './B_modules/Admin/Admin.reducer'
import PublishReducer from './B_modules/Publish/Publish.reducer'
import PostReducer from './B_modules/Post/Post.reducer'
//Provider, stores, applyMiddlewares, thunk
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

//stores and root reducers
const rootReducer = combineReducers({
  AuthReducer, AdminReducer, PublishReducer,
  PostReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));
//other middlewares needed

//rendering
ReactDOM.render(
  <Provider store = {store}>
      <App/>
  </Provider>
,document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
