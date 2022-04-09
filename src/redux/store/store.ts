import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers } from 'redux'

import authReducer from '~/redux/reducers/auth.reducer'

import articlesReducer from '../reducers/articles.reducer'
import { loadState } from '../reducers/browser.reducer'

const reducers = combineReducers({
  articles: articlesReducer,
  auth: authReducer,
})

export const store = configureStore({
  devTools: true,
  reducer: reducers,

  preloadedState: loadState(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
