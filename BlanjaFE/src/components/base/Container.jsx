import clsx from 'clsx';

// keterangan props
// children: html element atau react component yang ingin dibungkus Container
// className (string): className tambahan seperti flex, dll

export default function Container({ children, className }) {
	return (
		<div className={clsx('max-w-[1156px] w-full mx-auto px-4', className)}>
			{children}
		</div>
	);
}
