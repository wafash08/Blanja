import { useSearchParams } from 'react-router-dom';
import Container from '../../../components/base/Container';
import { ProductListSkeleton } from '../../../components/base/Skeleton';
import ProductList from '../../../components/modules/ProductList';
import { useProducts } from '../../../hooks';
import { useEffect } from 'react';

export default function ProductsPage() {
	const { data, pagination, status } = useProducts();
	const [URLSearchParams, setURLSearchParams] = useSearchParams();

	let productList = null;

	if (status === 'loading') {
		productList = <ProductListSkeleton />;
	} else if (status === 'success') {
		productList = <ProductList products={data} />;
	}

	return (
		<div>
			<Container>{productList}</Container>
		</div>
	);
}
