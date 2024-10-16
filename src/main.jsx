import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './Component/pages/Home'
import Index from './Component/pages/Index'
import Products from './Component/pages/Products.jsx'
import './index.css'
import Cart from './Component/pages/Cart.jsx'
import Contact from './Component/pages/Contact.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Index />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/products',
        element: <Products />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/cart',
        element: <Cart />
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)