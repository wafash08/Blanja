export default function ProductListSkeleton() {
	return (
		<ul className='grid grid-cols-5 gap-6 animate-pulse'>
			<div className='h-[250px] bg-slate-300 rounded-lg' />
			<div className='h-[250px] bg-slate-300 rounded-lg' />
			<div className='h-[250px] bg-slate-300 rounded-lg' />
			<div className='h-[250px] bg-slate-300 rounded-lg' />
			<div className='h-[250px] bg-slate-300 rounded-lg' />
		</ul>
	);
}
