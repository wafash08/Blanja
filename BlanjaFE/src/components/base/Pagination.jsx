import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';
import { getRange } from '../../utils';

export default function Pagination({ pagination }) {
	const [searchParam, setSearchParams] = useSearchParams();
	const { totalPage, currentPage } = pagination;
	const currentPageParam = searchParam.get('page') || 1;
	const range = getRange(1, totalPage);
	const isPreviousButtonDisabled =
		currentPageParam === 1 || Number(currentPageParam) === 1;
	const isNextButtonDisabled =
		currentPageParam === range.length ||
		Number(currentPageParam) === range.length;

	const handlePrevPage = () => {
		setSearchParams({ page: currentPage - 1 });
	};

	const handleNextPage = () => {
		setSearchParams({ page: currentPage + 1 });
	};

	const handleToPage = page => {
		setSearchParams({ page });
	};

	return (
		<nav className='flex justify-center flex-wrap'>
			<ul className='flex items-center gap-3'>
				{isPreviousButtonDisabled ? null : (
					<li className='group'>
						<button
							className={clsx(
								'w-10 h-10 inline-flex items-center justify-center border rounded-full',
								'cursor-pointer bg-white border-[#222] text-[#222] group-hover:bg-[#DB3022] group-hover:text-white group-hover:border-[#DB3022]'
							)}
							onClick={handlePrevPage}
						>
							<span className='sr-only'>sebelumnya</span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								width='24'
								height='24'
								color='currentColor'
								fill='none'
								aria-hidden
							>
								<path
									d='M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18'
									stroke='currentColor'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</li>
				)}
				{range.map(r => {
					return (
						<PaginationItem
							label={r}
							current={Number(r) === Number(currentPageParam)}
							onToPage={handleToPage}
							key={r}
						/>
					);
				})}
				{isNextButtonDisabled ? null : (
					<li className='group'>
						<button
							aria-disabled={isNextButtonDisabled}
							className={clsx(
								'w-10 h-10 inline-flex items-center justify-center border rounded-full',
								isNextButtonDisabled
									? 'pointer-events-none cursor-not-allowed bg-slate-200 border-slate-400'
									: 'cursor-pointer bg-white border-[#222] text-[#222] group-hover:bg-[#DB3022] group-hover:text-white group-hover:border-[#DB3022]'
							)}
							onClick={handleNextPage}
						>
							<span className='sr-only'>selanjutnya</span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								width='24'
								height='24'
								color='currentColor'
								fill='none'
								aria-hidden
							>
								<path
									d='M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18'
									stroke='currentColor'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</li>
				)}
			</ul>
		</nav>
	);
}

function PaginationItem({ label, onToPage, current }) {
	return (
		<li className='group'>
			<button
				className={clsx(
					'w-10 h-10 inline-flex items-center justify-center border rounded-full',
					'group-hover:bg-[#DB3022] group-hover:text-white group-hover:border-[#DB3022]',
					current
						? 'bg-[#DB3022] text-white border-[#DB3022]'
						: 'bg-white border-[#222] text-[#222]'
				)}
				onClick={() => onToPage(label)}
			>
				{label}
			</button>
		</li>
	);
}
