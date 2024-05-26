import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BE_URL;
const productsUrl = `${BASE_URL}products`;

export async function getAllProducts({
	keyword,
	colors,
	sizes,
	category,
	seller,
}) {
	try {
		const result = await axios.get(productsUrl, {
			params: {
				search: keyword,
				colors,
				sizes,
				category,
				seller,
			},
		});
		return {
			products: result.data.data,
			pagination: {
				currentPage: result.data.currentPage,
				limit: result.data.limit,
				totalData: result.data.totalData,
				totalPage: result.data.totalPage,
			},
		};
	} catch (error) {
		throw new Error({
			message: error.response.data.message,
			status: error.response.data.statusCode,
		});
	}
}
