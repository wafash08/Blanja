import { Outlet } from 'react-router-dom';
import Container from '../base/Container';
import Navbar from './Navbar';
import { getTokenFromLocalStorage } from '../../utils';
import { useState } from 'react';

export default function Layout() {
	const [token, setToken] = useState(() => getTokenFromLocalStorage());
	console.log('token >> ', token);
	return (
		<>
			<header className='fixed top-0 left-0 w-full h-[100px] z-50 flex items-center bg-white shadow-[0_6px_40px_0_#ADADAD40]'>
				<Container>
					<Navbar hasLoggedIn={token !== null} />
				</Container>
			</header>
			<main className='mt-32 font-metropolis'>
				<Outlet />
			</main>
		</>
	);
}
