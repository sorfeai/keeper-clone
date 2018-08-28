import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { App } from './components'
import registerServiceWorker from './registerServiceWorker'

import './styles/bulma.scss'
import './styles/global.scss'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)


registerServiceWorker()
