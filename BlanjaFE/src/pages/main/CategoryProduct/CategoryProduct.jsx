import { Link, useParams } from 'react-router-dom';
import Container from '../../../components/base/Container';
import BreadCrumb from '../../../components/base/BreadCrumb';
import { ProductListSkeleton } from '../../../components/base/Skeleton';
import ProductList from '../../../components/modules/ProductList';
import { useProductByCategory } from '../../../hooks';

const CategoryProduct = () => {
	const { id } = useParams();
	const { data, status } = useProductByCategory(id);

	let productList = null;
	if (status === 'loading') {
		productList = <ProductListSkeleton />;
	} else if (status === 'success') {
		if (data.products.length > 0) {
			productList = <ProductList products={data.products} />;
		} else {
			productList = (
				<div>
					<p>Kategori {id} belum mempunyai produk.</p>
					<p>
						<Link to='/' className='underline'>
							Kembali ke halaman sebelumnya
						</Link>
						<span> untuk melihat produk lain</span>
					</p>
				</div>
			);
		}
	}

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
							name: id,
							href: `/categories/${id}`,
							current: true,
						},
					]}
				/>

				<section className='mt-12'>
					<h2 className='mb-6 text-4xl text-[#222222] font-bold capitalize'>
						{id}
					</h2>

					{productList}
				</section>
			</Container>
		</div>
	);
};

export default CategoryProduct;
