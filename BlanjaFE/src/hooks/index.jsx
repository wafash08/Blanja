import { useEffect, useState } from 'react';
import { getSellerProfile } from '../services/profile';
import { getAllProducts } from '../services/products';

export function useProfile() {
	const [data, setData] = useState(null);
	const [status, setStatus] = useState('idle'); // status: idle, loading, success, failed
	const [error, setError] = useState(null);

	useEffect(() => {
		let ignore = false;
		async function getProfile() {
			try {
				setStatus('loading');
				const profile = await getSellerProfile();
				if (!ignore) {
					setData(profile.data);
					setStatus('success');
				}
			} catch (error) {
				setStatus('failed');
				setError(error);
			}
		}

		getProfile();

		return () => {
			ignore = true;
		};
	}, []);

	return { data, status, error };
}

export function useProducts() {
	const [data, setData] = useState([]);
	const [pagination, setPagination] = useState(null);
	const [status, setStatus] = useState('idle'); // status: idle, loading, success, failed
	const [error, setError] = useState(null);

	useEffect(() => {
		let ignore = false;
		async function getProducts() {
			try {
				setStatus('loading');
				const { products, pagination } = await getAllProducts();
				if (!ignore) {
					setData(products);
					setPagination(pagination);
					setStatus('success');
				}
			} catch (error) {
				setStatus('failed');
				setError(error);
			}
		}

		getProducts();

		return () => {
			ignore = true;
		};
	}, []);

	return { data, pagination, status, error };
}
