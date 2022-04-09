import React, { useEffect, useState } from 'react'

import { ListPosts } from '~/components/ListPosts'
import { Loader } from '~/components/Loader'
import { Posts } from '~/components/Posts'
import ScrollToTop from '~/components/ScrollToTop'
import useInfiniteScroll from '~/hooks/useInfiniteScroll'
import { selectArticles } from '~/redux/reducers/articles.reducer'
import { useAppDispatch, useAppSelector } from '~/redux/store/store'
import { fetchArticles } from '~/redux/thunks/articles.thunk'

import styles from './main.module.scss'

export const Main = () => {
  const dispatch = useAppDispatch()
  const [limit, setLimit] = useState(10)
  const selectorArticles = useAppSelector(selectArticles)

  const [, setIsFetching] = useInfiniteScroll({
    callback: fetchMoreListItems,
  })

  function fetchMoreListItems() {
    setTimeout(() => {
      setLimit(limit + 10)
      dispatch(fetchArticles(limit))
    }, 2000)

    setIsFetching(false)
  }

  useEffect(() => {
    dispatch(fetchArticles(limit))
  }, [])

  return (
    <div className={styles.container}>
      <Posts>
        <ScrollToTop />

        {selectorArticles.status === 'loading' && <Loader />}

        {selectorArticles.articles.map(
          ({ username, content, created_datetime, title, id }) => {
            return (
              <ListPosts
                id={id}
                key={id}
                username={username}
                created_datetime={created_datetime}
                title={title}
                content={content}
              />
            )
          }
        )}
      </Posts>
    </div>
  )
}
