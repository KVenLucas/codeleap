import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { Modal } from '~/components/common/Modal'
import main from '~/main.module.scss'
import { setUser } from '~/redux/reducers/auth.reducer'
import { useAppDispatch } from '~/redux/store/store'

import styles from './signup.module.scss'

interface SignupProps {
  isOpen: boolean
  onRequestClose: () => void
}

type FormData = {
  username: string
  active: boolean
}

const schema = yup.object({
  username: yup.string().required('Please inform username.').trim(),
})

export const Signup = ({ isOpen, onRequestClose }: SignupProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  async function handleUserRegister(data: FormData) {
    dispatch(setUser({ ...data, active: true }))
    navigate('/main', { replace: true })
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
      <form className={styles.container}>
        <div className={styles.content}>
          <h3>Welcome to CodeLeap network!</h3>

          <label htmlFor="username">
            <span>
              <p>Please enter your username</p>
            </span>

            <input
              placeholder="Jonh Doe"
              id="username"
              type="text"
              {...register('username')}
              name="username"
              required
            />

            <p className={main.error}>{errors.username?.message}</p>
          </label>

          <div>
            <button
              type="submit"
              disabled={!isDirty || !isValid}
              onClick={handleSubmit(handleUserRegister)}
            >
              Enter
            </button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
