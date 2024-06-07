import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOADING_USER,
  USER_LOADED,
} from './actionTypes';
import axios from 'axios';
import {setMessage} from './message';

export const userLogged = user => {
  return {
    type: USER_LOGGED_IN,
    payload: user,
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
                dispatch(userLogged(user));
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
