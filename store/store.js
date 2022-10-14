import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import localReducer from './features/local/localSlice';
import subReducer from './features/sub/subSlice';

const localPersistConfig = {
  key: 'local',
  storage: AsyncStorage,
  whitelist: ['theme', 'sort', 'infoDisplay', 'infoNextBill', 'channelId'],
}

const subPersistConfig = {
  key: 'sub',
  storage: AsyncStorage,
  whitelist: ['items'],
}

export const store = configureStore({
  reducer: {
    local: persistReducer(localPersistConfig, localReducer),
    sub: persistReducer(subPersistConfig, subReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    })
})
export const persistor = persistStore(store)