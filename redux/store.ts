
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { christmasListApi } from './services/christmasList';

export const store = configureStore({
  reducer: {
    [christmasListApi.reducerPath]: christmasListApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(christmasListApi.middleware),
});

setupListeners(store.dispatch);
