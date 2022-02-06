import { combineReducers } from 'redux';
import posts from './postsReducers';
import auth from './authReducers';

export default combineReducers({
  posts,
  auth
});
