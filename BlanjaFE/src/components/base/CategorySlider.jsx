import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function CategorySlider({ categories }) {
	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		swipeToSlide: true,
		accessibility: true,
		centerMode: true,
	};
	return (
		<Slider {...settings} className='cursor-grab'>
			{categories.map(({ id, name, slug, image }) => {
				return <Category key={id} image={image} name={name} slug={slug} />;
			})}
		</Slider>
	);
}

function Category({ slug, name, image }) {
	return (
		<div className='w-full max-w-48 h-56'>
			<Link
				to={`/categories/${slug}`}
				className='w-full max-w-52 h-full inline-flex items-center justify-center'
			>
				<img src={image} alt={name} />
			</Link>
		</div>
	);
}

function CategoryWithName({ slug, name, image }) {
	return (
		<div
			className='w-full max-w-48 h-56 rounded-lg overflow-hidden flex items-center justify-center'
			style={{
				backgroundImage: `url(${image})`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
			}}
		>
			<Link
				to={`/categories/${slug}`}
				className='w-full max-w-52 h-full flex items-center justify-center text-3xl text-white font-bold tracking-wide'
			>
				{name}
			</Link>
		</div>
	);
}

function NextArrow(props) {
	const { onClick } = props;
	return (
		<button
			type='button'
			className={clsx(
				'inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-[0_4px_10px_0_#B5B5B540]',
				'z-10 absolute -right-7 top-1/2 -translate-y-1/2'
			)}
			onClick={onClick}
		>
			<span className='sr-only'>Selanjutnya</span>
			<svg
				width='11'
				height='16'
				viewBox='0 0 11 16'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				aria-hidden='true'
			>
				<path
					d='M0.453125 14.12L6.55979 8L0.453124 1.88L2.33312 -8.21774e-08L10.3331 8L2.33312 16L0.453125 14.12Z'
					fill='#9B9B9B'
				/>
			</svg>
		</button>
	);
}

function PrevArrow(props) {
	const { onClick } = props;
	return (
		<button
			type='button'
			className={clsx(
				'inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-[0_4px_10px_0_#B5B5B540]',
				'z-10 absolute -left-7 top-1/2 -translate-y-1/2'
			)}
			onClick={onClick}
		>
			<span className='sr-only'>Selanjutnya</span>
			<svg
				width='11'
				height='16'
				viewBox='0 0 11 16'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				aria-hidden='true'
			>
				<path
					d='M10.5469 1.88L4.44021 8L10.5469 14.12L8.66688 16L0.666876 8L8.66688 2.24188e-08L10.5469 1.88Z'
					fill='#9B9B9B'
				/>
			</svg>
		</button>
	);
}
