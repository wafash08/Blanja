import { useRef } from 'react';
import ChooseAddress from '../../../components/modules/ChooseAddress';

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
	);
}
