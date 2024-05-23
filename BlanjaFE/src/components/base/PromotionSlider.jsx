import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import trends from '../../assets/trends.png';
import black from '../../assets/black.png';
import clsx from 'clsx';

const PROMOTION_LIST = [
	{
		id: 1,
		name: 'Trends in 2020',
		image: trends,
	},
	{
		id: 2,
		name: 'Black Edition',
		image: black,
	},
	{
		id: 3,
		name: 'Trends in 2020',
		image: trends,
	},
	{
		id: 4,
		name: 'Black Edition',
		image: black,
	},
];

export default function PromotionSlider() {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		swipeToSlide: true,
		accessibility: true,
		centerMode: true,
		centerPadding: '100px',
		initialSlide: 1,
	};
	return (
		<Slider {...settings} className='cursor-grab'>
			{PROMOTION_LIST.map(({ id, image, name }) => (
				<Promotion key={id} image={image} name={name} />
			))}
		</Slider>
	);
}

function Promotion({ image, name }) {
	return (
		<div
			className='w-full lg:w-[450px] h-44 flex items-center justify-center rounded-lg overflow-hidden'
			style={{
				backgroundImage: `url(${image})`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
			}}
		>
			<p className='text-[38px] text-white font-bold'>{name}</p>
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
				'z-10 absolute -right-3 top-1/2 -translate-y-1/2'
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
