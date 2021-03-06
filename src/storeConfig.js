import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'

import { fetchCountriesReducer } from './reducers/countriesReducer'
import { validationReducer } from './reducers/validationReducer'
import { loginReducer } from './reducers/loginReducer'
import { signUpReducer } from './reducers/signUpReducer'
import { authReducer } from './reducers/authReducer'
import { postsReducer } from './reducers/postsReducer'
import { newPostReducer } from './reducers/newPostReducer'
import { countryInfoReducer } from './reducers/countryInfoReducer'
import { postInfoReducer } from './reducers/postInfoReducer'
import { newCommentReducer } from './reducers/newCommentReducer'
import { commentTreeReducer } from './reducers/commentTreeReducer'
import { passwordsReducer } from './reducers/passwordsReducer'

import myHistory from './history'

const routingMiddleware = routerMiddleware(myHistory)

const reducers = combineReducers({
  posts: postsReducer,
  countries: fetchCountriesReducer,
  signUp: signUpReducer,
  user: validationReducer,
  login: loginReducer,
  countryInfo: countryInfoReducer,  
  newPost: newPostReducer,
  auth: authReducer,
  postInfo: postInfoReducer,
  newComment: newCommentReducer,
  commentTree: commentTreeReducer,
  passwords: passwordsReducer,
  router: connectRouter(myHistory),
})

const myStore = createStore(reducers,
  composeWithDevTools(applyMiddleware(logger, thunk, routingMiddleware)))

export default myStore
