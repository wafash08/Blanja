import clsx from 'clsx';
import { Link, useSearchParams } from 'react-router-dom';
import emptyOrderState from '../../../assets/empty-order-state.png';
import { useOrderList } from '../../../hooks';
import { OrderSkeleton } from '../../../components/base/Skeleton';

const ORDER_CATEGORIES = [
	{
		label: 'All Items',
		to: 'all',
	},
	{
		label: 'Not Yet Paid',
		to: 'not_yet_paid',
	},
	{
		label: 'Get Paid',
		to: 'get_paid',
	},
	// {
	// 	label: 'Sent',
	// 	to: 'sent',
	// },
	// {
	// 	label: 'Completed',
	// 	to: 'completed',
	// },
	{
		label: 'Order Cancel',
		to: 'canceled',
	},
	{
		label: 'Expired',
		to: 'expired',
	},
];

export default function OrderPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const category = searchParams.get('category') || 'all';
	const { data: orders, status } = useOrderList();

	let orderList = null;

	if (status === 'loading') {
		orderList = <OrderSkeleton />;
	} else if (status === 'success') {
		if (orders.length > 0) {
			const ordersByStatus = orders.filter(order => {
				if (category === 'all') {
					return order;
				} else if (order.status === category) {
					return order;
				}
			});
			if (ordersByStatus.length === 0) {
				orderList = <EmptyOrderState />;
			} else {
				orderList = (
					<OrderListWrapper orders={ordersByStatus} status={category} />
				);
			}
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
							<li key={to} className='group relative shrink-0 last:mr-5'>
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

function OrderListWrapper({ orders, status }) {
	return (
		<div>
			{orders.map(order => {
				return (
					<OrderList key={order.key}>
						{order.products.map(product => {
							return (
								<OrderItem
									key={product.id}
									product={product}
									status={status}
									url={order.url || ''}
									orderStatus={order.status}
								/>
							);
						})}
					</OrderList>
				);
			})}
		</div>
	);
}

function OrderList({ children }) {
	return <ul className='grid gap-5 mt-5'>{children}</ul>;
}

function OrderItem({ product, status, url, orderStatus }) {
	const { image, name, seller_name } = product;
	return (
		<li className='py-6 px-5 flex items-center gap-[14px] shadow-[0_0_8px_0_#73737340] rounded'>
			<div className='w-[70px] aspect-square rounded-lg overflow-hidden'>
				<img
					src={image}
					alt={name}
					width={70}
					height={70}
					className='w-full h-full object-cover'
				/>
			</div>
			<div className='space-y-1'>
				{status === 'not_yet_paid' || orderStatus === 'not_yet_paid' ? (
					<Link
						to={url}
						className='text-[#222] text-base font-medium hover:underline'
						rel='noopener noreferrer'
						target='_blank'
					>
						{name}
					</Link>
				) : (
					<p className='text-[#222] text-base font-medium'>{name}</p>
				)}
				<p className='text-[#9B9B9B] text-xs font-medium capitalize'>
					{seller_name}
				</p>
			</div>
		</li>
	);
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
