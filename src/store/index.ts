import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import menuSlice from './menu/menu.reducer';
import postSlice from './post/post.reducer';
import slideSlice from './slide/slide.reducer';
import catalogSlice from './catalog/catalog.reducer';
import footerSlice from './footer/footer.reducer';
import settingSlice from './setting/setting.reducer';
import localeSlice from './locale/locale.reducer';
import productSlice from './product/product.reducer';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import authSlice from './auth/auth.reducer';
const createNoopStorage = () => ({
  // eslint-disable-next-line no-unused-vars
  getItem(_key: any) {
    return Promise.resolve(null);
  },
  // eslint-disable-next-line no-unused-vars
  setItem(_key: any, value: any) {
    return Promise.resolve(value);
  },
  // eslint-disable-next-line no-unused-vars
  removeItem(_key: any) {
    return Promise.resolve();
  },
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();
const authPersistConfig = {
  key: 'auth-yaly-fabric',
  storage,
  whitelist: ['token', 'user'],
};
export const store = configureStore({
  reducer: {
    menu: menuSlice,
    post: postSlice,
    slide: slideSlice,
    catalog: catalogSlice,
    footer: footerSlice,
    setting: settingSlice,
    auth: authSlice,
    locale: localeSlice,
    product: productSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;