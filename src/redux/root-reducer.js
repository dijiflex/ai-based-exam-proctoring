import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userReducer';
import notificationSlice from './notificationSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['notification']
};
const rootReducer = combineReducers({
  user: userReducer,
  notification: notificationSlice
});

export default persistReducer(persistConfig, rootReducer);
