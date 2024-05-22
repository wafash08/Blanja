import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../../pages/Auth/Login/Login'
import Register from '../../pages/Auth/Register/Register'
import RegisterCustomer from '../../pages/Auth/Register/RegisterCustomer'
import RegisterSeller from '../../pages/Auth/Register/RegisterSeller'
import Home from '../../pages/main/Home/Home'
import DetailProduct from '../../pages/main/DetailProduct/DetailProduct'
import Cart from '../../pages/main/Cart/Cart'
import CategoryProduct from '../../pages/main/CategoryProduct/CategoryProduct'

const RouterBlanja = () => {
  return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />}>
                    <Route path='customer' element={<RegisterCustomer />} />
                    <Route path='seller' element={<RegisterSeller />} />
                </Route>
                <Route path='/' element={<Home />} />
                <Route path='/products/:id' element={<DetailProduct />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/categories' element={<CategoryProduct />} />
            </Routes>
        </BrowserRouter>
  )
}

export default RouterBlanja