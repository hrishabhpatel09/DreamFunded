import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Routes,Route,RouterProvider, createBrowserRouter} from 'react-router-dom'
import Login from './Pages/Login.jsx'
import {Provider} from 'react-redux'
import store from './store/store.js'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/login',
    element: <Login/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}>
        <App />
        </RouterProvider>
    </Provider>
  </React.StrictMode>
)
