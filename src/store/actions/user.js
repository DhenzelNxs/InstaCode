import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOADING_USER,
  USER_LOADED,
  SET_PROFILE_IMAGE
} from './actionTypes';
import axios from 'axios';
import {setMessage} from './message';

export const userLogged = user => {
  return {
    type: USER_LOGGED_IN,
    payload: user,
  };
};

export const setProfileImage = image => {
  return {
    type: SET_PROFILE_IMAGE,
    payload: image,
  };
};

export const logout = () => {
  return {
    type: USER_LOGGED_OUT,
  };
};

export const createUser = user => {
  return dispatch => {
    axios
      .post('/users', {
        name: user.name,
        email: user.email,
        password: user.password,
        profile_image: null,
      })
      .catch(err => {
        dispatch(
          setMessage({
            title: 'Erro',
            text: `Ocorreu um erro inesperado!! (${err})`,
          }),
        );
      })
      .then(res => {
        dispatch(
          setMessage({
            title: 'Sucesso!',
            text: 'Usuário criando com sucesso!!',
          }),
        );
        user.toLogin('Auth');
      });
  };
};

export const loadingUser = () => {
  return {
    type: LOADING_USER,
  };
};

export const userLoaded = () => {
  return {
    type: USER_LOADED,
  };
};

export const login = user => {
  return dispatch => {
    dispatch(loadingUser());
    axios
      .get('/users')
      .catch(err => {
        dispatch(
          setMessage({
            title: 'Erro',
            text: `Ocorreu um erro inesperado!! (${err})`,
          }),
        );
      })
      .then(res => {
        if (res.data.users.length >= 0) {
          const data = res.data.users;
          data.map(response => {
            if (response.email === user.email) {
              if (response.password === user.password) {
                user.password = null;
                user.name = response.name;
                dispatch(userLogged({
                  name: response.name,
                  email: response.email,
                  password: response.password,
                  profile_image: response.profile_image,
                  id: response.id
                }));
                dispatch(userLoaded());
              } else {
                dispatch(
                  setMessage({
                    title: 'Error',
                    text: 'Senha incorreta!',
                  })
                )
                user.password = null;
              }
              
            }
          });
        } else {
          dispatch(userLoaded());
          dispatch(
            setMessage({
              title: 'Error',
              text: 'Email ou senha incorretos!',
            }),
          );
        }
      });
  };
};

export const updateProfile = profile => {
  return dispatch => {
    axios
      .patch(`/update_profile_image/${profile.profile_id}`, {profile_image: profile.profile_image})
      .catch(err => {
        dispatch(
          setMessage({
            title: 'Erro',
            text: `Ocorreu um erro inesperado!! (${err})`,
          }),
        );
      })
      .then(res => {
        dispatch(
          setMessage({
            title: 'Sucesso!',
            text: `Perfil atualizado com sucesso`,
          }),
        )
      });
      dispatch(setProfileImage({profile_image: profile.profile_image}))
  };
};

