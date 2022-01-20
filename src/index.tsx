import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './styles/styles.scss'
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
