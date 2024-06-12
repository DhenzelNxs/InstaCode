import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOADING_USER,
  USER_LOADED,
  SET_PROFILE_IMAGE
} from '../actions/actionTypes';

const initialState = {
  name: null,
  email: null,
  isLoading: false,
  profile_image: "",
  id: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        profile_image: action.payload.profile_image,
        id: action.payload.id
      };
    case USER_LOGGED_OUT:
      return {
        ...state,
        name: null,
        email: null,
      };
    case LOADING_USER:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
      };
    case SET_PROFILE_IMAGE:
      return {
        ...state,
        profile_image: action.payload.profile_image,
      }
    default:
      return state;
  }
};

export default reducer;
