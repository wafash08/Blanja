import React, { useEffect } from 'react';
import ProductSection from '../../../components/modules/ProductSection';
import Container from '../../../components/base/Container';
import CategorySlider from '../../../components/base/CategorySlider';
import PromotionSlider from '../../../components/base/PromotionSlider';
import { useCategories } from '../../../hooks';
import CategoryListSkeleton from '../../../components/base/Skeleton/CategoryListSkeleton';

const Home = () => {
	const { data: categories, status } = useCategories();

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
						{status === 'loading' ? (
							<CategoryListSkeleton />
						) : (
							<CategorySlider categories={categories} />
						)}
					</div>
				</Container>
			</section>
			<div className='mt-14'>
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
