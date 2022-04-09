import React, { useEffect, useState } from 'react'

import styles from './scroll.to.top.module.scss'

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true)
      } else {
        setShowTopBtn(false)
      }
    })
  }, [])
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <div className={styles.container}>
      {showTopBtn && (
        <button type="button" className={styles.topToBtm} onClick={goToTop}>
          Go top
        </button>
      )}
    </div>
  )
}
export default ScrollToTop
