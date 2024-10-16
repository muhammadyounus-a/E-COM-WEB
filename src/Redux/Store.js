import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartSlice from './CartSlice';


const persistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items'],
};

const persistedCartReducer = persistReducer(persistConfig,cartSlice);

// Configure the Redux store
export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],  
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);