import { combineReducers } from 'redux';
import PostReducer from './post/reducer'
import NotificationReducer from './notification/reducer'

const indexReducer = combineReducers({
    posts: PostReducer,
    notifications: NotificationReducer
});

export default indexReducer;