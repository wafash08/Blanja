import { Link } from 'react-router-dom';
import avatarImage from '../../assets/empty-profile.jpg';
import { AccountIcon, AddressIcon, OrderIcon } from './Icons';

const links = [
	{
		label: 'My account',
		to: 'edit',
		icon: <AccountIcon />,
		color: '#456BF3',
	},
	{
		label: 'Shipping Address',
		to: 'address',
		icon: <AddressIcon />,
		color: '#F36F45',
	},
	{
		label: 'My Order',
		to: 'order',
		icon: <OrderIcon />,
		color: '#F3456F',
	},
];

export default function Sidebar() {
	return (
		<aside className='w-full max-w-[245px] space-y-16 sticky top-0'>
			<section className='flex items-center gap-4 space-y-1'>
				<div className='w-[60px] aspect-square rounded-full overflow-hidden'>
					<img
						src={avatarImage}
						alt='Johanes Mikael'
						width={60}
						height={60}
						className='w-full h-full'
					/>
				</div>
				<div>
					<h3 className='text-[#222222] font-semibold'>Johanes Mikael</h3>
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
					{links.map(({ color, icon, label, to }) => (
						<li key={label}>
							<Link to={to} className='flex items-center gap-[14px]'>
								<div
									style={{ backgroundColor: color }}
									className='w-8 aspect-square rounded-full flex items-center justify-center'
								>
									{icon}
								</div>
								<span className='text-[#9B9B9B] text-sm font-medium'>
									{label}
								</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
}
