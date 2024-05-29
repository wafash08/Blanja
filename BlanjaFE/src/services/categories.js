import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BE_URL;
const categoriesUrl = `${BASE_URL}categories`;
const categoryUrl = `${BASE_URL}category`;

export async function getAllCategories() {
	try {
		const result = await axios.get(categoriesUrl);
		return result.data;
	} catch (error) {
		throw new Error({
			message: error.response.data.message,
			status: error.response.data.statusCode,
		});
	}
}

export async function getProductsByCategory(slug) {
	try {
		const result = await axios.get(`${categoryUrl}/${slug}`);
		return result.data;
	} catch (error) {
		throw new Error({
			message: error.response.data.message,
			status: error.response.data.statusCode,
		});
	}
}
