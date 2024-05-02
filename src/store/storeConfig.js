import {legacy_createStore as createStore, combineReducers} from 'redux';
import userReducer from './reducers/user';

const reducers = combineReducers({
  user: userReducer,
});

const storeConfig = () => {
  return createStore(reducers);
};

export default storeConfig;
