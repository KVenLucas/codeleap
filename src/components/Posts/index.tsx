import { yupResolver } from '@hookform/resolvers/yup'
import React, { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, NavLink } from 'react-router-dom'
import * as yup from 'yup'

import { Logout } from '~/assets/Logout'
import { Loader } from '~/components/Loader'
import main from '~/main.module.scss'
import { addArticle, Arcticle, selectArticles } from '~/redux/reducers/articles.reducer'
import { selectAuth } from '~/redux/reducers/auth.reducer'
import { useAppDispatch, useAppSelector } from '~/redux/store/store'
import api from '~/services/api'
import { relativeTimeFromDates } from '~/utils/relative.time.format'

import styles from './posts.module.scss'

type FormData = {
  title: string
  content: string
}

const schema = yup.object({
  title: yup.string().required('Title is required.'),
  content: yup.string().required('Content is required.').max(64),
})

interface CreatePostProps {
  children: ReactNode
}

export const Posts = ({ children }: CreatePostProps) => {
  const selectorAuth = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()
  const selectorArticles = useAppSelector(selectArticles)

  if (!selectorAuth.auth.active) {
    return <Navigate to="/signup" />
  }

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  async function handleCreatePost(formDate: FormData) {
    const response = await api.post<Arcticle>('', {
      ...formDate,
      username: selectorAuth.auth.username,
    })

    const { data } = response

    dispatch(
      addArticle({
        ...data,
        created_datetime: relativeTimeFromDates(new Date(data.created_datetime)),
      })
    )

    reset()
  }

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        <header className={styles.header}>
          <h3>CodeLeap Network</h3>

          <NavLink
            to=""
            style={{ marginRight: 37 }}
            title="Logout"
            onClick={() => {
              localStorage.clear()
              window.location.reload()
            }}
          >
            <Logout />
          </NavLink>
        </header>

        <div className={styles.content}>
          <section className={styles.post}>
            <span>
              <h3>What’s on your mind?</h3>
            </span>

            <form>
              <label htmlFor="title">
                <h4>Title</h4>
                <input
                  id="title"
                  type="text"
                  {...register('title')}
                  name="title"
                  required
                  placeholder="Hello world"
                />
              </label>

              <small className={main.error}>{errors.title?.message}</small>

              <div style={{ marginTop: 19 }}>
                <label htmlFor="content">
                  <h4>Content</h4>
                  <textarea
                    placeholder="Content here"
                    id="content"
                    {...register('content')}
                    name="content"
                    required
                  />
                </label>
                <small className={main.error}>{errors.content?.message}</small>
              </div>

              <div className={main.bottom}>
                <button
                  type="submit"
                  disabled={!isDirty || !isValid}
                  onClick={handleSubmit(handleCreatePost)}
                >
                  Create
                </button>
              </div>
            </form>
          </section>

          <section className={styles.containerPosts}>
            {children}

            {selectorArticles.status === 'idle' && <Loader />}
          </section>
        </div>
      </div>
    </div>
  )
}
