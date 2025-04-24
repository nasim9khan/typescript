import { configureStore } from '@reduxjs/toolkit';
import { createWrapper }   from 'next-redux-wrapper';
import { productsApi }      from '../services/productsApi';

// 1. Factory for per-request stores
export const makeStore = () =>
  configureStore({
    reducer: {
      [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (gDM) => gDM().concat(productsApi.middleware),
  });

// 2. Create a singleton for local imports (optional)
export const store = makeStore();

// 3. Wrapper for Next.js SSR/SSG
export type AppStore = ReturnType<typeof makeStore>;
export const wrapper = createWrapper<AppStore>(makeStore);
