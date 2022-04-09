import '~/styles/global.scss'

import { debounce } from 'debounce'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { Codelap } from '~/assets/Codelap'
import { useLoader } from '~/hooks/useLoader'
import { saveState } from '~/redux/reducers/browser.reducer'
import { store } from '~/redux/store/store'
import { Routes } from '~/routes/routes'

import styles from './main.module.scss'

store.subscribe(
  debounce(async () => {
    await saveState({
      auth: store.getState().auth,
    })
  }, 800)
)

const App = () => {
  const { loading } = useLoader()

  if (loading) {
    return (
      <div className={styles.container}>
        <Codelap />
      </div>
    )
  }

  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  )
}

const rootElement = document.getElementById('root')
render(<App />, rootElement)
