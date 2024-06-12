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
