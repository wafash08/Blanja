import { Link } from 'react-router-dom';
import productDummy from '../../assets/product-dummy.png';

// keterangan props
// image (string): alamat url gambar dari sebuah produk
// name (string): nama produk
// brand (string): nama brand produk
// price (number): harga produk
// rate (number): rating produk

export default function ProductCard({ id, image, name, brand, price, rating }) {
	  // Rupiah format for price
	  const rupiah = (price) => {
		return new Intl.NumberFormat("id-ID", {
		  style: "currency",
		  currency: "IDR"
		}).format(price)
	  }
	return (
		<li className='group rounded-lg overflow-hidden shadow-[0_0_14px_0_#ADADAD40]'>
			<div className='h-[136px] overflow-hidden'>
				<img
					src={image ? image : productDummy}
					alt={name}
					height={136}
					width={208}
					className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
				/>
			</div>

			<div className='font-metropolis px-3 py-5'>
				<Link
					to={`/products/${id}`}
					reloadDocument
					className='font-medium hover:underline'
				>
					{name}
				</Link>
				<p className='text-[#DB3022] font-medium'>{rupiah(price)}</p>
				<p className='text-xs text-[#9B9B9B] mb-2'>{brand}</p>
				<div className='flex items-center gap-1'>
					<ul className='flex items-center gap-[2px]'>
						{Array.from(Array(rating).keys()).map(r => {
							return <Rate key={r} />;
						})}
					</ul>
					<p className='text-xs text-[#9B9B9B]'>(10)</p>
				</div>
			</div>
		</li>
	);
}

function Rate() {
	return (
		<li className='flex items-center'>
			<svg
				width='12'
				height='12'
				viewBox='0 0 12 12'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				aria-hidden='true'
			>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M6 9.95016L2.87713 11.5436C2.50946 11.7313 2.08567 11.4177 2.1575 11.0113L2.75 7.65836L0.254009 5.29695C-0.0502481 5.00909 0.113068 4.49713 0.527809 4.43864L3.99139 3.95016L5.55431 0.876499C5.73965 0.512004 6.26035 0.512003 6.44569 0.876499L8.00861 3.95016L11.4722 4.43864C11.8869 4.49713 12.0502 5.00909 11.746 5.29695L9.25 7.65836L9.8425 11.0113C9.91433 11.4177 9.49054 11.7313 9.12287 11.5436L6 9.95016Z'
					fill='#FFBA49'
				/>
			</svg>
		</li>
	);
}
