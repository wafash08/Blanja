import ProductCard from '../base/ProductCard';

export default function ProductList({ products }) {
	return (
		<ul className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
			{products.map(({ brand, id, image, name, price, rating }) => (
				<ProductCard
					key={id}
					id={id}
					brand={brand}
					image={image}
					name={name}
					price={price}
					rating={rating}
				/>
			))}
		</ul>
	);
}
