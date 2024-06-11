import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../../pages/Auth/Login/Login';
import Register from '../../pages/Auth/Register/Register';
import RegisterCustomer from '../../pages/Auth/Register/RegisterCustomer';
import RegisterSeller from '../../pages/Auth/Register/RegisterSeller';
import Home from '../../pages/main/Home/Home';
import DetailProduct from '../../pages/main/DetailProduct/DetailProduct';
import Cart from '../../pages/main/Cart/Cart';
import CategoryProduct from '../../pages/main/CategoryProduct/CategoryProduct';
import Layout from '../../components/modules/Layout';
import ProductsPage from '../../pages/main/Products';
import ProfilePage from '../../pages/main/Profile';
import EditProfile from '../../pages/main/Profile/Edit';

const RouterBlanja = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />}>
					<Route path='customer' element={<RegisterCustomer />} />
					<Route path='seller' element={<RegisterSeller />} />
				</Route>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='products' element={<ProductsPage />} />
					<Route path='products/:id' element={<DetailProduct />} />
					<Route path='cart' element={<Cart />} />
					<Route path='categories/:id' element={<CategoryProduct />} />
					<Route path='profile' element={<ProfilePage />}>
						<Route index element={<EditProfile />} />
						<Route path='edit' element={<EditProfile />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default RouterBlanja;
