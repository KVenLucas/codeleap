import React from 'react'

import styles from './loader.module.scss'

export const Loader = () => {
  return (
    <div className={styles.bounce}>
      <div className={styles.bounce1} />
      <div className={styles.bounce2} />
      <div className={styles.bounce3} />
    </div>
  )
}
