import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BE_URL;
const sellersUrl = `${BASE_URL}sellers`;

export async function getAllSellers() {
	try {
		const result = await axios.get(sellersUrl);
		return result.data;
	} catch (error) {
		throw new Error({
			message: error.response.data.message,
			status: error.response.data.statusCode,
		});
	}
}
