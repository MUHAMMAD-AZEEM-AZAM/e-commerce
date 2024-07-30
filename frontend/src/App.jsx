import React from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Auth Middleware
import { AuthorizedUser } from './middleware/auth.jsx'

//components
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import BillingDetailPage from './pages/BillingDetailPage'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import AuthLayout from './layouts/AuthLayout'
import ForgotPassword from './pages/Auth/ForgotPassword'
import EnterCode from './pages/Auth/EnterCode'
import ResetPassword from './pages/Auth/ResetPassword.jsx'
import { Extra } from './Extra.jsx'

const App = () => {
  const cartProducts = useSelector(state => state.cart)
  const cartItems = cartProducts.length


  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<AuthorizedUser><MainLayout cartLength={cartItems} /></AuthorizedUser>}>
          <Route index element={<HomePage />} />
          <Route path='/products/:id' element={<ProductDetailPage cartProducts={cartProducts} />} />
          <Route path='/extra' element={<Extra/>} />
          <Route path='/cart' element={<CartPage cartProducts={cartProducts} />} />
          <Route path='/billingDetail' element={<BillingDetailPage cartProducts={cartProducts} />} />
        </Route>
        <Route path='/auth' element={<AuthLayout />}>
        <Route  path='/auth/login' element={<Login />}/>
        <Route  path='/auth/signup' element={<Signup />}/>
        <Route  path='/auth/forgotPassword' element={<ForgotPassword />}/>
        <Route  path='/auth/otpVerification' element={<EnterCode />}/>
        <Route  path='/auth/resetPassword' element={<ResetPassword />}/>
        </Route>
      </>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App