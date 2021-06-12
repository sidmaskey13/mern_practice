import { combineReducers } from 'redux';
import PostReducer from './post/reducer'
import NotificationReducer from './notification/reducer'
import AuthcationReducer from './auth/reducer'
import CategoryReducer from './category/reducer'
import UsersReducer from './users/reducer'

const indexReducer = combineReducers({
    posts: PostReducer,
    notifications: NotificationReducer,
    auth: AuthcationReducer,
    category: CategoryReducer,
    users: UsersReducer,
});

export default indexReducer;