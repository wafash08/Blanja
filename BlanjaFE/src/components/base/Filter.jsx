export default function Filter() {
	return (
		<>
			<button
				type='button'
				className='group w-10 h-10 flex items-center justify-center border border-[#8E8E93] rounded-xl'
			>
				<span className='sr-only'>Cari produk dengan filter</span>
				<svg
					width='20'
					height='18'
					viewBox='0 0 20 18'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					aria-hidden='true'
					className='group-hover:fill-[#8E8E93] transition-colors'
				>
					<path
						d='M18.3337 1.5H1.66699L8.33366 9.38333V14.8333L11.667 16.5V9.38333L18.3337 1.5Z'
						stroke='#8E8E93'
						strokeWidth='1.66667'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>
			{/* modal filter */}
			{/* <dialog>dialog filter</dialog> */}
		</>
	);
}
