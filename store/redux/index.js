import { createWrapper } from 'next-redux-wrapper'
import { configureStore } from '@reduxjs/toolkit'
import reducers from './reducers';

const makeStore = (context) => configureStore({ reducer: reducers })
export const wrapper = createWrapper(makeStore, { debug: true });



//https://cotak.tistory.com/164