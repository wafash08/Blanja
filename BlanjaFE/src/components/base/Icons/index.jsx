export function AccountIcon() {
	return (
		<svg
			width='16'
			height='16'
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden
		>
			<path
				d='M13.3334 14V12.6667C13.3334 11.9594 13.0525 11.2811 12.5524 10.781C12.0523 10.281 11.374 10 10.6667 10H5.33341C4.62617 10 3.94789 10.281 3.4478 10.781C2.9477 11.2811 2.66675 11.9594 2.66675 12.6667V14'
				stroke='white'
				strokeWidth='1.33333'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M7.99992 7.33333C9.47268 7.33333 10.6666 6.13943 10.6666 4.66667C10.6666 3.19391 9.47268 2 7.99992 2C6.52716 2 5.33325 3.19391 5.33325 4.66667C5.33325 6.13943 6.52716 7.33333 7.99992 7.33333Z'
				stroke='white'
				strokeWidth='1.33333'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

export function AddressIcon() {
	return (
		<svg
			width='16'
			height='16'
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M14 6.66663C14 11.3333 8 15.3333 8 15.3333C8 15.3333 2 11.3333 2 6.66663C2 5.07533 2.63214 3.5492 3.75736 2.42399C4.88258 1.29877 6.4087 0.666626 8 0.666626C9.5913 0.666626 11.1174 1.29877 12.2426 2.42399C13.3679 3.5492 14 5.07533 14 6.66663Z'
				stroke='white'
				strokeWidth='1.33333'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M8 8.66663C9.10457 8.66663 10 7.7712 10 6.66663C10 5.56206 9.10457 4.66663 8 4.66663C6.89543 4.66663 6 5.56206 6 6.66663C6 7.7712 6.89543 8.66663 8 8.66663Z'
				stroke='white'
				strokeWidth='1.33333'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

export function OrderIcon() {
	return (
		<svg
			width='16'
			height='16'
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M10.6667 2.66663H12.0001C12.3537 2.66663 12.6928 2.8071 12.9429 3.05715C13.1929 3.3072 13.3334 3.64634 13.3334 3.99996V13.3333C13.3334 13.6869 13.1929 14.0261 12.9429 14.2761C12.6928 14.5262 12.3537 14.6666 12.0001 14.6666H4.00008C3.64646 14.6666 3.30732 14.5262 3.05727 14.2761C2.80722 14.0261 2.66675 13.6869 2.66675 13.3333V3.99996C2.66675 3.64634 2.80722 3.3072 3.05727 3.05715C3.30732 2.8071 3.64646 2.66663 4.00008 2.66663H5.33341'
				stroke='white'
				strokeWidth='1.33333'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M9.99992 1.33337H5.99992C5.63173 1.33337 5.33325 1.63185 5.33325 2.00004V3.33337C5.33325 3.70156 5.63173 4.00004 5.99992 4.00004H9.99992C10.3681 4.00004 10.6666 3.70156 10.6666 3.33337V2.00004C10.6666 1.63185 10.3681 1.33337 9.99992 1.33337Z'
				stroke='white'
				strokeWidth='1.33333'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

export function KebabIcon() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={1.5}
			stroke='currentColor'
			className='size-6'
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z'
			/>
		</svg>
	);
}

export function CloseIcon() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={1.5}
			stroke='currentColor'
			className='size-6'
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M6 18 18 6M6 6l12 12'
			/>
		</svg>
	);
}

export function CartIcon({ ...props }) {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
			{...props}
		>
			<path
				d='M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z'
				stroke='currentColor'
				strokeWidth='2.33333'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z'
				stroke='currentColor'
				strokeWidth='2.33333'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6'
				stroke='currentColor'
				strokeWidth='2.33333'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

export function BellIcon({ ...props }) {
	return (
		<svg
			width='22'
			height='24'
			viewBox='0 0 22 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
			{...props}
		>
			<path
				d='M17 8C17 6.4087 16.3679 4.88258 15.2426 3.75736C14.1174 2.63214 12.5913 2 11 2C9.4087 2 7.88258 2.63214 6.75736 3.75736C5.63214 4.88258 5 6.4087 5 8C5 15 2 17 2 17H20C20 17 17 15 17 8Z'
				stroke='#9B9B9B'
				strokeWidth='2.33333'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M12.7295 21C12.5537 21.3031 12.3014 21.5547 11.9978 21.7295C11.6941 21.9044 11.3499 21.9965 10.9995 21.9965C10.6492 21.9965 10.3049 21.9044 10.0013 21.7295C9.69769 21.5547 9.44534 21.3031 9.26953 21'
				stroke='#9B9B9B'
				strokeWidth='2.33333'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

export function MessageIcon({ ...props }) {
	return (
		<svg
			width='24'
			height='20'
			viewBox='0 0 24 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
			{...props}
		>
			<path
				d='M4 2H20C21.1 2 22 2.9 22 4V16C22 17.1 21.1 18 20 18H4C2.9 18 2 17.1 2 16V4C2 2.9 2.9 2 4 2Z'
				stroke='#9B9B9B'
				strokeWidth='2.33333'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M22 4L12 11L2 4'
				stroke='#9B9B9B'
				strokeWidth='2.33333'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='group-hover:stroke-[#fff] transition-colors'
			/>
		</svg>
	);
}

export function HamburgerIcon() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={1.5}
			stroke='currentColor'
			className='size-6'
			aria-hidden
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M3.75 9h16.5m-16.5 6.75h16.5'
			/>
		</svg>
	);
}

export function HomeIcon() {
	return (
		<svg
			width='16'
			height='16'
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden
		>
			<path
				d='M2 6.00004L8 1.33337L14 6.00004V13.3334C14 13.687 13.8595 14.0261 13.6095 14.2762C13.3594 14.5262 13.0203 14.6667 12.6667 14.6667H3.33333C2.97971 14.6667 2.64057 14.5262 2.39052 14.2762C2.14048 14.0261 2 13.687 2 13.3334V6.00004Z'
				stroke='white'
				strokeWidth='1.33333'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M6 14.6667V8H10V14.6667'
				stroke='white'
				strokeWidth='1.33333'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

export function PackageIcon() {
	return (
		<svg
			width='16'
			height='16'
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden
		>
			<path
				d='M11 6.26664L5 2.80664'
				stroke='white'
				strokeWidth='1.33333'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M14 10.6667V5.33335C13.9998 5.09953 13.938 4.86989 13.821 4.66746C13.704 4.46503 13.5358 4.29692 13.3333 4.18002L8.66667 1.51335C8.46397 1.39633 8.23405 1.33472 8 1.33472C7.76595 1.33472 7.53603 1.39633 7.33333 1.51335L2.66667 4.18002C2.46418 4.29692 2.29599 4.46503 2.17897 4.66746C2.06196 4.86989 2.00024 5.09953 2 5.33335V10.6667C2.00024 10.9005 2.06196 11.1301 2.17897 11.3326C2.29599 11.535 2.46418 11.7031 2.66667 11.82L7.33333 14.4867C7.53603 14.6037 7.76595 14.6653 8 14.6653C8.23405 14.6653 8.46397 14.6037 8.66667 14.4867L13.3333 11.82C13.5358 11.7031 13.704 11.535 13.821 11.3326C13.938 11.1301 13.9998 10.9005 14 10.6667Z'
				stroke='white'
				strokeWidth='1.33333'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M2.18018 4.64001L8.00018 8.00668L13.8202 4.64001'
				stroke='white'
				strokeWidth='1.33333'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M8 14.72V8'
				stroke='white'
				strokeWidth='1.33333'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}
