import ReactDOM from 'react-dom/client'
import AppRouter from './routes'
import './index.css'
import store from './app/store'
import { Provider } from 'react-redux'
import { createStandaloneToast } from '@chakra-ui/react';

const {ToastContainer} = createStandaloneToast();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppRouter />
    <ToastContainer />
  </Provider>
)
