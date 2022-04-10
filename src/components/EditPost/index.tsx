import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { Modal } from '~/components/common/Modal'
import main from '~/main.module.scss'
import { Arcticle, updateArticle } from '~/redux/reducers/articles.reducer'
import { useAppDispatch } from '~/redux/store/store'
import api from '~/services/api'
import { relativeTimeFromDates } from '~/utils/relative.time.format'

import styles from './edit.post.module.scss'

interface EditPostProps {
  isOpen: boolean
  onRequestClose?: () => void
}

type FormData = {
  title: string
  content: string
}

const schema = yup.object({
  title: yup.string().required('Title is required.').trim(),
  content: yup.string().required('Content is required.').max(64).trim(),
})

export const EditPost = ({ isOpen }: EditPostProps) => {
  const { id } = useParams<{ id: string }>()

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  async function updatePost(form: FormData) {
    try {
      const response = await api.patch<Arcticle>(`${id}/`, form)

      if (response.status === 200) {
        const { data } = response

        dispatch(
          updateArticle({
            ...data,
            created_datetime: relativeTimeFromDates(new Date(data.created_datetime)),
          })
        )

        reset()
      }
    } catch (e) {
      window.location.reload()
    }

    navigate('/main', { replace: true })
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      onRequestClose={() => {
        navigate('/', { replace: true })
      }}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <section className={styles.container}>
        <h3>Edit Item</h3>

        <form>
          <label htmlFor="title-modal">
            <h4>Title</h4>
            <input
              id="title-modal"
              type="text"
              {...register('title')}
              name="title"
              required
              placeholder="Hello world"
            />
            <small className={main.error}>{errors.title?.message}</small>
          </label>

          <div style={{ marginTop: 19 }}>
            <label htmlFor="content-modal">
              <h4>Content</h4>
              <textarea
                placeholder="Content here"
                id="content-modal"
                {...register('content')}
                name="content"
                required
              />

              <small className={main.error}>{errors.content?.message}</small>
            </label>
          </div>

          <div className={main.bottom}>
            <button
              type="submit"
              disabled={!isDirty || !isValid}
              onClick={handleSubmit(updatePost)}
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </Modal>
  )
}
