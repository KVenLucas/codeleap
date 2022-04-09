import React from 'react'
import { Link } from 'react-router-dom'

import { Delete } from '~/assets/Delete'
import { Edit } from '~/assets/Edit'
import { selectAuth } from '~/redux/reducers/auth.reducer'
import { useAppSelector } from '~/redux/store/store'

import styles from './list.posts.module.scss'

interface ListPostProps {
  id: number
  username: string
  created_datetime: string
  title: string
  content: string
}

export const ListPosts = ({
  id: postId,
  title,
  username,
  content,
  created_datetime,
}: ListPostProps) => {
  const selectorAuth = useAppSelector(selectAuth)

  const { username: user } = selectorAuth.auth

  return (
    <>
      <section className={styles.container}>
        <div className={styles.header}>
          <div className={styles.content}>
            <span>
              <h3>{title}</h3>
            </span>
            {user === username && (
              <div className={styles.navContainer}>
                <nav className={styles.nav}>
                  <ul className={styles.links}>
                    <li style={{ marginRight: 33 }}>
                      <Link to={{ pathname: `/delete/${postId}` }}>
                        <Delete />
                      </Link>
                    </li>
                    <li>
                      <Link to={{ pathname: `/edit/${postId}` }}>
                        <Edit />
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>

        <div className={styles.postsContainer}>
          <section className={styles.posts}>
            <div className={styles.postAuthor}>
              <h3>@{username || 'Anonymous'}</h3>
              <h3 className={styles.postDate}>{created_datetime}</h3>
            </div>

            <div className={styles.postContent}>
              <h3>{content}</h3>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}
