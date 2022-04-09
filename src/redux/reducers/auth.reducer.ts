import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '~/redux/store/store'

interface Auth {
  username: string | null | undefined
  active: boolean
}

type AuthState = {
  auth: Auth
}

const initialState: AuthState = {
  auth: {
    username: null,
    active: false,
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<Auth>) => {
      return {
        auth: { ...action.payload, active: true },
      }
    },

    getUser: (state, action: PayloadAction<Auth>) => {
      return {
        auth: { ...action.payload, active: true },
      }
    },
  },
})

export const { setUser, getUser } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer
