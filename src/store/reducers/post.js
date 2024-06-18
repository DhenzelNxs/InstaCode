import {
  ADD_POST,
  ADD_COMMENT,
  REQUEST_POSTS,
  LOADING_POSTS,
  POSTS_LOADED 
} from '../actions/actionTypes';

const initialState = {
  posts: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat({
          ...action.payload,
        }),
      };
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.postId) {
            if (post.comments) {
              post.comments = post.comments.concat(action.payload.comment);
            }
          } else {
            post.comments = [action.payload.comment];
          }
          return post;
        }),
      };
    case REQUEST_POSTS:
      return {
        ...state,
        posts: action.payload,
      }
    case LOADING_POSTS:
      return {
        ...state,
        loading: true
      }
    case POSTS_LOADED:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
};

export default reducer;
