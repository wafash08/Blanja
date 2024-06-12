import { useRef } from 'react';
import ChooseAddress from '../../../components/modules/ChooseAddress';
import SellingProducts from '../../../components/modules/SellingProducts';

export default function AddressPage() {
	const refDialog = useRef(null);

	const handleOpenDialog = () => {
		refDialog.current?.showModal();
	};

	const handleCloseDialog = () => {
		refDialog.current?.close();
	};

	return (
		<ChooseAddress />
		// <SellingProducts />
	);
}

function FormControl({ children }) {
	return <div className='flex flex-col gap-3'>{children}</div>;
}

function Label({ children, id }) {
	return (
		<label htmlFor={id} className='text-[#9B9B9B] text-sm font-medium'>
			{children}
		</label>
	);
}

function Input({ ...props }) {
	return (
		<input
			{...props}
			className='py-3 px-5 w-full border border-[#9B9B9B] shadow-[0_1px_8px_0px_#0000000D] rounded'
		/>
	);
}
