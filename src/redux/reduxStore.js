import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import rootReducer from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
  // eslint-disable-next-line no-shadow
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

// eslint-disable-next-line import/prefer-default-export
export const persistor = persistStore(store);
