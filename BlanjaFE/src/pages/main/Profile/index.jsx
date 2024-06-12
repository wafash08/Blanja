import { Outlet } from 'react-router-dom';
import Sidebar from '../../../components/base/Sidebar';
import { CloseIcon, HamburgerIcon } from '../../../components/base/Icons';
import clsx from 'clsx';
import { useState } from 'react';

export default function ProfilePage() {
	const [open, setOpen] = useState(false);
	return (
		<section className='-mt-[28px] grid grid-cols-12 relative'>
			<div className='hidden bg-white col-span-3 py-12 lg:flex justify-end'>
				<Sidebar />
			</div>
			<div className='lg:hidden block fixed z-50'>
				<button
					type='button'
					className='flex items-center justify-center bg-white shadow p-3 rounded-br'
					onClick={() => setOpen(true)}
				>
					<span className='sr-only'>Buka Sidebar</span>
					<HamburgerIcon />
				</button>
			</div>

			<div
				className={clsx(
					'fixed left-0 top-[100px] bg-white z-[60] shadow-lg w-4/5 max-w-xs py-10 pl-5 min-h-screen transition-slide-in duration-300',
					open
						? 'translate-x-0 visible opacity-100'
						: '-translate-x-full invisible opacity-0 appearance-none'
				)}
			>
				<button
					type='button'
					className='p-2 rounded-full absolute right-2 top-2'
					onClick={() => setOpen(false)}
				>
					<span className='sr-only'>Tutup sidebar</span>
					<CloseIcon />
				</button>
				<Sidebar />
			</div>

			<div className='bg-[#F5F5F5] col-span-full lg:col-span-9 py-6 lg:py-12 px-4 lg:px-10'>
				<Outlet />
			</div>
		</section>
	);
}
