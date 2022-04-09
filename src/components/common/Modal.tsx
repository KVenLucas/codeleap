import React, { ReactNode } from 'react'
import ReactModal, { Props } from 'react-modal'

export interface ModalProps extends Props {
  children: ReactNode
  isOpen: boolean
  onRequestClose?: () => void
}

export const Modal = ({
  isOpen,
  onRequestClose,
  children,
  overlayClassName,
  className,
}: ModalProps) => {
  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={isOpen}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      onRequestClose={onRequestClose}
      overlayClassName={'react-modal-overlay' || overlayClassName}
      className={'react-modal-content' || className}
    >
      {children}
    </ReactModal>
  )
}
