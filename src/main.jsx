import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider
} from "react-router-dom";
import { router } from './Routes/Router';
import Authprovider from './Authentication/AuthProvider/Authprovider';

// Tan Stack
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className=''>
    <QueryClientProvider client={queryClient}>
      <Authprovider>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </Authprovider>
    </QueryClientProvider>
  </div>
)
