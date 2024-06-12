import {Alert} from 'react-native';
import {ADD_POST, ADD_COMMENT} from './actionTypes';
import {setMessage} from './message';
import axios from 'axios';

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
