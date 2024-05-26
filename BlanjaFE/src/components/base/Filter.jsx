import clsx from 'clsx';
import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toCommaSeparatedValues } from '../../utils';
import { useFilters } from '../../hooks';

export default function Filter() {
	const refDialog = useRef(null);
	const [, setURLSearchParams] = useSearchParams();
	const { colors, sellers, categories, sizes, status } = useFilters();

	const handleOpenDialog = () => {
		refDialog.current?.showModal();
	};

	const handleCloseDialog = () => {
		refDialog.current?.close();
	};

	const handleSubmitFilter = e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const colors = [];
		const sizes = [];
		const category = [];
		const seller = [];
		for (const [key, value] of formData) {
			if (key === 'colors') {
				colors.push(value);
			} else if (key === 'sizes') {
				sizes.push(value);
			} else if (key === 'category') {
				category.push(value);
			} else if (key === 'seller') {
				seller.push(value);
			}
		}
		const filters = [
			{
				name: 'colors',
				values: colors,
			},
			{
				name: 'sizes',
				values: sizes,
			},
			{
				name: 'category',
				values: category,
			},
			{
				name: 'seller',
				values: seller,
			},
		];
		const params = {};
		for (const filter of filters) {
			const { name, values } = filter;
			if (values && values.length > 0) {
				params[name] = toCommaSeparatedValues(values);
			}
		}
		setURLSearchParams(params);
		refDialog.current?.close();
	};

	return (
		<>
			<dialog
				className='dialog font-metropolis backdrop:bg-black/40'
				ref={refDialog}
			>
				<form className='relative' onSubmit={handleSubmitFilter}>
					<div className='flex items-center gap-2 px-3 py-4 border-b-4 border-[#F4F4F4]'>
						<button
							type='button'
							onClick={handleCloseDialog}
							autoFocus
							className='w-10 h-10 inline-flex items-center justify-center'
						>
							<span className='sr-only'>Tutup filter</span>
							<svg
								width='21'
								height='21'
								viewBox='0 0 21 21'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M18.0506 0.726135L10.626 8.15076L3.20136 0.726135L0.726482 3.20101L8.1511 10.6256L0.726482 18.0503L3.20136 20.5251L10.626 13.1005L18.0506 20.5251L20.5255 18.0503L13.1009 10.6256L20.5255 3.20101L18.0506 0.726135Z'
									fill='#9B9B9B'
								/>
							</svg>
						</button>
						<span className='text-[22px] text-[#222222] font-medium'>
							Filter
						</span>
					</div>

					<FilterSection section='colors' title='Colors' filters={colors} />
					<FilterSection section='sizes' title='Sizes' filters={sizes} />
					<FilterSection
						section='categories'
						title='Categories'
						filters={categories}
					/>
					<FilterSection section='brands' title='Brands' filters={sellers} />

					<div className='h-20 bg-white shadow-[0_-8px_10px_0_#D9D9D940] mt-10 flex items-center justify-center gap-6'>
						<button
							type='button'
							onClick={handleCloseDialog}
							className={clsx(
								'w-40 h-9 inline-flex items-center justify-center border border-[#222222] text-sm rounded-full',
								'bg-white text-[#222222] hover:bg-[#222222] hover:text-white transition-colors'
							)}
						>
							Discard
						</button>
						<button
							type='submit'
							className={clsx(
								'w-40 h-9 inline-flex items-center justify-center border border-[#DB3022] text-sm rounded-full',
								'bg-[#DB3022] text-white hover:bg-white hover:text-[#DB3022]'
							)}
						>
							Apply
						</button>
					</div>
				</form>
			</dialog>
			<button
				type='button'
				className='group w-10 h-10 flex items-center justify-center border border-[#8E8E93] rounded-xl'
				onClick={handleOpenDialog}
			>
				<span className='sr-only'>Cari produk dengan filter</span>
				<svg
					width='20'
					height='18'
					viewBox='0 0 20 18'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					aria-hidden='true'
					className='group-hover:fill-[#8E8E93] transition-colors'
				>
					<path
						d='M18.3337 1.5H1.66699L8.33366 9.38333V14.8333L11.667 16.5V9.38333L18.3337 1.5Z'
						stroke='#8E8E93'
						strokeWidth='1.66667'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>
		</>
	);
}

