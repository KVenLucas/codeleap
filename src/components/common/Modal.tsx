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
  shouldCloseOnOverlayClick,
  shouldCloseOnEsc,
}: ModalProps) => {
  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={isOpen}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      shouldCloseOnEsc={shouldCloseOnEsc}
      onRequestClose={onRequestClose}
      overlayClassName={'react-modal-overlay' || overlayClassName}
      className={'react-modal-content' || className}
    >
      {children}
    </ReactModal>
  )
}
