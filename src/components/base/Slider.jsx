import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function SliderWrapper({
	children,
	breakpoints,
	slidesToShow,
	nextArrow,
	prevArrow,
	autoplaySpeed,
}) {
	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: slidesToShow,
		slidesToScroll: 1,
		nextArrow: nextArrow,
		prevArrow: prevArrow,
		swipeToSlide: true,
		accessibility: true,
		centerMode: true,
		autoplay: true,
		autoplaySpeed: autoplaySpeed,
		variableWidth: true,
		responsive: breakpoints,
	};
	return (
		<Slider {...settings} className='cursor-grab'>
			{children}
		</Slider>
	);
}
