export default function OrderSkeleton() {
	return (
		<ul className='grid gap-5 mt-5 animate-pulse'>
			<li className='py-6 px-5 flex items-center gap-[14px] shadow-[0_0_8px_0_#73737340] rounded'>
				<div className='w-[70px] aspect-square rounded-lg bg-slate-300' />
				<div className='space-y-2'>
					<div className='w-40 h-6 rounded bg-slate-300' />
					<div className='w-20 h-4 rounded bg-slate-300' />
				</div>
			</li>
			<li className='py-6 px-5 flex items-center gap-[14px] shadow-[0_0_8px_0_#73737340] rounded'>
				<div className='w-[70px] aspect-square rounded-lg bg-slate-300' />
				<div className='space-y-2'>
					<div className='w-40 h-6 rounded bg-slate-300' />
					<div className='w-20 h-4 rounded bg-slate-300' />
				</div>
			</li>
			<li className='py-6 px-5 flex items-center gap-[14px] shadow-[0_0_8px_0_#73737340] rounded'>
				<div className='w-[70px] aspect-square rounded-lg bg-slate-300' />
				<div className='space-y-2'>
					<div className='w-40 h-6 rounded bg-slate-300' />
					<div className='w-20 h-4 rounded bg-slate-300' />
				</div>
			</li>
		</ul>
	);
}
