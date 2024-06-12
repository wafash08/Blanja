import { Outlet } from 'react-router-dom';
import Sidebar from '../../../components/base/Sidebar';

export default function ProfilePage() {
	return (
		<section className='-mt-[28px] grid grid-cols-12'>
			<div className='hidden bg-white col-span-3 py-12 lg:flex justify-end'>
				<Sidebar />
			</div>
			<div className='bg-[#F5F5F5] col-span-full lg:col-span-9 py-6 lg:py-12 px-4 lg:px-10'>
				<Outlet />
			</div>
		</section>
	);
}
