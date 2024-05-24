import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../../components/base/Container';
import BreadCrumb from '../../../components/base/BreadCrumb';

const CategoryProduct = () => {
	const { id } = useParams();
	return (
		<div>
			<Container>
				<BreadCrumb
					items={[
						{
							name: 'Categories',
							href: '/',
						},
						{
							name: 'Category Name',
							href: `/categories/${id}`,
							current: true,
						},
					]}
				/>
			</Container>
		</div>
	);
};

export default CategoryProduct;
