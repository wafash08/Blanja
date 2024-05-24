import Container from '../base/Container';
import ProductList from './ProductList';
import { useProducts } from '../../hooks';
import { ProductListSkeleton } from '../base/Skeleton';

// keterangan props
// title (string): judul utama kumpulan produk, seperti: new, popular, dll
// description (string): penjelasan singkat dari judul utama
export default function ProductSection({ title, description }) {
	const { data: products, status } = useProducts();
	return (
		<section className='mb-14'>
			<Container>
				<div className='mb-6'>
					<h2 className='text-[34px] text-[#222222] font-bold mb-1'>{title}</h2>
					<p>{description}</p>
				</div>
				{status === 'loading' ? (
					<ProductListSkeleton />
				) : (
					<ProductList products={products} />
				)}
			</Container>
		</section>
	);
}
