export default function ProductListSkeleton() {
	return (
		<ul className='grid grid-cols-5 gap-6 animate-pulse'>
			<li className='h-[250px] bg-slate-300 rounded-lg' />
			<li className='h-[250px] bg-slate-300 rounded-lg' />
			<li className='h-[250px] bg-slate-300 rounded-lg' />
			<li className='h-[250px] bg-slate-300 rounded-lg' />
			<li className='h-[250px] bg-slate-300 rounded-lg' />
		</ul>
	);
}
