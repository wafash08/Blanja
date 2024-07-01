export default function CartListSkeleton() {
	return (
		<ul className='grid grid-rows-5 gap-6 animate-pulse'>
			<li className='h-24 bg-slate-300 rounded-lg' />
			<li className='h-24 bg-slate-300 rounded-lg' />
			<li className='h-24 bg-slate-300 rounded-lg' />
			<li className='h-24 bg-slate-300 rounded-lg' />
			<li className='h-24 bg-slate-300 rounded-lg' />
		</ul>
	);
}
