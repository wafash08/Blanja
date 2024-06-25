export default function CategoryListSkeleton() {
	return (
		<ul className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 animate-pulse'>
			<li className='h-56 bg-slate-300 rounded-lg' />
			<li className='hidden md:block h-56 bg-slate-300 rounded-lg' />
			<li className='hidden md:block h-56 bg-slate-300 rounded-lg' />
			<li className='hidden lg:block h-56 bg-slate-300 rounded-lg' />
			<li className='hidden lg:block h-56 bg-slate-300 rounded-lg' />
		</ul>
	);
}