function FilterSection({ section, title, filters }) {
	let filterList = null;

	switch (section) {
		case 'colors': {
			filterList = <ColorFilters colors={filters} />;
			break;
		}
		case 'sizes': {
			filterList = <SizeFilters sizes={filters} />;
			break;
		}
		case 'categories': {
			filterList = <CategoryFilters categories={filters} />;
			break;
		}
		case 'brands': {
			filterList = <BrandFilters brands={filters} />;
			break;
		}
		default: {
			filterList = null;
			break;
		}
	}

	return (
		<section className='px-5 py-4 border-b-4 border-[#F4F4F4]'>
			<h3 className='text-[#222222] font-bold mb-8'>{title}</h3>
			{filterList}
		</section>
	);
}

function ColorFilters({ colors }) {
	return (
		<ul className='flex items-center gap-5'>
			{colors.map(color => {
				return (
					<li className='group inline-flex' key={color}>
						<label className='relative '>
							<span className='sr-only'>{color}</span>
							<input
								type='checkbox'
								name='colors'
								id={color}
								value={color}
								className='peer appearance-none absolute top-0 left-0 w-full h-full cursor-pointer'
							/>
							<div
								className={clsx(
									'w-9 h-9 rounded-full outline outline-1 outline-transparent peer-checked:outline-[#DB3022] outline-offset-2 transition-colors',
									'group-hover:outline-[#DB3022]',
									color === '#ffffff' && 'shadow-[0_0_0px_2px_#B5B5B540]'
								)}
								style={{ backgroundColor: color }}
							/>
						</label>
					</li>
				);
			})}
		</ul>
	);
}

function SizeFilters({ sizes }) {
	return (
		<ul className='flex items-center flex-wrap gap-5'>
			{sizes.map(size => {
				return (
					<li className='group inline-flex' key={size}>
						<label className='relative '>
							<span className='sr-only'>{size}</span>
							<input
								type='checkbox'
								name='sizes'
								id={size}
								value={size}
								className='peer appearance-none absolute top-0 left-0 w-full h-full cursor-pointer'
							/>
							<button
								type='button'
								className={clsx(
									'w-10 h-10 inline-flex items-center justify-center rounded-lg uppercase transition-colors text-sm',
									'bg-white peer-checked:bg-[#DB3022]',
									'border border-[#9B9B9B] peer-checked:border-[#DB3022]',
									'text-[#222222] peer-checked:text-white',
									'group-hover:bg-[#DB3022] group-hover:text-white group-hover:border-[#DB3022]'
								)}
							>
								{size}
							</button>
						</label>
					</li>
				);
			})}
		</ul>
	);
}

function CategoryFilters({ categories }) {
	return (
		<ul className='flex items-center flex-wrap gap-x-5 gap-y-3'>
			{categories.map(({ id, name }) => {
				return (
					<li className='group inline-flex' key={id}>
						<label className='relative '>
							<span className='sr-only'>{name}</span>
							<input
								type='checkbox'
								name='category'
								id={id}
								value={id}
								className='peer appearance-none absolute top-0 left-0 w-full h-full cursor-pointer'
							/>
							<button
								type='button'
								className={clsx(
									'w-[100px] h-10 inline-flex items-center justify-center rounded-lg capitalize transition-colors text-sm',
									'bg-white peer-checked:bg-[#DB3022]',
									'border border-[#9B9B9B] peer-checked:border-[#DB3022]',
									'text-[#222222] peer-checked:text-white',
									'group-hover:bg-[#DB3022] group-hover:text-white group-hover:border-[#DB3022]'
								)}
							>
								{name}
							</button>
						</label>
					</li>
				);
			})}
		</ul>
	);
}

function BrandFilters({ brands }) {
	return (
		<ul className='flex items-center flex-wrap gap-x-5 gap-y-3'>
			{brands.map(brand => {
				return (
					<li className='group inline-flex' key={brand.id}>
						<label className='relative '>
							<span className='sr-only'>{brand.name}</span>
							<input
								type='checkbox'
								name='seller'
								id={brand.id}
								value={brand.id}
								className='peer appearance-none absolute top-0 left-0 w-full h-full cursor-pointer'
							/>
							<button
								type='button'
								className={clsx(
									'w-[100px] h-10 inline-flex items-center justify-center rounded-lg capitalize transition-colors text-sm',
									'bg-white peer-checked:bg-[#DB3022]',
									'border border-[#9B9B9B] peer-checked:border-[#DB3022]',
									'text-[#222222] peer-checked:text-white',
									'group-hover:bg-[#DB3022] group-hover:text-white group-hover:border-[#DB3022]'
								)}
							>
								{brand.name}
							</button>
						</label>
					</li>
				);
			})}
		</ul>
	);
}
