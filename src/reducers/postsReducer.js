import {
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FAVOURITE_POST_BEGIN,
  FAVOURITE_POST,
  UNFAVOURITE_POST,
  FAVOURITE_POST_FAILURE
} from '../actions/postsActions'

const initialState = {
  successful: false,
  loading: false,
  favouriteLoading: false,
  favouriteSuccessful: false,
  error: "",
  posts: []
}

export function postsReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_POSTS_BEGIN:
      return {
        ...state,
        loading: true
      }
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        successful: true,
        posts: action.payload.posts,
      }
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        successful: false,
        error: action.payload.error
      }

    case FAVOURITE_POST_BEGIN:

      return {
          ...state,
          favouriteLoading: true                
      }

    case FAVOURITE_POST: 
      let updatedPosts = state.posts.map(post => {
          if(post.postId === action.payload.data.postId){  
            return { 
              ...post,
              favourite: true 
            };
          }
          return post;
      })
      return {
        ...state,    
        posts: updatedPosts,    
        favouriteLoading: false
      }

    case UNFAVOURITE_POST:
      updatedPosts = state.posts.map(post => {
          if(post.postId === action.payload.data.postId){   
            return { 
              ...post,
              favourite: false 
            }
          }
          return post
      })
      return {
        ...state,    
        posts: updatedPosts,    
        favouriteLoading: false
      }     

    case FAVOURITE_POST_FAILURE:

      return {
          ...state,
          favouriteLoading: false,
          error: action.payload.error                
      }

    default:
      return {
        ...state
      }
  }
}
