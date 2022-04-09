import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { Modal } from '~/components/common/Modal'
import { deleteArticle } from '~/redux/reducers/articles.reducer'
import { useAppDispatch } from '~/redux/store/store'
import api from '~/services/api'

import styles from './delete.post.module.scss'

interface DeletePostProps {
  isOpen: boolean
  onRequestClose: () => void
}

export const DeletePost = ({ isOpen, onRequestClose }: DeletePostProps) => {
  const { id } = useParams<{ id: string }>()

  const dispatch = useAppDispatch()

  async function deletePost(postId: string) {
    try {
      const response = await api.delete(`${postId}/`)

      if (response.status === 204) {
        dispatch(deleteArticle(Number(postId)))
      }
    } catch (e) {
      // TODO Handle feedback error
      window.location.reload()
    }
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <section className={styles.container}>
        <h3>Are you sure you want to delete this item?</h3>

        <div className={styles.content}>
          <NavLink replace to="/">
            <h4>Cancel</h4>
          </NavLink>

          <NavLink to="/" onClick={() => id && deletePost(id)}>
            <h4>OK</h4>
          </NavLink>
        </div>
      </section>
    </Modal>
  )
}
