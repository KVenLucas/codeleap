import { createAsyncThunk } from '@reduxjs/toolkit'

import api from '~/services/api'

import { Arcticle } from '../reducers/articles.reducer'

type FetchArticlesError = {
  message: string
}

export const fetchArticles = createAsyncThunk<
  Arcticle[],
  number,
  { rejectValue: FetchArticlesError }
>(
  'articles/fetch',

  async (limit: number, thunkApi) => {
    const response = await api.get<{ results: Arcticle[] }>(`?limit=${limit}`)

    if (response.status !== 200) {
      return thunkApi.rejectWithValue({
        message: 'Failed to fetch articles',
      })
    }

    return response.data.results
  },
  {}
)
