import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { Toaster } from 'sonner'
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
        <Toaster richColors />
      </Provider>
  </React.StrictMode>,
)

