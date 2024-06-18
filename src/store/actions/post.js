import {Alert} from 'react-native';
import {REQUEST_POSTS, POSTS_LOADED, LOADING_POSTS} from './actionTypes';
import {setMessage} from './message';
import axios from 'axios';

export const requestPosts = posts => {
  return {
    type: REQUEST_POSTS,
    payload: posts
  };
};

export const loadingPosts = () => {
  return {
    type: LOADING_POSTS
  };
};

export const postsLoaded = () => {
  return {
    type: POSTS_LOADED,
  };
};

export const AddPost = post => {
  return dispatch => {
    axios
      .post('/posts', {...post})
      .catch(err => {
        dispatch(Alert.alert('Erro!', `${err}`));
      })
      .then(res => console.log(res.data));
  };
  //return {
  //  type: ADD_POST,
  //  payload: post,
  //};
};

export const addComment = payload => {
  return dispatch => {
    axios
      .get(`/posts/getpost/${payload.postId}`)
      .catch(err => {
        dispatch(Alert.alert('Erro', `${err}`));
      })
      .then(res => {
        const comments = res.data.posts.comments || [];
        comments.push(payload.comment);
        axios
          .patch(`/posts/patchpost/${payload.postId}`, {comments})
          .then(res => {
            dispatch(payload.requestFunc(true));
          });
      });
  };
};

export const requestPost = () => {
  return async dispatch => {
    dispatch(loadingPosts())
    await axios
      .get('/posts')
      .then(response => {
        dispatch(requestPosts(response.data.posts.reverse()))
      })
      .catch(error => {
        dispatch(Alert.alert('Error', `${error}`));
      });
      dispatch(postsLoaded())
  }
};
