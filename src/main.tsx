import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './routes'
import './index.css'
import store from './app/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Provider provê a store a todos os componentes filho, store é orbigatório */}
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
)
