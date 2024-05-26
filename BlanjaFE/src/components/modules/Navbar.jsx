import clsx from 'clsx';
import { Link } from 'react-router-dom';
import SearchBar from '../base/SearchBar';
import Filter from '../base/Filter';
import { useProfile } from '../../hooks';
import { AvatarSkeleton } from '../base/Skeleton';
import BlanjaLogo from '../../assets/blanja-logo.png';
import EmptyProfile from '../../assets/empty-profile.jpg';
import { getRoleFromLocalStorage } from '../../utils';

// keterangan props
// hasLoggedIn (boolean): apakah user sudah berhasil login atau belum
// inHomePage (boolean): apakah halaman yang sedang diakses adalah halaman home

export default function Navbar({ hasLoggedIn }) {
	const role = getRoleFromLocalStorage();
	const { data: profile, status } = useProfile(role);

	console.log('profile >> ', profile);

	return (
		<div className='w-full flex items-center justify-between font-metropolis'>
			<div className='flex items-center gap-[60px]'>
				<Link to='/'>
					<span className='sr-only'>Ke halaman home</span>
					<img src={BlanjaLogo} alt='Blanja Logo' height={44} width={119} />
				</Link>

				<div className='flex items-center gap-3'>
					{/* search bar */}
					<SearchBar />
					{hasLoggedIn ? <Filter /> : null}
				</div>
			</div>
			<nav>
				<ul className='flex items-center gap-10'>
					<li className='group'>
						<Link to='/cart'>
							<span className='sr-only'>Lihat keranjang kamu</span>
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								aria-hidden='true'
								className='group-hover:fill-[#9B9B9B] transition-colors'
							>
								<path
									d='M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z'
									stroke='#9B9B9B'
									strokeWidth='2.33333'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z'
									stroke='#9B9B9B'
									strokeWidth='2.33333'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6'
									stroke='#9B9B9B'
									strokeWidth='2.33333'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</Link>
					</li>

					{hasLoggedIn || status === 'failed' ? (
						<>
							<li className='group'>
								<Link to='/notification'>
									<span className='sr-only'>Lihat pemberitahuan</span>
									<svg
										width='22'
										height='24'
										viewBox='0 0 22 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
										aria-hidden='true'
										className='group-hover:fill-[#9B9B9B] transition-colors'
									>
										<path
											d='M17 8C17 6.4087 16.3679 4.88258 15.2426 3.75736C14.1174 2.63214 12.5913 2 11 2C9.4087 2 7.88258 2.63214 6.75736 3.75736C5.63214 4.88258 5 6.4087 5 8C5 15 2 17 2 17H20C20 17 17 15 17 8Z'
											stroke='#9B9B9B'
											strokeWidth='2.33333'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<path
											d='M12.7295 21C12.5537 21.3031 12.3014 21.5547 11.9978 21.7295C11.6941 21.9044 11.3499 21.9965 10.9995 21.9965C10.6492 21.9965 10.3049 21.9044 10.0013 21.7295C9.69769 21.5547 9.44534 21.3031 9.26953 21'
											stroke='#9B9B9B'
											strokeWidth='2.33333'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</Link>
							</li>
							<li className='group'>
								<Link to='/message'>
									<span className='sr-only'>Lihat pesan</span>
									<svg
										width='24'
										height='20'
										viewBox='0 0 24 20'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
										aria-hidden='true'
										className='group-hover:fill-[#9B9B9B] transition-colors'
									>
										<path
											d='M4 2H20C21.1 2 22 2.9 22 4V16C22 17.1 21.1 18 20 18H4C2.9 18 2 17.1 2 16V4C2 2.9 2.9 2 4 2Z'
											stroke='#9B9B9B'
											strokeWidth='2.33333'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<path
											d='M22 4L12 11L2 4'
											stroke='#9B9B9B'
											strokeWidth='2.33333'
											strokeLinecap='round'
											strokeLinejoin='round'
											className='group-hover:stroke-[#fff] transition-colors'
										/>
									</svg>
								</Link>
							</li>
							{status === 'loading' ? (
								<AvatarSkeleton />
							) : (
								<li>
									<Link to='/profile'>
										<span className='sr-only'>Lihat profil</span>
										<div className='w-8 h-8 rounded-full overflow-hidden'>
											<img
												src={profile?.image ? profile.image : EmptyProfile}
												alt={profile?.name}
												width={32}
												height={32}
												className='w-full h-full object-cover'
											/>
										</div>
									</Link>
								</li>
							)}
						</>
					) : (
						<ul className='flex items-center gap-5'>
							<NavItemAuth href='/login' label='Login' />
							<NavItemAuth
								href='/register/customer'
								label='Register'
								variant='ghost'
							/>
						</ul>
					)}
				</ul>
			</nav>
		</div>
	);
}

function NavItemAuth({ href, label, variant = 'orange' }) {
	let variantStyles = '';

	switch (variant) {
		case 'orange': {
			variantStyles =
				'bg-[#DB3022] text-white border-[#DB3022] hover:bg-red-900 hover:border-red-900';
			break;
		}
		case 'ghost': {
			variantStyles =
				'bg-white text-[#9B9B9B] border-[#9B9B9B] hover:text-white hover:bg-[#9B9B9B]';
			break;
		}
		default: {
			variantStyles =
				'bg-[#DB3022] text-white border-[#DB3022] hover:bg-red-900 hover:border-red-900';
			break;
		}
	}

	return (
		<li>
			<Link
				to={href}
				className={clsx(
					'w-[100px] h-9 inline-flex items-center justify-center text-sm border font-medium rounded-full transition-colors',
					variantStyles
				)}
			>
				{label}
			</Link>
		</li>
	);
}
