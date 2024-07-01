'use client';

import React from 'react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { store } from './index';
// import { changeLanguage } from './translation/translation.reducer';

persistStore(store);

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  // const storeRef = useRef<any>(store.dispatch);
  // if (!storeRef.current) {
  //   storeRef.current = store.dispatch;
  //   storeRef.current?.dispatch(changeLanguage('en_US'));
  // }
  return <Provider store={store}>{children}</Provider>;
}
