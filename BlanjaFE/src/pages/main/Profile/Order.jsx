import clsx from 'clsx';
import { Link, useSearchParams } from 'react-router-dom';

const ORDER_CATEGORIES = [
	{
		label: 'All Items',
		to: 'all',
	},
	{
		label: 'Not Yet Paid',
		to: 'not-yet-paid',
	},
	{
		label: 'Packed',
		to: 'packed',
	},
	{
		label: 'Sent',
		to: 'sent',
	},
	{
		label: 'Completed',
		to: 'completed',
	},
	{
		label: 'Order Cancel',
		to: 'canceled',
	},
];

export default function OrderPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const category = searchParams.get('category') || 'all';

	return (
		<section className='bg-white border border-[#9B9B9B] rounded p-7 max-w-[850px] min-h-screen'>
			<div className='mb-[14px]'>
				<h2 className='text-[#222] text-xl font-semibold'>My Order</h2>
			</div>
			<nav>
				<ul className='flex items-center gap-12 border-b border-b-[#D4D4D4]'>
					{ORDER_CATEGORIES.map(({ label, to }) => {
						const activeCategory = to === category;
						return (
							<li key={to} className='relative'>
								<Link
									to={`?category=${to}`}
									className={clsx(
										'leading-normal font-medium inline-block py-[10px] px-1',
										activeCategory ? 'text-[#DB3022]' : 'text-[#9B9B9B]'
									)}
								>
									{label}
								</Link>
								<div
									className={clsx(
										'absolute bottom-0 left-0 h-1 w-full transition-transform origin-left bg-[#DB3022]',
										activeCategory ? 'scale-100' : 'scale-0'
									)}
								/>
							</li>
						);
					})}
				</ul>
			</nav>
		</section>
	);
}
