import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductSection from '../../../components/modules/ProductSection';
import Container from '../../../components/base/Container';
import CategorySlider from '../../../components/base/CategorySlider';
import PromotionSlider from '../../../components/base/PromotionSlider';
import {
	useCategories,
	useProducts,
	useProductsByCondition,
} from '../../../hooks';
import CategoryListSkeleton from '../../../components/base/Skeleton/CategoryListSkeleton';
import ProductList from '../../../components/modules/ProductList';
import { ProductListSkeleton } from '../../../components/base/Skeleton';

const Home = () => {
	// start of search and filter region
	const [searchParams] = useSearchParams();
	const search = searchParams.get('search');
	const colors = searchParams.get('colors');
	const sizes = searchParams.get('sizes');
	let category = searchParams.get('category');
	let seller = searchParams.get('seller');

	category = category ? Number(category) : null;
	seller = seller ? Number(seller) : null;

	const {
		data: products,
		status: productsStatus,
		pagination,
	} = useProducts(search, colors, sizes, category, seller);
	let productList = null;
	if (productsStatus === 'loading') {
		productList = <ProductListSkeleton />;
	} else if (productsStatus === 'success') {
		if (products.length > 0) {
			productList = <ProductList products={products} />;
		} else {
			productList = (
				<div>
					<p>Produk tidak ditemukan</p>
					<Link to='/' className='hover:underline'>
						Kembali ke beranda
					</Link>
				</div>
			);
		}
	}

	if (search || colors || sizes || category || seller) {
		return (
			<section>
				<Container>
					<h2 className='text-3xl text-[#222222] mb-12'>
						Hasil{' '}
						{search && (
							<span>
								pencarian
								<span className='font-bold'>"{search}"</span>
							</span>
						)}
						:
					</h2>

					{productList}
				</Container>
			</section>
		);
	}
	// end of search and filter region

	return (
		<>
			<section className='mt-40'>
				<Container>
					<h2 className='sr-only'>Daftar rekomendasi</h2>

					<PromotionSlider />
				</Container>
			</section>
			<section className='mt-20 bg-[#F0F1F9] py-14 font-metropolis'>
				<Container>
					<div className='mb-8'>
						<h2 className='text-[34px] font-bold text-[#222222]'>Category</h2>
						<p className='text-xs text-[#9B9B9B]'>
							What are you currently looking for
						</p>
					</div>

					<div>
						<CategorySection />
					</div>
				</Container>
			</section>
			<div className='mt-14'>
				<NewProductSection />
				<AllProductsSection data={products} status={productsStatus} />
			</div>
		</>
	);
};

export default Home;

function CategorySection() {
	const { data: categories, status } = useCategories();
	if (status === 'loading') {
		return <CategoryListSkeleton />;
	}
	return <CategorySlider categories={categories} />;
}

function NewProductSection() {
	const { data, status } = useProductsByCondition('new'); // condition: 'new' and 'used'
	let productList = null;
	if (status === 'loading') {
		productList = <ProductListSkeleton />;
	} else if (status === 'success') {
		productList = <ProductList products={data} />;
	}
	return (
		<ProductSection title='New' description='You’ve never seen it before!'>
			{productList}
		</ProductSection>
	);
}

function AllProductsSection({ data, status }) {
	let productList = null;
	if (status === 'loading') {
		productList = <ProductListSkeleton />;
	} else if (status === 'success') {
		productList = <ProductList products={data} />;
	}
	return (
		<ProductSection
			title='All products'
			description='Find all products that suit your desire!'
		>
			{productList}
		</ProductSection>
	);
}
