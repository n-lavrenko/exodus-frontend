import {SnackbarProvider} from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom'
import {HelmetProvider} from 'react-helmet-async'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import {AuthProvider} from './contexts/AuthContext'
import './index.css'


ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <SnackbarProvider maxSnack={3} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
