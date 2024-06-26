import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import emptyOrderState from '../../../assets/empty-order-state.png';

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
	const [orders, setOrders] = useState([]);
	const [status, setStatus] = useState('idle');

	useEffect(() => {
		setStatus('loading');
		setTimeout(() => {
			setStatus('succeed');
		}, 500);
	}, []);

	let orderList = null;

	if (status === 'loading') {
		// todo: membuat loading skeleton
		orderList = <p>Loading...</p>;
	} else if (status === 'succeed') {
		if (orders.length > 0) {
			// todo: membuat komponen order item berdasarkan respon server
			orderList = <OrderList orders={orders} />;
		} else {
			orderList = <EmptyOrderState />;
		}
	}

	return (
		<section className='bg-white border border-[#9B9B9B] rounded p-7 max-w-[850px] min-h-screen flex flex-col'>
			<div className='mb-[14px]'>
				<h2 className='text-[#222] text-xl font-semibold'>My Order</h2>
			</div>
			<nav>
				<ul className='flex items-center gap-6 lg:gap-12 border-b border-b-[#D4D4D4] overflow-x-auto'>
					{ORDER_CATEGORIES.map(({ label, to }) => {
						const activeCategory = to === category;
						return (
							<li key={to} className='group relative shrink-0'>
								<Link
									to={`?category=${to}`}
									className={clsx(
										'leading-normal font-medium inline-block py-[10px] px-1 transition-colors',
										'group-hover:text-[#DB3022]',
										activeCategory ? 'text-[#DB3022]' : 'text-[#9B9B9B]'
									)}
								>
									{label}
								</Link>
								<div
									className={clsx(
										'absolute bottom-0 left-0 h-1 w-full transition-transform origin-left bg-[#DB3022]',
										'group-hover:scale-100',
										activeCategory ? 'scale-x-100' : 'scale-x-0'
									)}
								/>
							</li>
						);
					})}
				</ul>
			</nav>

			{orderList}
		</section>
	);
}

function OrderList({ orders }) {
	return (
		<ul className=''>
			{orders.map((order, index) => {
				return <OrderItem key={index} />;
			})}
		</ul>
	);
}

function OrderItem() {
	return <li>Item 1</li>;
}

function EmptyOrderState() {
	return (
		<div className='flex-1 flex flex-col justify-center items-center gap-5 font-medium text-[#222]'>
			<img
				src={emptyOrderState}
				alt='There are no orders yet'
				width={165}
				height={147}
			/>
			<p>There are no orders yet</p>
		</div>
	);
}
