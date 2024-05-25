import { Link } from 'react-router-dom';

// keterangan props
// 1. items (array of object): merupakan kumpulan objek yang setiap objek berisi name, href, current

export default function BreadCrumb({ items }) {
	return (
		<nav>
			<ul
				className='flex items-center space-x-3 font-metropolis text-sm text-[#9B9B9B] font-semibold'
				key='breadcrumb'
			>
				<li key='home'>
					<Link to='/' className='hover:underline'>
						Home
					</Link>
				</li>
				{items.map(({ name, href, current }) => {
					return (
						<li key={name}>
							<span className='mr-3' aria-hidden='true'>
								{'>'}
							</span>
							<Link
								to={href}
								aria-current={current ? 'page' : undefined}
								className='hover:underline capitalize'
							>
								{name}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
