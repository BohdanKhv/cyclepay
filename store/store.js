import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import localReducer from './features/local/localSlice';
import subReducer from './features/sub/subSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['local', 'sub'],
}

const local = persistReducer(persistConfig, localReducer);
const sub = persistReducer(persistConfig, subReducer);

export const store = configureStore({
  reducer: {
    local: local,
    sub: sub,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})
export const persistor = persistStore(store)