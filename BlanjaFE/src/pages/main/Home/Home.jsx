import React from 'react';
import ProductSection from '../../../components/modules/ProductSection';
import Container from '../../../components/base/Container';
import Navbar from '../../../components/modules/Navbar';

const Home = () => {
	return (
		<>
			<header className='fixed top-0 left-0 w-full h-[100px] z-50 flex items-center bg-white shadow-[0_6px_40px_0_#ADADAD40]'>
				<Container>
					<Navbar hasLoggedIn={true} inHomePage={true} />
				</Container>
			</header>
			<div className='mt-32'>
				<ProductSection
					title='New'
					description='You’ve never seen it before!'
				/>
				<ProductSection
					title='Popular'
					description='Find clothes that are trending recently'
				/>
			</div>
		</>
	);
};

export default Home;
