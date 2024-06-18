import {ADD_POST, ADD_COMMENT, REQUEST_POSTS} from '../actions/actionTypes';

const initialState = {
  posts: [],
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
    default:
      return state;
  }
};

export default reducer;
