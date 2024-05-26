import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BE_URL;
const sizesUrl = `${BASE_URL}sizesFilter`;

export async function getAllSizes() {
	try {
		const result = await axios.get(sizesUrl);
		return result.data;
	} catch (error) {
		// console.log('err >> ', error.response.data);
		throw new Error({
			message: error.response.data.message,
			status: error.response.data.statusCode,
		});
	}
}
