import { combineReducers } from 'redux';
import PostReducer from './post/reducer'
import NotificationReducer from './notification/reducer'
import AuthcationReducer from './auth/reducer'

const indexReducer = combineReducers({
    posts: PostReducer,
    notifications: NotificationReducer,
    auth: AuthcationReducer,
});

export default indexReducer;