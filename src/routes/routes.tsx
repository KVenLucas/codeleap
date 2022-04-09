import React, { useState } from 'react'
import { useRoutes } from 'react-router-dom'

import { DeletePost } from '~/components/DeletePost'
import { EditPost } from '~/components/EditPost'
import { Main } from '~/pages/Main'
import { Signup } from '~/pages/Signup'

export const Routes = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  return useRoutes([
    { path: '/', element: <Main /> },
    { path: '*', element: <Main /> },

    {
      path: 'main',
      element: <Main />,
    },

    {
      path: '/edit/:id',
      element: (
        <>
          <Main />
          <EditPost isOpen={isModalOpen} onRequestClose={handleCloseModal} />
        </>
      ),
    },

    {
      path: '/delete/:id',
      element: (
        <>
          <Main />
          <DeletePost isOpen={isModalOpen} onRequestClose={handleCloseModal} />
        </>
      ),
    },

    {
      path: '/signup',
      element: <Signup isOpen={isModalOpen} onRequestClose={handleOpenModal} />,
    },
  ])
}
