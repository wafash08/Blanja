import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BE_URL;
const colorsUrl = `${BASE_URL}colorsFilter`;

export async function getAllColors() {
	try {
		const result = await axios.get(colorsUrl);
		return result.data;
	} catch (error) {
		throw new Error({
			message: error.response.data.message,
			status: error.response.data.statusCode,
		});
	}
}
