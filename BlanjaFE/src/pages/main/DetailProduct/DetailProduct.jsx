import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../../components/base/Container';
import BreadCrumb from '../../../components/base/BreadCrumb';

const DetailProduct = () => {
	const { id } = useParams();
	return (
		<div>
			<Container>
				<BreadCrumb
					items={[
						{
							name: 'Products',
							href: '/',
						},
						{
							name: 'Product Name',
							href: `/products/${id}`,
							current: true,
						},
					]}
				/>
			</Container>
		</div>
	);
};

export default DetailProduct;
