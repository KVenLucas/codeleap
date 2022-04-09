import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '~/redux/store/store'
import { fetchArticles } from '~/redux/thunks/articles.thunk'
import { relativeTimeFromDates } from '~/utils/relative.time.format'

export interface Arcticle {
  id: number
  username: string
  created_datetime: string
  title: string
  content: string
}

export type ArticlesState = {
  articles: Arcticle[]
  status: 'idle' | 'loading'
  error: string | null
}

const initialState: ArticlesState = {
  articles: [],
  status: 'idle',
  error: null,
}

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,

  reducers: {
    addArticle: (state, action: PayloadAction<Arcticle>) => {
      const articles = [...current(state.articles)]

      state.articles = []

      state.articles.push(action.payload, ...articles)

      return state
    },

    deleteArticle: (state, action: PayloadAction<Exclude<Arcticle['id'], undefined>>) => {
      state.articles.forEach((T, index) => {
        if (T.id === action.payload) {
          state.articles.splice(index, 1)
        }
      })
    },

    updateArticle: (state, action: PayloadAction<Arcticle>) => {
      state.articles.forEach((T, index) => {
        if (T.id === action.payload.id) {
          state.articles.splice(index, 1, { ...action.payload })
        }
      })
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(fetchArticles.fulfilled, (state, { payload }) => {
      const data: Arcticle[] = payload.map(
        ({ id, title, content, created_datetime, username }) => ({
          username,
          id,
          title,
          content,
          created_datetime: relativeTimeFromDates(new Date(created_datetime)),
        })
      )

      state.articles = []

      const newArticles = [...data]

      state.articles.push(...newArticles)
      state.status = 'idle'
    })

    builder.addCase(fetchArticles.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message
      state.status = 'idle'
    })
  },
})

export const { addArticle, updateArticle, deleteArticle } = articlesSlice.actions

export const selectArticles = (state: RootState) => state.articles

export default articlesSlice.reducer
