import { useEffect, useState } from 'react';
import { getCustomerProfile, getSellerProfile } from '../services/profile';
import { getAllProducts, getProductsByCondition } from '../services/products';
import { getAllColors } from '../services/colors';
import {
	getAllCategories,
	getProductsByCategory,
} from '../services/categories';
import { getAllSellers } from '../services/sellers';
import { getAllSizes } from '../services/sizes';

export function useProfile(role) {
	const [data, setData] = useState(null);
	const [status, setStatus] = useState('idle'); // status: idle, loading, success, failed
	const [error, setError] = useState(null);

	useEffect(() => {
		let ignore = false;
		async function getProfile() {
			try {
				setStatus('loading');
				let profile = null;
				if (role === 'seller') {
					profile = await getSellerProfile();
				} else if (role === 'customer') {
					profile = await getCustomerProfile();
				}
				if (!ignore) {
					if (profile) {
						setData(profile.data);
						setStatus('success');
					} else {
						setStatus('failed');
					}
				}
			} catch (error) {
				setStatus('failed');
				console.log('err', error);
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

export function useProducts(keyword, colors, sizes, category, seller, page) {
	const [data, setData] = useState([]);
	const [pagination, setPagination] = useState(null);
	const [status, setStatus] = useState('idle'); // status: idle, loading, success, failed
	const [error, setError] = useState(null);

	useEffect(() => {
		let ignore = false;
		async function getProducts() {
			try {
				setStatus('loading');
				const { products, pagination } = await getAllProducts({
					keyword,
					colors,
					category,
					seller,
					sizes,
					page,
				});
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
	}, [keyword, colors, sizes, category, seller, page]);

	return { data, pagination, status, error };
}

export function useCategories() {
	const [data, setData] = useState([]);
	const [status, setStatus] = useState('idle'); // status: idle, loading, success, failed
	const [error, setError] = useState(null);

	useEffect(() => {
		let ignore = false;
		async function getCategories() {
			try {
				setStatus('loading');
				const result = await getAllCategories();
				if (!ignore) {
					setData(result.data);
					setStatus('success');
				}
			} catch (error) {
				setStatus('failed');
				setError(error);
			}
		}

		getCategories();

		return () => {
			ignore = true;
		};
	}, []);

	return { data, status, error };
}

export function useProductByCategory(slug) {
	const [data, setData] = useState({});
	const [status, setStatus] = useState('idle'); // status: idle, loading, success, failed
	const [error, setError] = useState(null);

	useEffect(() => {
		let ignore = false;
		async function getCategories(slug) {
			try {
				setStatus('loading');
				const result = await getProductsByCategory(slug);
				if (!ignore) {
					setData(result.data);
					setStatus('success');
				}
			} catch (error) {
				setStatus('failed');
				setError(error);
			}
		}

		getCategories(slug);
		return () => {
			ignore = true;
		};
	}, [slug]);

	return { data, status, error };
}

export function useFilters() {
	const [colors, setColors] = useState([]);
	const [sellers, setSellers] = useState([]);
	const [categories, setCategories] = useState([]);
	const [sizes, setSizes] = useState([]);
	const [status, setStatus] = useState('idle'); // status: idle, loading, success, failed
	const [error, setError] = useState(null);

	useEffect(() => {
		let ignore = false;
		async function getSellers() {
			try {
				setStatus('loading');
				const [colors, sellers, categories, sizes] = await Promise.all([
					getAllColors(),
					getAllSellers(),
					getAllCategories(),
					getAllSizes(),
				]);
				if (!ignore) {
					setColors(colors.data);
					setSellers(sellers.data);
					setCategories(categories.data);
					setSizes(sizes.data);
					setStatus('success');
				}
			} catch (error) {
				setStatus('failed');
				setError(error);
			}
		}

		getSellers();
		return () => {
			ignore = true;
		};
	}, []);

	return { colors, sellers, categories, sizes, status, error };
}

export function useProductsByCondition(condition) {
	const [data, setData] = useState([]);
	const [pagination, setPagination] = useState(null);
	const [status, setStatus] = useState('idle'); // status: idle, loading, success, failed
	const [error, setError] = useState(null);

	useEffect(() => {
		let ignore = false;
		async function getProducts() {
			try {
				setStatus('loading');
				const { products, pagination } = await getProductsByCondition(
					condition
				);
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
	}, [condition]);

	return { data, pagination, status, error };
}
