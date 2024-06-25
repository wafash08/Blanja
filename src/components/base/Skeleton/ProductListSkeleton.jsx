export default function ProductListSkeleton() {
	return (
		<ul className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 animate-pulse'>
			<li className='h-[250px] bg-slate-300 rounded-lg' />
			<li className='h-[250px] bg-slate-300 rounded-lg' />
			<li className='h-[250px] bg-slate-300 rounded-lg' />
			<li className='h-[250px] bg-slate-300 rounded-lg' />
			<li className='h-[250px] bg-slate-300 rounded-lg' />
		</ul>
	);
}
