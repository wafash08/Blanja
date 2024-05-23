import React from 'react';
import ProductSection from '../../../components/modules/ProductSection';

const Home = () => {
	return (
		<div>
			<ProductSection title='New' description='You’ve never seen it before!' />
			<ProductSection
				title='Popular'
				description='Find clothes that are trending recently'
			/>
		</div>
	);
};

export default Home;
