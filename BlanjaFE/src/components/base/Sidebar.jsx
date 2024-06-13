import { Link, useLocation } from 'react-router-dom';
import avatarImage from '../../assets/empty-profile.jpg';
import {
	AccountIcon,
	AddressIcon,
	CartIcon,
	HomeIcon,
	OrderIcon,
	PackageIcon,
} from './Icons';
import clsx from 'clsx';
import { getRoleFromLocalStorage } from '../../utils';
import { useProfile } from '../../hooks';

const LINKS_CUSTOMER = [
	{
		label: 'My account',
		to: 'edit',
		icon: <AccountIcon />,
		color: '#456BF3',
		withDropdown: false,
	},
	{
		label: 'Shipping Address',
		to: 'address',
		icon: <AddressIcon />,
		color: '#F36F45',
		withDropdown: false,
	},
	{
		label: 'My Order',
		to: 'order',
		icon: <OrderIcon />,
		color: '#F3456F',
		withDropdown: false,
	},
];

const LINKS_SELLER = [
	{
		label: 'Store',
		items: [
			{
				label: 'Store Profile',
				to: 'edit',
			},
		],
		icon: <HomeIcon />,
		color: '#456BF3',
		withDropdown: true,
	},
	{
		label: 'Product',
		items: [
			{
				label: 'My Products',
				to: 'products',
			},
			{
				label: 'Selling Products',
				to: 'selling-products',
			},
		],
		icon: <PackageIcon />,
		color: '#456BF3',
		withDropdown: true,
	},
	{
		label: 'Order',
		items: [
			{
				label: 'My Order',
				to: 'order?category=all',
			},
			{
				label: 'Order Cancel',
				to: 'order?category=canceled',
			},
		],
		icon: <CartIcon className='w-4 h-4' />,
		color: '#F3456F',
		withDropdown: true,
	},
];

export default function Sidebar() {
	const { pathname } = useLocation();
	const paths = pathname.split('/');
	const currentPath = paths[2] || 'edit';
	const role = getRoleFromLocalStorage();
	const { data: profile, status } = useProfile(role);
	const links = role
		? role === 'customer'
			? LINKS_CUSTOMER
			: LINKS_SELLER
		: LINKS_CUSTOMER;

	return (
		<aside className='w-full max-w-64 space-y-16 sticky top-0 px-4'>
			<section className='flex flex-col lg:flex-row items-center gap-4'>
				<div className='w-[60px] shrink-0 aspect-square rounded-full overflow-hidden'>
					<img
						src={profile.image ? profile.image : avatarImage}
						alt={profile.name}
						width={60}
						height={60}
						className='w-full h-full'
					/>
				</div>
				<div className='space-y-1 text-center md:text-left'>
					<h3 className='text-[#222222] font-semibold text-wrap'>
						{profile.name}
					</h3>
					<Link
						to='edit'
						className='text-[#9B9B9B] text-sm flex items-center gap-2'
					>
						<svg
							width='16'
							height='16'
							viewBox='0 0 16 16'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden
						>
							<path
								d='M0 12.6662V16H3.33379L13.1707 6.16302L9.8369 2.82922L0 12.6662Z'
								fill='currentColor'
							/>
							<path
								d='M15.74 2.33586L13.6642 0.260036C13.3174 -0.0866786 12.7529 -0.0866786 12.4062 0.260036L10.7793 1.88693L14.1131 5.22072L15.74 3.59383C16.0867 3.24711 16.0867 2.68258 15.74 2.33586Z'
								fill='currentColor'
							/>
						</svg>
						<span>Ubah profile</span>
					</Link>
				</div>
			</section>
			<nav>
				<ul className='space-y-5'>
					{links.map(({ color, icon, label, to, withDropdown, items }) => {
						const active = to === currentPath;
						if (withDropdown) {
							return (
								<SidebarItemWithDropdown
									key={label}
									currentPath={currentPath}
									color={color}
									icon={icon}
									items={items}
									label={label}
								/>
							);
						} else {
							return (
								<SidebarItem
									key={label}
									active={active}
									color={color}
									label={label}
									to={to}
									icon={icon}
								/>
							);
						}
					})}
				</ul>
			</nav>
		</aside>
	);
}

function SidebarItem({ label, to, color, active, icon }) {
	return (
		<li key={label}>
			<Link to={to} className='flex items-center gap-[14px]'>
				<div
					style={{ backgroundColor: color }}
					className='w-8 aspect-square rounded-full flex items-center justify-center'
				>
					{icon}
				</div>
				<span
					className={clsx(
						'text-sm font-medium',
						active ? 'text-[#222222]' : 'text-[#9B9B9B]'
					)}
				>
					{label}
				</span>
			</Link>
		</li>
	);
}

function SidebarItemWithDropdown({ label, color, icon, items, currentPath }) {
	const active = false;
	return (
		<li className='cursor-pointer'>
			<details name='link' className='dropdown'>
				<summary className='flex items-center gap-[14px] list-none relative'>
					<div
						style={{ backgroundColor: color }}
						className='w-8 aspect-square rounded-full flex items-center justify-center text-white'
					>
						{icon}
					</div>
					<span
						className={clsx(
							'text-sm',
							active ? 'text-[#222222]' : 'text-[#9B9B9B]'
						)}
					>
						{label}
					</span>

					<svg
						width='10'
						height='7'
						viewBox='0 0 10 7'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden
						className='dropdown-arrow text-[#9B9B9B] transition-all duration-300 ml-auto mr-0 lg:mr-5'
					>
						<path
							d='M1.175 0.158325L5 3.97499L8.825 0.158325L10 1.33333L5 6.33333L0 1.33333L1.175 0.158325Z'
							fill='currentColor'
						/>
					</svg>
				</summary>
				<ul className='ml-[46px] mt-3 space-y-3'>
					{items.map(({ label, to }) => {
						return (
							<li key={to}>
								<Link
									to={to}
									className={clsx(
										'flex text-sm',
										active ? 'text-[#222222]' : 'text-[#9B9B9B]'
									)}
								>
									{label}
								</Link>
							</li>
						);
					})}
				</ul>
			</details>
		</li>
	);
}
