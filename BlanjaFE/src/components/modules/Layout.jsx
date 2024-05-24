import { Outlet, useLocation } from 'react-router-dom';
import Container from '../base/Container';
import Navbar from './Navbar';
import { getTokenFromLocalStorage } from '../../utils';

export default function Layout() {
	const { pathname } = useLocation();
	const pathnames = pathname.split('/');
	const inProductsPage = pathnames.includes('products');
	const inCategoriesPage = pathnames.includes('categories');
	const inCartPage = pathnames.includes('cart');
	const inHomePage = !inCategoriesPage && !inProductsPage && !inCartPage;
	const token = getTokenFromLocalStorage();
	return (
		<>
			<header className='fixed top-0 left-0 w-full h-[100px] z-50 flex items-center bg-white shadow-[0_6px_40px_0_#ADADAD40]'>
				<Container>
					<Navbar hasLoggedIn={token !== null} inHomePage={inHomePage} />
				</Container>
			</header>
			<main className='mt-32'>
				<Outlet />
			</main>
		</>
	);
}
