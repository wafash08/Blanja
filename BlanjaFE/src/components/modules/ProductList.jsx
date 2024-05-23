import productDummy from '../../assets/product-dummy.png';
import ProductCard from '../base/ProductCard';

const PRODUCT_LIST = [
	{
		id: 1,
		image: productDummy,
		name: "Men's formal suit - Black & White",
		price: 40.0,
		brand: 'Zalora Cloth',
		rate: 5,
	},
	{
		id: 2,
		image: productDummy,
		name: "Men's formal suit - Black & White",
		price: 40.0,
		brand: 'Zalora Cloth',
		rate: 5,
	},
	{
		id: 3,
		image: productDummy,
		name: "Men's formal suit - Black & White",
		price: 40.0,
		brand: 'Zalora Cloth',
		rate: 5,
	},
	{
		id: 4,
		image: productDummy,
		name: "Men's formal suit - Black & White",
		price: 40.0,
		brand: 'Zalora Cloth',
		rate: 5,
	},
	{
		id: 5,
		image: productDummy,
		name: "Men's formal suit - Black & White",
		price: 40.0,
		brand: 'Zalora Cloth',
		rate: 5,
	},
	{
		id: 6,
		image: productDummy,
		name: "Men's formal suit - Black & White",
		price: 40.0,
		brand: 'Zalora Cloth',
		rate: 5,
	},
	{
		id: 7,
		image: productDummy,
		name: "Men's formal suit - Black & White",
		price: 40.0,
		brand: 'Zalora Cloth',
		rate: 5,
	},
	{
		id: 8,
		image: productDummy,
		name: "Men's formal suit - Black & White",
		price: 40.0,
		brand: 'Zalora Cloth',
		rate: 5,
	},
];

export default function ProductList() {
	return (
		<ul className='grid grid-cols-5 gap-6'>
			{PRODUCT_LIST.map(({ brand, id, image, name, price, rate }) => (
				<ProductCard
					key={id}
					id={id}
					brand={brand}
					image={image}
					name={name}
					price={price}
					rate={rate}
				/>
			))}
		</ul>
	);
}
